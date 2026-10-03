import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { InteractiveStudio } from './components/InteractiveStudio';
import { CartDrawer } from './components/CartDrawer';
import { InquiryModal } from './components/InquiryModal';
import { SupabaseSchemaModal } from './components/SupabaseSchemaModal';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, CartItem } from './types/marketplace';
import { Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isSchemaOpen, setIsSchemaOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add to Cart handler
  const handleAddToCart = (product: Product, tier: 'Starter' | 'Pro' | 'Enterprise' = 'Pro') => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.tier === tier
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      }
      return [...prev, { product, quantity: 1, tier }];
    });
    showToast(`Added "${product.title}" (${tier}) to order`);
  };

  // Cart operations
  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filtered products
  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'all', label: 'All Artifacts' },
    { key: 'video-motion', label: 'Video Motion' },
    { key: 'stills-carousels', label: 'Stills & Carousels' },
    { key: 'engineering-web', label: 'Engineering & Web' },
    { key: 'automation', label: 'Lead Automation' },
    { key: 'interactive-tools', label: 'Tools' },
  ];

  // Smooth scroll anchors
  const scrollToStudio = () => {
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMarketplace = () => {
    document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col selection:bg-brand-accent/30 selection:text-brand-accent2">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-accent/50 text-brand-text text-xs font-mono shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-brand-accent" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cartCount={cart.reduce((sum, it) => sum + it.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
        onOpenSchema={() => setIsSchemaOpen(true)}
        onScrollToStudio={scrollToStudio}
        onScrollToMarketplace={scrollToMarketplace}
        onScrollToAbout={scrollToAbout}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMarketplace={scrollToMarketplace}
          onOpenStudio={scrollToStudio}
        />

        {/* Marketplace Section */}
        <section id="marketplace" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-brand-border/60 gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-brand-accent uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Products & Engineering Sprints</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text tracking-tight">
                LinkedIn Marketplace Catalog
              </h2>
              <p className="text-xs sm:text-sm text-brand-dim mt-1">
                Programmatic templates, automation systems, and direct technical execution.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 text-brand-dim absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search templates, stack, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent font-sans"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-brand-dim shrink-0 ml-1 hidden sm:block" />
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedCategory(c.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === c.key
                    ? 'bg-brand-accent text-brand-bg font-semibold shadow-sm glow-accent'
                    : 'bg-brand-surface border border-brand-border text-brand-dim hover:text-brand-text hover:border-brand-borderLight'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center glass-panel rounded-2xl">
              <Search className="w-10 h-10 text-brand-dim mx-auto mb-3" />
              <h3 className="text-base font-bold text-brand-text">No matches found</h3>
              <p className="text-xs text-brand-dim mt-1 max-w-sm mx-auto">
                No products match "{searchQuery}". Try searching for React, Remotion, PostgreSQL, or clear the filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-xs text-brand-text hover:border-brand-accent transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, 'Pro')}
                />
              ))}
            </div>
          )}

        </section>

        {/* Live Interactive Studio */}
        <InteractiveStudio />

        {/* About Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenSchema={() => setIsSchemaOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      <SupabaseSchemaModal
        isOpen={isSchemaOpen}
        onClose={() => setIsSchemaOpen(false)}
      />

    </div>
  );
};

export default App;
