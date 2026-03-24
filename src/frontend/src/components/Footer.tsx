import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

const links = {
  Shop: ["New Arrivals", "Men", "Women", "Kids", "Sale"],
  Help: ["FAQ", "Shipping Info", "Returns", "Size Guide", "Contact Us"],
  About: ["Our Story", "Careers", "Press", "Sustainability"],
};

export function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-brand-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/uploads/whatsapp_image_2026-03-24_at_12.17.32_pm-019d1f07-4b84-72cf-8421-21affa270348-1.jpeg"
                alt="Foot Rush Shoecare"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="font-body text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
              Premium performance footwear for athletes and style icons. Run
              faster, look sharper.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: SiInstagram,
                  label: "Instagram",
                  href: "https://instagram.com",
                },
                { icon: SiX, label: "X", href: "https://x.com" },
                {
                  icon: SiFacebook,
                  label: "Facebook",
                  href: "https://facebook.com",
                },
                {
                  icon: SiYoutube,
                  label: "YouTube",
                  href: "https://youtube.com",
                },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-gray-500 hover:border-brand-orange hover:text-brand-orange transition-colors"
                  data-ocid="footer.link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-body font-700 text-white text-xs uppercase tracking-widest mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="font-body text-sm text-gray-500 hover:text-brand-orange transition-colors"
                      data-ocid="footer.link"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-gray-600">
            \u00a9 {year} Foot Rush. All rights reserved.
          </p>
          <p className="font-body text-xs text-gray-600">
            Built with \u2764\ufe0f using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              className="text-brand-orange hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
