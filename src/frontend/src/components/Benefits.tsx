import { Headphones, RefreshCw, Truck } from "lucide-react";

const benefits = [
  { icon: Truck, title: "Free Shipping", desc: "On all orders over $75" },
  { icon: RefreshCw, title: "30-Day Returns", desc: "No questions asked" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
];

export function Benefits() {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex items-center gap-4 justify-center md:justify-start"
            >
              <div className="bg-brand-light rounded-full p-3">
                <b.icon className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <p className="font-body font-700 text-sm uppercase tracking-wide text-gray-900">
                  {b.title}
                </p>
                <p className="font-body text-sm text-brand-gray">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
