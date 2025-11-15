import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiTag, FiTruck } from 'react-icons/fi';

const ShoppingCart = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.19; // 19% IVA
  const total = subtotal + shipping + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-dark-900 shadow-2xl z-50 flex flex-col border-l border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-dark-800/50 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <FiShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Carrito</h2>
                  <p className="text-sm text-gray-400">
                    {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <FiShoppingBag className="w-12 h-12 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Tu carrito está vacío</h3>
                  <p className="text-gray-400 mb-6">Agrega productos para comenzar</p>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-orange-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/50 transition-all"
                  >
                    Explorar Productos
                  </button>
                </motion.div>
              ) : (
                <>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all group"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-5xl">👟</span>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-white text-sm mb-1 truncate">
                                {item.name}
                              </h3>
                              <p className="text-xs text-gray-400">Color: {item.color}</p>
                              <p className="text-xs text-gray-400">Talla: EU {item.size}</p>
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.id, item.size)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Quantity & Price */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.id,
                                    item.size,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                              >
                                <FiMinus className="w-3 h-3" />
                              </button>
                              <span className="text-white font-bold w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.id,
                                    item.size,
                                    Math.min(10, item.quantity + 1)
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                              >
                                <FiPlus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gradient">
                                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-gray-500">${item.price} c/u</p>
                              )}
                            </div>
                          </div>

                          {/* Discount Badge */}
                          {item.discount && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                              -{item.discount}%
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Coupon Section */}
                  <div className="mt-6">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <FiTag className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-white">¿Tienes un cupón?</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Código de descuento"
                          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-all">
                          Aplicar
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer - Summary */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/10 bg-dark-800/50 backdrop-blur-xl p-6 space-y-4">
                {/* Shipping Info */}
                <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <FiTruck className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    {subtotal >= 100 ? (
                      <p className="text-sm text-green-500 font-semibold">¡Envío gratis! 🎉</p>
                    ) : (
                      <p className="text-sm text-gray-300">
                        Agrega{' '}
                        <span className="text-green-500 font-bold">
                          ${(100 - subtotal).toFixed(2)}
                        </span>{' '}
                        más para envío gratis
                      </p>
                    )}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Envío</span>
                    <span className="text-white font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-500">GRATIS</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">IVA (19%)</span>
                    <span className="text-white font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/10 my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-gradient">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={onCheckout}
                  className="w-full py-4 bg-gradient-to-r from-primary to-orange-500 text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <FiShoppingBag className="w-5 h-5" />
                  Proceder al Pago
                </button>

                <p className="text-center text-xs text-gray-500">
                  Pago seguro • Envío protegido • Devoluciones fáciles
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
