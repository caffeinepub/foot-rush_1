import { useShop } from "@/context/ShopContext";
import type { Product } from "@/data/products";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  product: Product;
  index: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.floor(rating)
              ? "text-brand-star fill-brand-star"
              : star - 0.5 <= rating
                ? "text-brand-star fill-brand-star/50"
                : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export function ProductCard({ product, index }: Props) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      className="bg-white group border border-gray-100 hover:shadow-card transition-shadow duration-300"
      data-ocid={`products.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-brand-light aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.category === "Sale" && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-700 uppercase px-2 py-1 tracking-wider">
            Sale
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm transition-colors hover:bg-white ${
            isWishlisted ? "text-brand-orange" : "text-gray-400"
          }`}
          data-ocid={`products.toggle.${index + 1}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? "fill-brand-orange" : ""}`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <span className="text-[10px] font-body font-600 uppercase tracking-widest text-brand-gray">
          {product.category} · {product.brand}
        </span>
        <h3 className="font-display font-700 text-sm uppercase tracking-wide text-gray-900 mt-1 mb-2 leading-tight">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-brand-gray font-body">
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-display font-800 text-lg text-brand-orange">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-brand-dark hover:bg-brand-orange text-white text-[10px] font-body font-700 uppercase tracking-widest px-3 py-2 transition-colors duration-200"
            data-ocid={`products.button.${index + 1}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
}
