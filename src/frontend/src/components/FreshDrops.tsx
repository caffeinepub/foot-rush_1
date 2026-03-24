import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useShop } from "@/context/ShopContext";
import { brands, products } from "@/data/products";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "./ProductCard";

const categoryFilters = ["Men", "Women", "Kids", "Lifestyle", "Sale"];

function AccordionSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-sm font-body font-700 uppercase tracking-wider text-gray-900"
        data-ocid="filter.toggle"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

export function FreshDrops() {
  const { activeCategory } = useShop();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);

  const toggleFilter = (
    arr: string[],
    setArr: (v: string[]) => void,
    val: string,
  ) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const filtered = products.filter((p) => {
    if (activeCategory !== "NEW ARRIVALS" && activeCategory !== "BRANDS") {
      const catMap: Record<string, string> = {
        MEN: "Men",
        WOMEN: "Women",
        KIDS: "Kids",
        SALE: "Sale",
      };
      const mapped = catMap[activeCategory];
      if (mapped && p.category !== mapped) return false;
    }
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(p.category)
    )
      return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand))
      return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });

  return (
    <section className="bg-white py-16" id="fresh-drops">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="font-display text-3xl font-800 uppercase tracking-tight text-gray-900">
            Fresh Drops
          </h2>
          <div className="flex-1 h-px bg-gray-200" />
          <span className="font-body text-sm text-brand-gray">
            {filtered.length} products
          </span>
        </div>

        <div className="flex gap-8">
          {/* Filter sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <AccordionSection title="Category">
              <div className="space-y-2">
                {categoryFilters.map((cat) => (
                  <div key={cat} className="flex items-center gap-2">
                    <Checkbox
                      id={`cat-${cat}`}
                      checked={selectedCategories.includes(cat)}
                      onCheckedChange={() =>
                        toggleFilter(
                          selectedCategories,
                          setSelectedCategories,
                          cat,
                        )
                      }
                      data-ocid="filter.checkbox"
                    />
                    <Label
                      htmlFor={`cat-${cat}`}
                      className="text-sm font-body text-gray-700 cursor-pointer"
                    >
                      {cat}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="Brand">
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center gap-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() =>
                        toggleFilter(selectedBrands, setSelectedBrands, brand)
                      }
                      data-ocid="filter.checkbox"
                    />
                    <Label
                      htmlFor={`brand-${brand}`}
                      className="text-sm font-body text-gray-700 cursor-pointer"
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="Price Range">
              <div className="px-1">
                <Slider
                  min={0}
                  max={200}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-3"
                />
                <div className="flex justify-between text-xs font-body text-brand-gray">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </AccordionSection>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 text-center"
                data-ocid="products.empty_state"
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-gray-200"
                  aria-hidden="true"
                >
                  <title>Empty bag</title>
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <p className="font-display font-700 text-xl uppercase tracking-wide text-gray-400 mt-4">
                  No products found
                </p>
                <p className="font-body text-sm text-brand-gray mt-2">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
