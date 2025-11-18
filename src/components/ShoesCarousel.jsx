import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiStar, FiChevronLeft, FiChevronRight, FiHeart } from 'react-icons/fi';
import { catalogData, modelsByBrand } from '../data/catalogData';

const ShoesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Generar productos aleatorios al cargar
  useEffect(() => {
    const generateRandomProducts = () => {
      const allBrands = [
        ...catalogData.hombre.brands,
        ...catalogData.mujer.brands,
        ...catalogData.colecciones.brands,
        ...catalogData.ninos.brands,
        ...catalogData.ofertas.brands,
        ...catalogData.novedades.brands,
      ];

      const uniqueBrands = [...new Set(allBrands)];
      const shuffledBrands = uniqueBrands.sort(() => Math.random() - 0.5).slice(0, 12);

      const colors = [
        'Negro',
        'Blanco',
        'Azul',
        'Rojo',
        'Verde',
        'Gris',
        'Naranja',
        'Rosa',
        'Morado',
        'Dorado',
        'Plateado',
        'Beige',
      ];
      const badges = ['NUEVO', 'BESTSELLER', 'LIMITADO', 'EXCLUSIVO', 'HOT', 'PREMIUM'];

      const generatedProducts = shuffledBrands.map((brand, index) => {
        const models = modelsByBrand[brand] || ['Modelo Premium', 'Modelo Sport', 'Modelo Classic'];
        const randomModel = models[Math.floor(Math.random() * models.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const price = (Math.random() * 150 + 50).toFixed(2);
        const hasDiscount = Math.random() > 0.5;
        const discount = hasDiscount ? Math.floor(Math.random() * 40) + 10 : null;
        const originalPrice = hasDiscount
          ? (parseFloat(price) / (1 - discount / 100)).toFixed(2)
          : null;
        const badge = badges[Math.floor(Math.random() * badges.length)];

        return {
          id: `carousel-${brand}-${index}`,
          name: `${brand} ${randomModel}`,
          model: randomModel,
          color: color,
          price: price,
          originalPrice: originalPrice,
          discount: discount,
          brand: brand,
          rating: (Math.random() * 1 + 4).toFixed(1),
          badge: badge,
          reviews: Math.floor(Math.random() * 500) + 50,
        };
      });

      setProducts(generatedProducts);
    };

    generateRandomProducts();
  }, []);

  // Auto-play con pausa
  useEffect(() => {
    if (products.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 3) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length, isPaused]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % products.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 3 + products.length) % products.length);
    }
  };

  if (products.length === 0) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Obtener los 3 productos actuales
  const visibleProducts = [
    products[currentIndex % products.length],
    products[(currentIndex + 1) % products.length],
    products[(currentIndex + 2) % products.length],
  ];

  return (
    <div
      className="relative w-full py-8 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header del carrusel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-purple-600/20 border border-primary/30 rounded-full px-6 py-2 mb-4">
          <span className="text-2xl">⭐</span>
          <span className="text-white font-bold text-lg">Productos Destacados</span>
        </div>
        <p className="text-gray-400">Los más vendidos de esta semana</p>
      </motion.div>

      {/* Contenedor de productos */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? 300 : -300 }}
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="group relative cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
                  {/* Product Image */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center overflow-hidden">
                    {/* Efecto de brillo animado */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                      {product.discount && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', delay: 0.2 }}
                          className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                        >
                          -{product.discount}%
                        </motion.div>
                      )}
                      <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', delay: 0.3 }}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                      >
                        {product.badge}
                      </motion.div>
                    </div>

                    {/* Botón de favorito */}
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-3 right-3 w-10 h-10 bg-white/10 hover:bg-red-500 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all z-10 opacity-0 group-hover:opacity-100"
                    >
                      <FiHeart className="w-5 h-5" />
                    </motion.button>

                    {/* Zapato */}
                    <motion.div
                      className="text-8xl filter drop-shadow-2xl relative z-10"
                      whileHover={{
                        scale: 1.15,
                        rotate: -8,
                        y: -10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      👟
                    </motion.div>

                    {/* Quick view overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1 }}
                        className="flex flex-col gap-2"
                      >
                        <span className="text-white text-sm font-medium bg-primary px-6 py-2 rounded-full">
                          Vista Rápida
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    {/* Rating */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                        {product.brand}
                      </span>
                    </div>

                    {/* Nombre */}
                    <h3 className="text-base font-bold text-white mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    {/* Color */}
                    <p className="text-sm text-gray-400 mb-3">{product.color}</p>

                    {/* Precio */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-gradient">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Botón */}
                    <button className="w-full py-2.5 px-4 bg-gradient-to-r from-primary to-orange-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform group-hover:scale-105">
                      <FiShoppingBag className="w-4 h-4" />
                      <span className="text-sm">Agregar al Carrito</span>
                    </button>
                  </div>

                  {/* Indicador de stock */}
                  <div className="absolute bottom-20 right-3 text-xs text-green-400 bg-green-500/10 border border-green-500/30 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    ✓ En stock
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Botones de navegación */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all border border-white/20 shadow-xl z-10 hidden md:flex"
        >
          <FiChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all border border-white/20 shadow-xl z-10 hidden md:flex"
        >
          <FiChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Indicadores de progreso mejorados */}
      <div className="flex justify-center items-center gap-3 mt-8">
        {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => {
          const slideIndex = index * 3;
          const isActive = currentIndex === slideIndex;

          return (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(slideIndex > currentIndex ? 1 : -1);
                setCurrentIndex(slideIndex);
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className="relative group"
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-12 h-3 bg-gradient-to-r from-primary to-orange-500'
                    : 'w-3 h-3 bg-white/30 group-hover:bg-white/50'
                }`}
              />
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-primary/50 rounded-full blur-md"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Contador y estado */}
      <div className="flex justify-center gap-4 mt-4">
        <div className="text-white/60 text-sm font-semibold bg-black/30 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
          {Math.floor(currentIndex / 3) + 1} / {Math.ceil(products.length / 3)}
        </div>
        {isPaused && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-white/60 text-sm font-semibold bg-black/30 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10"
          >
            ⏸ Pausado
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ShoesCarousel;
