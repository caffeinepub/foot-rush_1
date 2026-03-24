import { Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-brand-dark py-20 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="text-brand-orange font-body text-sm font-600 uppercase tracking-[0.3em] mb-3 block">
              Stay in the loop
            </span>
            <h2 className="font-display text-4xl font-800 text-white uppercase tracking-tight">
              Get Early Access
              <br />
              <span className="text-brand-orange">To New Drops</span>
            </h2>
            <p className="font-body text-gray-400 mt-3 text-sm leading-relaxed">
              Be the first to know about limited releases, exclusive deals,
              <br className="hidden lg:block" /> and performance updates.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:w-auto"
          >
            {submitted ? (
              <div
                className="text-center py-6"
                data-ocid="newsletter.success_state"
              >
                <p className="font-display font-700 text-brand-orange text-xl uppercase tracking-wide">
                  You're in! 🔥
                </p>
                <p className="font-body text-gray-400 text-sm mt-2">
                  First drops coming your way.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-white/10 border border-white/20 text-white placeholder-gray-500 font-body text-sm px-5 py-3.5 outline-none focus:border-brand-orange transition-colors w-full sm:w-72"
                  data-ocid="newsletter.input"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-body font-700 uppercase tracking-wider text-sm px-6 py-3.5 transition-colors duration-200 whitespace-nowrap"
                  data-ocid="newsletter.submit_button"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
