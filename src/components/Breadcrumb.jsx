import { FiChevronRight, FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Breadcrumb = ({ path, onNavigate }) => {
  if (path.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 mb-6"
    >
      <div className="flex items-center flex-wrap gap-2 text-sm">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
        >
          <FiHome className="w-4 h-4" />
          <span>Inicio</span>
        </button>

        {path.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <FiChevronRight className="w-4 h-4 text-gray-600" />
            {index === path.length - 1 ? (
              <span className="text-white font-medium">{item.label}</span>
            ) : (
              <button
                onClick={() => onNavigate(item.type, item.value)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Breadcrumb;
