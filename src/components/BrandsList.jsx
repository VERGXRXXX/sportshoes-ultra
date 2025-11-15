import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const BrandsList = ({ brands, onBrandSelect }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
    >
      {brands.map((brand) => (
        <motion.div
          key={brand}
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBrandSelect(brand)}
          className="group relative cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gradient transition-all">
                  {brand}
                </h3>
                <p className="text-sm text-gray-400">Ver modelos</p>
              </div>
              
              <div className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-primary/20 transition-all duration-300">
                <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BrandsList;
