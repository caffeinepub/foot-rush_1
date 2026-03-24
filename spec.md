# Foot Rush

## Current State
Full frontend e-commerce site for shoes. Products, categories, brands are hardcoded in a local `data/products` file. Cart and wishlist are managed in React state (ephemeral). No backend exists.

## Requested Changes (Diff)

### Add
- Backend product catalog: store and serve products with id, name, brand, category, price, image, badge, sizes, rating, reviewCount
- Orders: place an order with cart items (productId, quantity, size), store order records with timestamp and total
- Wishlist: persist wishlist per anonymous session (stored by user principal)
- Newsletter subscriptions: store email subscriptions
- Admin: seed products from frontend data, add/update/remove products

### Modify
- Frontend wired to load products from backend instead of static file
- Cart checkout calls backend placeOrder
- Wishlist toggles persist via backend
- Newsletter form submits to backend

### Remove
- Static product data file dependency (replaced by backend)

## Implementation Plan
1. Generate Motoko backend with: Product, Order, Wishlist, Newsletter actors/data types
2. Expose APIs: getProducts, getProduct, addProduct, updateProduct, removeProduct, placeOrder, getOrders, toggleWishlist, getWishlist, subscribeNewsletter
3. Wire frontend ShopContext to use backend APIs for wishlist and newsletter
4. Replace static products with backend-loaded products
5. Wire checkout button to placeOrder backend call
