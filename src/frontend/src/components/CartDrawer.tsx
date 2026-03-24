import { Separator } from "@/components/ui/separator";
import { useShop } from "@/context/ShopContext";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
  } = useShop();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setIsCartOpen(false)}
            data-ocid="cart.modal"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
            data-ocid="cart.sheet"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-brand-dark">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display font-700 text-white uppercase tracking-widest text-sm">
                  Your Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                data-ocid="cart.close_button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-full text-center px-6"
                  data-ocid="cart.empty_state"
                >
                  <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                  <p className="font-display font-700 text-lg uppercase tracking-wide text-gray-400">
                    Your bag is empty
                  </p>
                  <p className="font-body text-sm text-brand-gray mt-2">
                    Add some fire kicks to get started
                  </p>
                </div>
              ) : (
                <div className="px-6 py-4 space-y-4">
                  {cart.map((item, i) => (
                    <div key={item.product.id} data-ocid={`cart.item.${i + 1}`}>
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-brand-light overflow-hidden shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-700 text-sm uppercase tracking-wide text-gray-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="font-body text-xs text-brand-gray mt-0.5">
                            {item.product.brand}
                          </p>
                          <p className="font-display font-700 text-brand-orange mt-1">
                            ${item.product.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              className="w-7 h-7 border border-gray-200 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors"
                              data-ocid={`cart.button.${i + 1}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-body font-600 text-sm w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              className="w-7 h-7 border border-gray-200 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors"
                              data-ocid={`cart.button.${i + 1}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id)}
                              className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                              data-ocid={`cart.delete_button.${i + 1}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      {i < cart.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-6 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-body font-600 text-sm uppercase tracking-wide text-gray-600">
                    Subtotal
                  </span>
                  <span className="font-display font-800 text-xl text-gray-900">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <p className="font-body text-xs text-brand-gray mb-4">
                  Shipping and taxes calculated at checkout
                </p>
                <button
                  type="button"
                  className="w-full bg-brand-orange hover:bg-orange-600 text-white font-body font-700 uppercase tracking-widest text-sm py-4 transition-colors duration-200"
                  data-ocid="cart.submit_button"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
