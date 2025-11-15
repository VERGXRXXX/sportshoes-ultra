import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiShoppingBag,
  FiHeart,
  FiMinus,
  FiPlus,
  FiCheck,
  FiTruck,
  FiRotateCcw,
  FiShield,
  FiInfo,
  FiChevronRight,
} from 'react-icons/fi';

const ProductDetailModal = ({ isOpen, onClose, product, onAddToCart, onBuyNow }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Tallas disponibles con disponibilidad
  const sizes = [
    { us: '6', eu: '36', cm: '22', stock: 5 },
    { us: '7', eu: '38', cm: '23', stock: 8 },
    { us: '8', eu: '39', cm: '24', stock: 12 },
    { us: '8.5', eu: '40', cm: '24.5', stock: 6 },
    { us: '9', eu: '40.5', cm: '25', stock: 15 },
    { us: '9.5', eu: '41', cm: '25.5', stock: 4 },
    { us: '10', eu: '42', cm: '26', stock: 10 },
    { us: '11', eu: '43', cm: '27', stock: 7 },
  ];

  // Imágenes del producto
  const productImages = ['👟', '👞', '🥾', '👠'];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }

    // Llamar a la función onAddToCart del padre
    if (onAddToCart && product) {
      onAddToCart(product, selectedSize, quantity);
    }

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      onClose();
      setSelectedSize('');
      setQuantity(1);
    }, 2500);
  };
  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }

    // Llamar a la función onBuyNow del padre
    if (onBuyNow && product) {
      onBuyNow(product, selectedSize, quantity);
    }

    // Cerrar modal inmediatamente
    onClose();
    setSelectedSize('');
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity(Math.min(quantity + 1, 10));
  const decrementQuantity = () => setQuantity(Math.max(quantity - 1, 1));

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-dark-900 rounded-2xl sm:rounded-3xl w-full max-w-6xl my-auto shadow-2xl pointer-events-auto border border-white/5 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {addedToCart ? (
                // Success State
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center p-12 sm:p-20 min-h-[400px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                    className="relative mb-8"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <FiCheck className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={3} />
                    </div>
                  </motion.div>

                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center"
                  >
                    ¡Agregado al Carrito!
                  </motion.h3>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 text-lg sm:text-xl mb-8 text-center px-4"
                  >
                    {product.name} - Talla EU {selectedSize}
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md px-4"
                  >
                    <button
                      onClick={onClose}
                      className="flex-1 px-6 py-3 sm:py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
                    >
                      Seguir Comprando
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Columna Izquierda - Galería */}
                  <div className="relative bg-gradient-to-br from-dark-800 to-dark-900 p-6 sm:p-8 lg:p-12 max-h-[40vh] lg:max-h-[90vh] overflow-hidden">
                    {/* Close Button Mobile */}
                    <button
                      onClick={onClose}
                      className="absolute top-4 right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-xl hover:bg-black/70 transition-all"
                    >
                      <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex flex-col gap-2">
                      {product.discount && (
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                          -{product.discount}%
                        </div>
                      )}
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                        PREMIUM
                      </div>
                    </div>

                    {/* Favorite */}
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="absolute top-16 sm:top-20 right-4 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-xl hover:bg-black/70 transition-all"
                    >
                      <FiHeart
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-all ${
                          isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                        }`}
                      />
                    </button>

                    {/* Main Image */}
                    <div className="flex items-center justify-center h-48 sm:h-64 lg:h-96">
                      <motion.div
                        key={selectedImage}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-8xl sm:text-9xl lg:text-[12rem]"
                      >
                        {productImages[selectedImage]}
                      </motion.div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 sm:gap-3 mt-4 justify-center">
                      {productImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl transition-all ${
                            selectedImage === index
                              ? 'bg-white/10 border-2 border-primary'
                              : 'bg-white/5 border-2 border-white/10'
                          }`}
                        >
                          {img}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Columna Derecha - Detalles */}
                  <div className="bg-dark-800 p-6 sm:p-8 lg:p-12 overflow-y-auto max-h-[60vh] lg:max-h-[90vh]">
                    <div className="space-y-6">
                      {/* Product Info */}
                      <div>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                              }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs sm:text-sm text-gray-400 ml-2">
                            (4.0) • 1,284 reseñas
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                          {product.name}
                        </h2>
                        <p className="text-base sm:text-lg text-gray-400 mb-4">{product.color}</p>

                        <div className="flex items-baseline gap-3">
                          <span className="text-4xl sm:text-5xl font-bold text-gradient">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xl sm:text-2xl text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Size Selector */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg sm:text-xl font-bold text-white">
                            Talla{' '}
                            {selectedSize && (
                              <span className="text-primary">EU {selectedSize}</span>
                            )}
                          </h3>
                          <button
                            onClick={() => setShowSizeGuide(!showSizeGuide)}
                            className="text-xs sm:text-sm text-primary flex items-center gap-1"
                          >
                            <FiInfo className="w-4 h-4" />
                            Guía
                          </button>
                        </div>

                        {showSizeGuide && (
                          <div className="bg-white/5 rounded-xl p-3 mb-3 text-xs">
                            <div className="grid grid-cols-3 gap-2">
                              <div className="font-bold">US</div>
                              <div className="font-bold">EU</div>
                              <div className="font-bold">CM</div>
                              {sizes.slice(0, 4).map((size, idx) => (
                                <div key={idx} className="contents">
                                  <div className="text-gray-400">{size.us}</div>
                                  <div className="text-gray-400">{size.eu}</div>
                                  <div className="text-gray-400">{size.cm}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-4 gap-2">
                          {sizes.map((size) => (
                            <button
                              key={size.eu}
                              onClick={() => size.stock > 0 && setSelectedSize(size.eu)}
                              disabled={size.stock === 0}
                              className={`relative p-3 rounded-xl border-2 transition-all ${
                                selectedSize === size.eu
                                  ? 'border-primary bg-primary/20'
                                  : size.stock === 0
                                  ? 'border-white/5 bg-white/5 opacity-40'
                                  : 'border-white/10 bg-white/5 hover:border-white/30'
                              }`}
                            >
                              <div className="text-sm font-bold">{size.eu}</div>
                              <div className="text-xs text-gray-400">{size.us}</div>
                              {selectedSize === size.eu && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                  <FiCheck className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">Cantidad</h3>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={decrementQuantity}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
                          >
                            <FiMinus />
                          </button>
                          <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                          <button
                            onClick={incrementQuantity}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                          <FiTruck className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-300">
                            Envío gratis sobre $100
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                          <FiRotateCcw className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-300">
                            Devoluciones gratis 30 días
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                          <FiShield className="w-5 h-5 text-purple-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-300">100% Auténtico</span>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="space-y-3">
                        <button
                          onClick={handleAddToCart}
                          className="w-full py-4 bg-gradient-to-r from-primary to-orange-500 text-white text-base sm:text-lg font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/50 transition-all"
                        >
                          <FiShoppingBag className="w-5 h-5" />
                          Agregar al Carrito
                        </button>
                        <button
                          onClick={handleBuyNow}
                          className="w-full py-4 bg-white text-black text-base sm:text-lg font-bold rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                        >
                          Comprar Ahora
                          <FiChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;
