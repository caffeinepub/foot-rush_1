import { ProductCard } from "@/components/ProductCard";
import { useShop } from "@/context/ShopContext";
import { categories } from "@/data/products";
import { motion } from "motion/react";

const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

export function FreshDrops() {
  const { products, isLoadingProducts, activeCategory, setActiveCategory } =
    useShop();

  const filtered =
    activeCategory === "NEW ARRIVALS"
      ? products
      : products.filter(
          (p) => p.category.toUpperCase() === activeCategory.replace(" ", ""),
        );

  return (
    <section className="py-20 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <span className="text-brand-orange font-body text-sm font-600 uppercase tracking-[0.3em] block mb-2">
              Latest Collection
            </span>
            <h2 className="font-display text-4xl font-800 text-brand-dark uppercase tracking-tight">
              Fresh Drops
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[11px] font-body font-700 uppercase tracking-widest transition-colors duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-dark text-white"
                    : "bg-transparent text-brand-gray border border-gray-200 hover:border-brand-dark hover:text-brand-dark"
                }`}
                data-ocid="products.tab"
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        {isLoadingProducts ? (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid="products.loading_state"
          >
            {SKELETON_KEYS.map((key) => (
              <div
                key={key}
                className="bg-gray-100 animate-pulse aspect-square"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="products.empty_state">
            <p className="font-display font-700 text-xl uppercase tracking-wide text-gray-400">
              No products in this category yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
