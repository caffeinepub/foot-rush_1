import type { Product } from "@/data/products";
import { products as staticProducts } from "@/data/products";
import { useActor } from "@/hooks/useActor";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

interface ShopContextType {
  products: Product[];
  isLoadingProducts: boolean;
  cart: CartItem[];
  wishlist: number[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleWishlist: (productId: number) => void;
  cartCount: number;
  wishlistCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const ShopContext = createContext<ShopContextType | null>(null);

function mapBackendProduct(p: {
  id: bigint;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: bigint;
  image: string;
  sizes: string[];
  badge?: string;
  isActive: boolean;
}): Product {
  return {
    id: Number(p.id),
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    rating: p.rating,
    reviews: Number(p.reviewCount),
    image: p.image,
    sizes: p.sizes,
    colors: [],
    badge: p.badge,
    isActive: p.isActive,
  };
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const { actor, isFetching } = useActor();
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const wishlistLoadedRef = useRef(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("NEW ARRIVALS");

  useEffect(() => {
    if (!actor || isFetching) return;

    async function loadData() {
      if (!actor) return;
      try {
        const [backendProducts, wishlistIds] = await Promise.all([
          actor.getProducts(),
          actor.getMyWishlist().catch(() => [] as bigint[]),
        ]);

        if (backendProducts.length === 0) {
          const seedData = staticProducts.map((p) => ({
            name: p.name,
            sizes: p.sizes,
            category: p.category,
            badge: p.badge,
            brand: p.brand,
            rating: p.rating,
            image: p.image,
            price: p.price,
            reviewCount: BigInt(p.reviews),
          }));
          await actor.seedProducts(seedData);
          const seeded = await actor.getProducts();
          setProducts(
            seeded.length > 0 ? seeded.map(mapBackendProduct) : staticProducts,
          );
        } else {
          setProducts(backendProducts.map(mapBackendProduct));
        }

        if (!wishlistLoadedRef.current) {
          setWishlist(wishlistIds.map(Number));
          wishlistLoadedRef.current = true;
        }
      } catch (err) {
        console.error("Failed to load backend data:", err);
        setProducts(staticProducts);
      } finally {
        setIsLoadingProducts(false);
      }
    }

    loadData();
  }, [actor, isFetching]);

  const addToCart = (product: Product, size?: string) => {
    const selectedSize = size ?? product.sizes[0] ?? "One Size";
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === selectedSize,
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1, size: selectedSize }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
    if (actor) {
      actor.toggleWishlist(BigInt(productId)).catch((err) => {
        console.error("Failed to sync wishlist:", err);
        // Revert on error
        setWishlist((prev) =>
          prev.includes(productId)
            ? prev.filter((id) => id !== productId)
            : [...prev, productId],
        );
      });
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <ShopContext.Provider
      value={{
        products,
        isLoadingProducts,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        cartCount,
        wishlistCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
