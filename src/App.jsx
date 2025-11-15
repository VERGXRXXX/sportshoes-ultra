import { useState } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import Home from './components/Home';
import Breadcrumb from './components/Breadcrumb';
import BrandsList from './components/BrandsList';
import ProductsList from './components/ProductsList';
import ShoppingCart from './components/ShoppingCart';
import CheckoutModal from './components/CheckoutModal';
import { catalogData, modelsByBrand } from './data/catalogData';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [breadcrumbPath, setBreadcrumbPath] = useState([]);
  const [generatedProducts, setGeneratedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [buyNowData, setBuyNowData] = useState(null);

  // Add to cart
  const handleAddToCart = (product, size, quantity) => {
    const cartItem = {
      ...product,
      size,
      quantity,
      cartId: `${product.id}-${size}`,
    };

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id && item.size === size);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, cartItem];
    });
  };

  // Update quantity
  const handleUpdateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.size === size ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (productId, size) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === productId && item.size === size)));
  };

  // Checkout from cart
  const handleCheckout = () => {
    setIsCartOpen(false);
    setBuyNowData(null);
    setIsCheckoutOpen(true);
  };

  // Buy Now - Compra directa sin carrito
  const handleBuyNow = (product, size, quantity) => {
    const buyNowItem = {
      ...product,
      size,
      quantity,
      cartId: `${product.id}-${size}`,
    };

    // Crear array temporal con solo este producto
    const tempCart = [buyNowItem];

    // Calcular totales temporales
    const tempSubtotal = parseFloat(buyNowItem.price) * buyNowItem.quantity;
    const tempShipping = tempSubtotal > 100 ? 0 : 15;
    const tempTax = tempSubtotal * 0.19;
    const tempTotal = tempSubtotal + tempShipping + tempTax;

    // Guardar en estado temporal para checkout
    setBuyNowData({
      items: tempCart,
      subtotal: tempSubtotal,
      shipping: tempShipping,
      tax: tempTax,
      total: tempTotal,
    });

    // Abrir checkout directamente
    setIsCheckoutOpen(true);
  };

  // Navigate to home
  const handleHomeClick = () => {
    setCurrentView('home');
    setCurrentCategory(null);
    setCurrentBrand(null);
    setBreadcrumbPath([]);
    setGeneratedProducts([]);
  };

  // Navigate to category/brands
  const handleCategorySelect = (category) => {
    setCurrentView('brands');
    setCurrentCategory(category);
    setCurrentBrand(null);
    setBreadcrumbPath([
      {
        type: 'category',
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
      },
    ]);
    setGeneratedProducts([]);
  };

  // Navigate to brand/products
  const handleBrandSelect = (brand) => {
    setCurrentView('products');
    setCurrentBrand(brand);

    const models = modelsByBrand[brand] || ['Modelo 1', 'Modelo 2', 'Modelo 3', 'Modelo 4'];
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

    const products = models.map((model, index) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const price = (Math.random() * 150 + 50).toFixed(2);
      const hasDiscount = Math.random() > 0.5;
      const discount = hasDiscount ? Math.floor(Math.random() * 40) + 10 : null;
      const originalPrice = hasDiscount
        ? (parseFloat(price) / (1 - discount / 100)).toFixed(2)
        : null;

      return {
        id: `${brand}-${index}`,
        name: `${brand} ${model}`,
        model: model,
        color: color,
        price: price,
        originalPrice: originalPrice,
        discount: discount,
        category: currentCategory,
        brand: brand,
      };
    });

    setGeneratedProducts(products);
    setBreadcrumbPath([
      {
        type: 'category',
        value: currentCategory,
        label: currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1),
      },
      { type: 'brand', value: brand, label: brand },
    ]);
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    const lowerSearch = searchTerm.toLowerCase();

    const allBrands = [
      ...catalogData.hombre.brands,
      ...catalogData.mujer.brands,
      ...catalogData.colecciones.brands,
      ...catalogData.ninos.brands,
      ...catalogData.ofertas.brands,
      ...catalogData.novedades.brands,
    ];

    const uniqueBrands = [...new Set(allBrands)];
    const matchingBrand = uniqueBrands.find((brand) => brand.toLowerCase().includes(lowerSearch));

    if (matchingBrand) {
      for (const [category, data] of Object.entries(catalogData)) {
        if (data.brands.includes(matchingBrand)) {
          setCurrentCategory(category);
          handleBrandSelect(matchingBrand);
          return;
        }
      }
    }

    alert('No se encontraron resultados para: ' + searchTerm);
  };

  // Handle breadcrumb navigation
  const handleBreadcrumbNavigate = (type, value) => {
    if (type === 'home') {
      handleHomeClick();
    } else if (type === 'category') {
      handleCategorySelect(value);
    }
  };

  // Get current content
  const getCurrentContent = () => {
    if (currentView === 'home') {
      return <Home onCategorySelect={handleCategorySelect} />;
    }

    return (
      <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb path={breadcrumbPath} onNavigate={handleBreadcrumbNavigate} />

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
            {currentView === 'brands' &&
              currentCategory &&
              currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
            {currentView === 'products' && currentBrand}
          </h2>

          {currentView === 'brands' && currentCategory && (
            <BrandsList
              brands={catalogData[currentCategory].brands}
              onBrandSelect={handleBrandSelect}
            />
          )}

          {currentView === 'products' && generatedProducts.length > 0 && (
            <ProductsList
              products={generatedProducts}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          )}
        </div>
      </div>
    );
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.19;
  const total = subtotal + shipping + tax;
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10">
        <Header
          onCategorySelect={handleCategorySelect}
          onSearch={handleSearch}
          onHomeClick={handleHomeClick}
          isHome={currentView === 'home'}
          cartItemsCount={cartItemsCount}
          onCartClick={() => setIsCartOpen(true)}
        />

        {getCurrentContent()}
      </div>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setBuyNowData(null);
        }}
        cartItems={buyNowData ? buyNowData.items : cartItems}
        total={buyNowData ? buyNowData.total : total}
        subtotal={buyNowData ? buyNowData.subtotal : subtotal}
        shipping={buyNowData ? buyNowData.shipping : shipping}
        tax={buyNowData ? buyNowData.tax : tax}
      />
    </div>
  );
}

export default App;
