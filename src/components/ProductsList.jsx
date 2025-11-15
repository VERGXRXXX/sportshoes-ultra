import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiStar } from 'react-icons/fi';
import ProductDetailModal from './ProductDetailModal';

const ProductsList = ({ products, onAddToCart, onBuyNow }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="group relative cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
              {/* Product Image */}
              <div className="relative h-56 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                    -{product.discount}%
                  </div>
                )}

                <motion.div
                  className="text-8xl filter drop-shadow-2xl relative z-10"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  👟
                </motion.div>

                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-primary/90 px-6 py-2 rounded-full">
                    Ver Detalles
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-3 h-3 ${
                        i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">(4.0)</span>
                </div>

                <h3 className="text-base font-bold text-white mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{product.color}</p>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-gradient">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-primary to-orange-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105"
                >
                  <FiShoppingBag className="w-4 h-4" />
                  Seleccionar Talla
                </button>
              </div>

              {/* Premium badge */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                PREMIUM
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />
    </>
  );
};

export default ProductsList;
