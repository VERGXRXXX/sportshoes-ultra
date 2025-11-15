import { motion } from 'framer-motion';

const Home = ({ onCategorySelect }) => {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-6xl sm:text-7xl lg:text-9xl mb-4 sm:mb-6 lg:mb-8"
            >
              👟
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-gradient leading-tight px-4">
              SportShoes Ultra
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-300 mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto font-light px-4">
              Descubre la colección más exclusiva de calzado deportivo premium
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4"
            >
              <div className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-full border border-primary/30 backdrop-blur-sm">
                <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">
                  ✨ Últimos lanzamientos 2024
                </span>
              </div>
              <div className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 backdrop-blur-sm">
                <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">
                  🔥 Ofertas exclusivas
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Colecciones Destacadas
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">Explora nuestras categorías premium</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Hombre - Grande solo en desktop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => onCategorySelect('hombre')}
              className="group relative cursor-pointer lg:col-span-2 lg:row-span-2"
            >
              <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-blue-900/40 border border-white/10 p-6 sm:p-8 lg:p-12 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 h-full min-h-[200px] sm:min-h-[250px] lg:min-h-[400px] flex flex-col justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-blue-500/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="text-6xl sm:text-7xl lg:text-9xl mb-3 sm:mb-4 lg:mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    👨
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 group-hover:text-gradient transition-all">
                    Hombre
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-3 sm:mb-4 lg:mb-6">
                    Las mejores marcas deportivas para hombre
                  </p>
                  <div className="flex items-center text-primary font-semibold text-sm sm:text-base lg:text-lg">
                    <span>Explorar colección</span>
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 ml-2 transform group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>

                <div className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-primary/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"></div>
              </div>
            </motion.div>

            {/* Mujer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => onCategorySelect('mujer')}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-pink-900/40 via-pink-800/30 to-pink-900/40 border border-white/10 p-6 sm:p-8 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 h-full min-h-[180px] sm:min-h-[190px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-pink-500/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    👩
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-gradient transition-all">
                    Mujer
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">Estilo y rendimiento</p>
                </div>
              </div>
            </motion.div>

            {/* Colecciones */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => onCategorySelect('colecciones')}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-purple-900/40 border border-white/10 p-6 sm:p-8 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 h-full min-h-[180px] sm:min-h-[190px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-purple-500/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    ⭐
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-gradient transition-all">
                    Colecciones
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">Ediciones especiales</p>
                </div>
              </div>
            </motion.div>

            {/* Niños */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => onCategorySelect('ninos')}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-green-900/40 via-green-800/30 to-green-900/40 border border-white/10 p-6 sm:p-8 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 h-full min-h-[180px] sm:min-h-[190px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-green-500/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    👶
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-gradient transition-all">
                    Niños
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">Comodidad infantil</p>
                </div>
              </div>
            </motion.div>

            {/* Ofertas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => onCategorySelect('ofertas')}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-red-900/40 via-red-800/30 to-red-900/40 border border-white/10 p-6 sm:p-8 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 h-full min-h-[180px] sm:min-h-[190px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-red-500/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  HASTA 50% OFF
                </div>

                <div className="relative z-10">
                  <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    🔥
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-gradient transition-all">
                    Ofertas
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">Descuentos increíbles</p>
                </div>
              </div>
            </motion.div>

            {/* Novedades */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onClick={() => onCategorySelect('novedades')}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-yellow-900/40 via-yellow-800/30 to-yellow-900/40 border border-white/10 p-6 sm:p-8 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 h-full min-h-[180px] sm:min-h-[190px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-yellow-500/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                  NUEVO
                </div>

                <div className="relative z-10">
                  <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    ✨
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-gradient transition-all">
                    Novedades
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">Últimos lanzamientos</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
          >
            <div className="text-center p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 group">
              <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform">
                🚚
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                Envío Gratis
              </h3>
              <p className="text-sm sm:text-base text-gray-400">En pedidos superiores a $100</p>
            </div>
            <div className="text-center p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 group">
              <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform">
                ✅
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                Calidad Garantizada
              </h3>
              <p className="text-sm sm:text-base text-gray-400">100% productos auténticos</p>
            </div>
            <div className="text-center p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 group">
              <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform">
                💳
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Pago Seguro</h3>
              <p className="text-sm sm:text-base text-gray-400">Múltiples métodos de pago</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              ¿Listo para comenzar?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 px-4">
              Explora nuestra colección completa y encuentra el calzado perfecto para ti
            </p>
            <button
              onClick={() => onCategorySelect('hombre')}
              className="px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-primary to-orange-500 text-white text-base sm:text-lg font-bold rounded-full hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
            >
              Explorar Ahora
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
