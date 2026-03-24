import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
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

  type Order = {
    id : Nat;
    items : [OrderItem];
    total : Float;
    status : Text;
    createdAt : Int;
    customerPrincipal : Principal.Principal;
  };

  type OrderItem = {
    productId : Nat;
    quantity : Nat;
    size : Text;
    price : Float;
  };

  type UserProfile = {
    name : Text;
    email : Text;
  };

  type Actor = {
    products : Map.Map<Nat, Product>;
    nextProductId : Nat;
    orders : Map.Map<Nat, Order>;
    nextOrderId : Nat;
    newsletterSubscribers : List.List<Text>;
    wishlists : Map.Map<Principal.Principal, List.List<Nat>>;
    userProfiles : Map.Map<Principal.Principal, UserProfile>;
  };

  public func run(old : {}) : Actor {
    {
      products = Map.empty<Nat, Product>();
      nextProductId = 1;
      orders = Map.empty<Nat, Order>();
      nextOrderId = 1;
      newsletterSubscribers = List.empty<Text>();
      wishlists = Map.empty<Principal.Principal, List.List<Nat>>();
      userProfiles = Map.empty<Principal.Principal, UserProfile>();
    };
  };
};
