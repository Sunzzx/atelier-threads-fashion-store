import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { StudioCustomizer } from './components/StudioCustomizer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { AdminPortal } from './components/AdminPortal';
import { PlaybookGuideModal } from './components/PlaybookGuideModal';
import { Footer } from './components/Footer';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, CartItem, Order, StoreSettings, ProductCategory } from './types/store';
import { Sparkles, Truck, SlidersHorizontal, ArrowUpDown, Filter } from 'lucide-react';

const CURRENCY_MAP = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 },
  INR: { symbol: '₹', rate: 86.50 },
};

export const App: React.FC = () => {
  // Store products (with localStorage persistence)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('atelier_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('atelier_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('atelier_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Currency
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'INR'>('USD');

  // Filter & Search
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [modelFilter, setModelFilter] = useState<'all' | 'pod' | 'dropship'>('all');

  // Modals
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPlaybookOpen, setIsPlaybookOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutDiscountCode, setCheckoutDiscountCode] = useState('');

  // Store Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('atelier_settings');
    return saved
      ? JSON.parse(saved)
      : {
          storeName: 'Atelier Threads',
          currency: 'USD',
          currencyRate: 1.0,
          currencySymbol: '$',
          freeShippingThreshold: 100,
          autoDispatchPOD: true,
          autoDispatchDropship: true,
        };
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('atelier_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('atelier_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('atelier_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('atelier_settings', JSON.stringify(settings));
  }, [settings]);

  const activeCurrencyConfig = CURRENCY_MAP[currency];

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.selectedColor === item.selectedColor && i.selectedSize === item.selectedSize
      );
      if (existing) {
        return prev.map((i) =>
          i.cartId === existing.cartId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const handleQuickAdd = (product: Product, size: string, color: string) => {
    const item: CartItem = {
      cartId: `${product.id}-${color}-${size}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      model: product.model,
      price: product.price,
      supplierCost: product.supplierCost,
      selectedColor: color,
      selectedSize: size,
      quantity: 1,
      image: product.images[0],
    };
    handleAddToCart(item);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.cartId === cartId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleProceedToCheckout = (discount: number, code: string) => {
    setCheckoutDiscount(discount);
    setCheckoutDiscountCode(code);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setLatestOrder(order);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['fulfillmentStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, fulfillmentStatus: status } : o))
    );
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Model filter
      if (modelFilter !== 'all' && prod.model !== modelFilter) return false;

      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'pod-originals') {
          if (prod.model !== 'pod') return false;
        } else if (activeCategory === 'dropship-techwear') {
          if (prod.model !== 'dropship') return false;
        } else if (prod.category !== activeCategory) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesTagline = prod.tagline.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        if (!matchesName && !matchesTagline && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default order
    });
  }, [products, modelFilter, activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-[#f3f4f6]">
      {/* Top Sticky Navigation */}
      <Navbar
        cart={cart}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStudio={() => setIsStudioOpen(true)}
        onOpenPlaybook={() => setIsPlaybookOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <main className="flex-1">
        {/* Hero Showcase Section */}
        <HeroBanner
          onOpenStudio={() => setIsStudioOpen(true)}
          onExploreCatalog={() => {
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenPlaybook={() => setIsPlaybookOpen(true)}
        />

        {/* Catalog Section */}
        <section id="catalog-section" className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-8">
          {/* Controls Bar: Model Filter Tabs + Category Pills + Sorter */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              {/* Dual Model Filter Switcher */}
              <div className="inline-flex p-1 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono-tech">
                <button
                  onClick={() => setModelFilter('all')}
                  className={`px-4 py-2 rounded-xl transition cursor-pointer ${
                    modelFilter === 'all'
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  All Pieces ({products.length})
                </button>
                <button
                  onClick={() => setModelFilter('pod')}
                  className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                    modelFilter === 'pod'
                      ? 'bg-[#ff0055] text-white font-bold shadow-lg shadow-[#ff0055]/30'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>POD Originals Only</span>
                </button>
                <button
                  onClick={() => setModelFilter('dropship')}
                  className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                    modelFilter === 'dropship'
                      ? 'bg-[#00f0ff] text-black font-bold shadow-lg shadow-[#00f0ff]/30'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Dropship Catalog</span>
                </button>
              </div>

              {/* Sorter */}
              <div className="flex items-center gap-2 self-end text-xs font-mono-tech text-gray-400">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#161822] text-xs text-white py-1.5 px-3 rounded-xl border border-white/10 focus:outline-none focus:border-[#ff0055] cursor-pointer"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono-tech">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'pod-originals', label: 'POD Originals' },
                { id: 'pod-hoodies', label: 'Heavy Hoodies' },
                { id: 'pod-tees', label: 'Oversized Tees' },
                { id: 'dropship-techwear', label: 'Techwear Cargos' },
                { id: 'dropship-outerwear', label: 'Utility Vests' },
                { id: 'dropship-accessories', label: 'Sunglasses & Chains' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition cursor-pointer border ${
                    activeCategory === cat.id
                      ? 'bg-white/15 text-white border-white/30 font-bold'
                      : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/15 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-gray-500">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">No pieces match your filters</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Try resetting your search query or switching to 'All Categories'.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setModelFilter('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono-tech cursor-pointer transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  currencySymbol={activeCurrencyConfig.symbol}
                  currencyRate={activeCurrencyConfig.rate}
                  onOpenDetails={(p) => setSelectedProduct(p)}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Global Modals */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        currencySymbol={activeCurrencyConfig.symbol}
        currencyRate={activeCurrencyConfig.rate}
      />

      <StudioCustomizer
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        onAddToCart={handleAddToCart}
        currencySymbol={activeCurrencyConfig.symbol}
        currencyRate={activeCurrencyConfig.rate}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        currencySymbol={activeCurrencyConfig.symbol}
        currencyRate={activeCurrencyConfig.rate}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        discount={checkoutDiscount}
        discountCode={checkoutDiscountCode}
        onOrderSuccess={handleOrderSuccess}
        currencySymbol={activeCurrencyConfig.symbol}
        currencyRate={activeCurrencyConfig.rate}
      />

      <OrderConfirmationModal
        order={latestOrder}
        onClose={() => setIsConfirmationOpen(false)}
        currencySymbol={activeCurrencyConfig.symbol}
        currencyRate={activeCurrencyConfig.rate}
      />

      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        products={products}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onAddProduct={handleAddProduct}
        settings={settings}
        onUpdateSettings={setSettings}
        currencySymbol={activeCurrencyConfig.symbol}
        currencyRate={activeCurrencyConfig.rate}
      />

      <PlaybookGuideModal
        isOpen={isPlaybookOpen}
        onClose={() => setIsPlaybookOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenStudio={() => setIsStudioOpen(true)}
        onOpenPlaybook={() => setIsPlaybookOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectCategory={setActiveCategory}
      />
    </div>
  );
};
