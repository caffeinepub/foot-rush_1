import { motion } from "motion/react";

export function Hero() {
  return (
    <section
      className="relative w-full h-[600px] flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/assets/generated/hero-shoe.dim_1200x600.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block text-brand-orange font-body text-sm font-600 uppercase tracking-[0.3em] mb-4">
              New Season 2026
            </span>
            <h1 className="font-display text-6xl md:text-7xl font-800 text-white uppercase leading-none tracking-tight mb-4">
              IGNITE
              <br />
              <span className="text-brand-orange">YOUR</span>
              <br />
              PACE.
            </h1>
            <p className="text-gray-300 text-lg mb-8 font-body leading-relaxed">
              Elite performance footwear engineered for champions. Find your
              next personal best.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                className="bg-brand-orange hover:bg-orange-600 text-white font-body font-700 uppercase tracking-wider text-sm px-8 py-3.5 transition-all duration-200 hover:scale-105 active:scale-95"
                data-ocid="hero.primary_button"
              >
                Shop Latest Releases
              </button>
              <button
                type="button"
                className="border-2 border-white text-white hover:border-brand-orange hover:text-brand-orange font-body font-700 uppercase tracking-wider text-sm px-8 py-3.5 transition-all duration-200"
                data-ocid="hero.secondary_button"
              >
                Explore Collection
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
