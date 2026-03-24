import { useShop } from "@/context/ShopContext";
import { motion } from "motion/react";

const promos = [
  {
    label: "Men's Running",
    image: "/assets/generated/shoe-mens-1.dim_400x400.jpg",
    category: "MEN",
  },
  {
    label: "Women's Training",
    image: "/assets/generated/shoe-womens-1.dim_400x400.jpg",
    category: "WOMEN",
  },
  {
    label: "Lifestyle",
    image: "/assets/generated/shoe-lifestyle-1.dim_400x400.jpg",
    category: "BRANDS",
  },
];

export function CategoryPromo() {
  const { setActiveCategory } = useShop();

  return (
    <section className="bg-brand-light py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promos.map((promo, i) => (
            <motion.button
              type="button"
              key={promo.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative h-72 overflow-hidden group cursor-pointer text-left w-full"
              onClick={() => setActiveCategory(promo.category)}
            >
              <img
                src={promo.image}
                alt={promo.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-display text-xl font-800 text-white uppercase tracking-wide mb-3">
                  {promo.label}
                </h3>
                <span
                  className="text-xs font-body font-700 uppercase tracking-wider text-white border border-brand-orange px-5 py-2 hover:bg-brand-orange transition-colors duration-200 inline-block"
                  data-ocid="category.button"
                >
                  Shop Now
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
