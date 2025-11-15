import { useState, useRef, useEffect } from 'react';
import { FiMenu, FiX, FiSearch, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({
  onCategorySelect,
  onSearch,
  onHomeClick,
  isHome,
  cartItemsCount,
  onCartClick,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const menuItems = [
    { label: 'Hombre', value: 'hombre' },
    { label: 'Mujer', value: 'mujer' },
    { label: 'Colecciones', value: 'colecciones' },
    { label: 'Niños', value: 'ninos' },
    { label: 'Ofertas', value: 'ofertas' },
    { label: 'Novedades', value: 'novedades' },
  ];

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
      setSearchValue('');
      setSearchExpanded(false);
      setShowResults(false);
    }
  };

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded);
    if (!searchExpanded) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    } else {
      setSearchValue('');
      setShowResults(false);
    }
  };

  // Búsqueda en tiempo real
  useEffect(() => {
    if (searchValue.trim().length > 0) {
      const allBrands = [
        'Nike',
        'Adidas',
        'Reebok',
        'Puma',
        'New Balance',
        'DC Shoes',
        'Vans',
        'Balenciaga',
        'Converse',
        'Under Armour',
        'Asics',
        'Nike Kids',
        'Adidas Kids',
        'Puma Kids',
        'New Balance Kids',
        'Vans Kids',
        'Converse Kids',
        'Running',
        'Basketball',
        'Lifestyle',
        'Training',
        'Football',
        'Skateboard',
      ];

      const results = allBrands.filter((brand) =>
        brand.toLowerCase().includes(searchValue.toLowerCase())
      );

      setSearchResults(results.slice(0, 5));
      setShowResults(results.length > 0);
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  }, [searchValue]);

  // Cerrar búsqueda al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchExpanded(false);
        setSearchValue('');
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleResultClick = (brand) => {
    onSearch(brand);
    setSearchValue('');
    setSearchExpanded(false);
    setShowResults(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-900/60 backdrop-blur-3xl border-b border-white/8 shadow-2xl">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center h-16 sm:h-20 ${
            isHome ? 'justify-center relative' : 'justify-between'
          }`}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-center cursor-pointer group ${
              isHome ? 'mx-auto' : 'flex-shrink-0'
            }`}
            onClick={onHomeClick}
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl mr-3 sm:mr-4 transform group-hover:scale-110 transition-transform">
              👟
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient">
                SportShoes Ultra
              </h1>
              <p className="text-xs sm:text-sm text-gray-400">Experience Premium</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-xl font-bold text-gradient">SportShoes</h1>
            </div>
          </motion.div>

          {/* Desktop Navigation - Solo visible si NO es Home */}
          {!isHome && (
            <nav className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.value}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleCategoryClick(item.value)}
                  className="px-3 xl:px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-orange-400 group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              ))}
            </nav>
          )}

          {/* Right Side Actions */}
          <div className={`flex items-center gap-2 ${isHome ? 'absolute right-4 sm:right-8' : ''}`}>
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center" ref={searchContainerRef}>
              <div className="relative flex items-center">
                <motion.div
                  initial={false}
                  animate={{
                    width: searchExpanded ? '350px' : '0px',
                    opacity: searchExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden relative"
                >
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Buscar marca o modelo..."
                      className="w-full px-4 py-2.5 pl-4 pr-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                    />
                    {searchValue && (
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-orange-400 transition-colors"
                      >
                        <FiSearch className="w-5 h-5" />
                      </button>
                    )}
                  </form>

                  {/* Search Results Dropdown */}
                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-2">
                        <div className="text-xs text-gray-400 px-3 py-2 font-semibold">
                          Resultados ({searchResults.length})
                        </div>
                        {searchResults.map((result, index) => (
                          <button
                            key={index}
                            onClick={() => handleResultClick(result)}
                            className="w-full text-left px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all text-white text-sm flex items-center gap-2 group"
                          >
                            <FiSearch className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                            <span className="group-hover:text-primary transition-colors">
                              {result}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                <button
                  id="search-toggle-btn"
                  onClick={toggleSearch}
                  className={`ml-2 w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 ${
                    searchExpanded
                      ? 'bg-primary/20 border-primary/50 text-primary'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50 text-gray-300 hover:text-primary'
                  } border`}
                >
                  <FiSearch className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick}
              className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                >
                  {cartItemsCount}
                </motion.div>
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/5 border border-white/15 rounded-2xl hover:bg-white/10 hover:border-primary/60 transition-all duration-300 relative overflow-hidden group ${
              isHome ? 'absolute left-4' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {menuOpen ? (
              <FiX className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
            ) : (
              <FiMenu className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-dark-800/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Buscar marca o modelo..."
                  className="w-full px-4 py-3 pl-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </form>

              {/* Mobile Search Results */}
              {showResults && searchResults.length > 0 && (
                <div className="mb-4 bg-white/5 rounded-xl p-2">
                  <div className="text-xs text-gray-400 px-2 py-1 font-semibold">Resultados</div>
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleResultClick(result);
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition-all text-white text-sm"
                    >
                      {result}
                    </button>
                  ))}
                </div>
              )}

              {/* Mobile Menu Items - Solo si NO es Home */}
              {!isHome &&
                menuItems.map((item, index) => (
                  <motion.button
                    key={item.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleCategoryClick(item.value)}
                    className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium text-sm"
                  >
                    {item.label}
                  </motion.button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
