import { useShop } from "@/context/ShopContext";
import { categories } from "@/data/products";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";

export function Header() {
  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    activeCategory,
    setActiveCategory,
  } = useShop();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip */}
      <div className="bg-brand-darker py-1 px-4 text-right">
        <span className="text-xs text-gray-400">
          <button
            type="button"
            className="hover:text-brand-orange transition-colors"
          >
            Account
          </button>
          <span className="mx-2 text-gray-600">|</span>
          <button
            type="button"
            className="hover:text-brand-orange transition-colors"
          >
            Favorites
          </button>
        </span>
      </div>

      {/* Main header */}
      <div className="bg-brand-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center shrink-0"
            data-ocid="nav.link"
          >
            <img
              src="/assets/uploads/whatsapp_image_2026-03-24_at_12.17.32_pm-019d1f07-4b84-72cf-8421-21affa270348-1.jpeg"
              alt="Foot Rush Shoecare"
              className="h-12 w-auto object-contain"
            />
          </a>

          {/* Category nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-ocid="nav.tab"
                className={`px-3 py-2 text-xs font-body font-600 uppercase tracking-wider transition-colors ${
                  activeCategory === cat
                    ? "text-brand-orange border-b-2 border-brand-orange"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search */}
            <div className="hidden md:flex items-center bg-white/10 rounded-sm overflow-hidden border border-white/20">
              <input
                type="text"
                placeholder="Search sneakers\u2026"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 text-sm px-3 py-1.5 w-44 outline-none"
                data-ocid="search.input"
              />
              <button
                type="button"
                className="bg-brand-orange px-2.5 py-1.5 hover:bg-orange-600 transition-colors"
                data-ocid="search.button"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Account */}
            <button
              type="button"
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
              data-ocid="nav.link"
            >
              <User className="w-5 h-5" />
              <span className="hidden md:block text-xs uppercase tracking-wide">
                Sign In
              </span>
            </button>

            {/* Wishlist */}
            <button
              type="button"
              className="relative text-gray-300 hover:text-brand-orange transition-colors"
              data-ocid="nav.link"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-300 hover:text-brand-orange transition-colors"
              data-ocid="cart.open_modal_button"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
