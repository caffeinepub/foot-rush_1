import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Migration "migration";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

(with migration = Migration.run)
actor {
  // ====== Types ======

  type Product = {
    id : Nat;
    name : Text;
    brand : Text;
    category : Text;
    price : Float;
    image : Text;
    badge : ?Text;
    sizes : [Text];
    rating : Float;
    reviewCount : Nat;
    isActive : Bool;
  };

  type OrderItem = {
    productId : Nat;
    quantity : Nat;
    size : Text;
    price : Float;
  };

  type Order = {
    id : Nat;
    items : [OrderItem];
    total : Float;
    status : Text;
    createdAt : Int;
    customerPrincipal : Principal;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  // ====== State ======

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let products = Map.empty<Nat, Product>();
  var nextProductId = 1;

  let orders = Map.empty<Nat, Order>();
  var nextOrderId = 1;

  let newsletterSubscribers = List.empty<Text>();
  let wishlists = Map.empty<Principal, List.List<Nat>>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // ====== User Profile Functions ======

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ====== Product Catalog ======

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().filter(func(p) { p.isActive });
  };

  public query ({ caller }) func getProduct(id : Nat) : async ?Product {
    products.get(id);
  };

  public shared ({ caller }) func addProduct(productData : {
    name : Text;
    brand : Text;
    category : Text;
    price : Float;
    image : Text;
    badge : ?Text;
    sizes : [Text];
    rating : Float;
    reviewCount : Nat;
  }) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let product : Product = {
      id = nextProductId;
      name = productData.name;
      brand = productData.brand;
      category = productData.category;
      price = productData.price;
      image = productData.image;
      badge = productData.badge;
      sizes = productData.sizes;
      rating = productData.rating;
      reviewCount = productData.reviewCount;
      isActive = true;
    };

    products.add(nextProductId, product);
    let currentId = nextProductId;
    nextProductId += 1;
    currentId;
  };

  public shared ({ caller }) func updateProduct(id : Nat, productData : {
    name : Text;
    brand : Text;
    category : Text;
    price : Float;
    image : Text;
    badge : ?Text;
    sizes : [Text];
    rating : Float;
    reviewCount : Nat;
  }) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?existing) {
        let updated : Product = {
          id = existing.id;
          name = productData.name;
          brand = productData.brand;
          category = productData.category;
          price = productData.price;
          image = productData.image;
          badge = productData.badge;
          sizes = productData.sizes;
          rating = productData.rating;
          reviewCount = productData.reviewCount;
          isActive = existing.isActive;
        };
        products.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func removeProduct(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can remove products");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?existing) {
        products.add(id, { existing with isActive = false });
      };
    };
  };

  public shared ({ caller }) func seedProducts(productList : [{
    name : Text;
    brand : Text;
    category : Text;
    price : Float;
    image : Text;
    badge : ?Text;
    sizes : [Text];
    rating : Float;
    reviewCount : Nat;
  }]) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can seed products");
    };

    for (productData in productList.values()) {
      let product : Product = {
        id = nextProductId;
        name = productData.name;
        brand = productData.brand;
        category = productData.category;
        price = productData.price;
        image = productData.image;
        badge = productData.badge;
        sizes = productData.sizes;
        rating = productData.rating;
        reviewCount = productData.reviewCount;
        isActive = true;
      };
      products.add(nextProductId, product);
      nextProductId += 1;
    };
  };

  // ====== Orders ======

  public shared ({ caller }) func placeOrder(items : [OrderItem]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };

    let total = items.foldLeft(
      0.0,
      func(acc, item) { acc + (item.price * item.quantity.toInt().toFloat()) },
    );

    let order : Order = {
      id = nextOrderId;
      items;
      total;
      status = "pending";
      createdAt = Time.now();
      customerPrincipal = caller;
    };

    orders.add(nextOrderId, order);
    let currentId = nextOrderId;
    nextOrderId += 1;
    currentId;
  };

  public query ({ caller }) func getMyOrders() : async [Order] {
    orders.values().toArray().filter(func(order) { order.customerPrincipal == caller });
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?existing) {
        orders.add(orderId, { existing with status });
      };
    };
  };

  // ====== Newsletter ======

  public shared ({ caller }) func subscribeNewsletter(email : Text) : async Bool {
    if (newsletterSubscribers.any(func(e) { Text.equal(e, email) })) {
      false;
    } else {
      newsletterSubscribers.add(email);
      true;
    };
  };

  public query ({ caller }) func getSubscribers() : async [Text] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view subscribers");
    };
    newsletterSubscribers.toArray();
  };

  // ====== Wishlist ======

  public shared ({ caller }) func toggleWishlist(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage wishlists");
    };

    let currentWishlist = switch (wishlists.get(caller)) {
      case (null) { List.empty<Nat>() };
      case (?list) { list };
    };

    let exists = currentWishlist.any(func(id) { id == productId });
    let updatedWishlist = if (exists) {
      currentWishlist.filter(func(id) { id != productId });
    } else {
      currentWishlist.add(productId);
      currentWishlist;
    };

    wishlists.add(caller, updatedWishlist);
  };

  public query ({ caller }) func getMyWishlist() : async [Nat] {
    switch (wishlists.get(caller)) {
      case (null) { [] };
      case (?wishlist) { wishlist.toArray() };
    };
  };
};
