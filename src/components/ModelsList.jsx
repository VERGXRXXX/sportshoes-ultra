import { motion } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';

const ModelsList = ({ models, onModelSelect }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
    >
      {models.map((model) => (
        <motion.div
          key={model}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          onClick={() => onModelSelect(model)}
          className="group relative cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
            {/* Image placeholder with gradient */}
            <div className="relative h-48 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <motion.div
                className="text-7xl filter drop-shadow-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                👟
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all">
                {model}
              </h3>
              <p className="text-sm text-gray-400 mb-4">Ver productos disponibles</p>
              
              <button className="w-full py-2 px-4 bg-gradient-to-r from-primary to-orange-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105">
                <FiShoppingCart className="w-4 h-4" />
                Ver opciones
              </button>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ModelsList;
