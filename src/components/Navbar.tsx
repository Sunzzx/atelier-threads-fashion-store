import React from 'react';
import { ShoppingBag, Sparkles, Sliders, BookOpen, ShieldCheck, Search } from 'lucide-react';
import { CartItem } from '../types/store';

interface NavbarProps {
  cart: CartItem[];
  currency: 'USD' | 'EUR' | 'GBP' | 'INR';
  onCurrencyChange: (c: 'USD' | 'EUR' | 'GBP' | 'INR') => void;
  onOpenCart: () => void;
  onOpenStudio: () => void;
  onOpenPlaybook: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  currency,
  onCurrencyChange,
  onOpenCart,
  onOpenStudio,
  onOpenPlaybook,
  onOpenAdmin,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
}) => {
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff0055] to-[#00f0ff] p-[1.5px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b0c10] rounded-[7px] flex items-center justify-center font-bold text-white text-sm">
                AT
              </div>
            </div>
            <div>
              <span className="font-display font-extrabold text-lg lg:text-xl tracking-wider text-white">
                ATELIER<span className="text-[#ff0055]">.</span>THREADS
              </span>
              <span className="hidden sm:block text-[9px] font-mono-tech tracking-widest text-gray-400 uppercase">
                POD & Dropship Atelier
              </span>
            </div>
          </button>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              All Pieces
            </button>
            <button
              onClick={() => onSelectCategory('pod-originals')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'pod-originals' || activeCategory === 'pod-tees' || activeCategory === 'pod-hoodies'
                  ? 'bg-[#ff0055]/20 text-[#ff0055] border border-[#ff0055]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff0055]" />
              POD Originals
            </button>
            <button
              onClick={() => onSelectCategory('dropship-techwear')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                activeCategory === 'dropship-techwear' || activeCategory === 'dropship-outerwear' || activeCategory === 'dropship-accessories'
                  ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Dropship Catalog
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xs relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search hoodies, cargos, tees..."
            className="w-full bg-[#161822] text-xs text-white placeholder-gray-500 pl-9 pr-3 py-2 rounded-full border border-white/10 focus:border-[#ff0055] focus:outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-white"
            >
              ×
            </button>
          )}
        </div>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* POD Customizer Studio CTA */}
          <button
            onClick={onOpenStudio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ff0055] to-[#7928ca] text-white text-xs font-bold hover:opacity-90 shadow-md hover:shadow-[#ff0055]/30 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">Design Studio</span>
            <span className="sm:hidden">Studio</span>
          </button>

          {/* Zero-Cost Playbook */}
          <button
            onClick={onOpenPlaybook}
            title="Read $0 Forever Operating Manual"
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition border border-white/5 cursor-pointer hidden md:flex items-center gap-1 text-xs"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] text-gray-300 font-mono-tech">$0 Playbook</span>
          </button>

          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as any)}
            className="bg-[#161822] text-gray-300 text-xs py-1.5 px-2 rounded-md border border-white/10 focus:outline-none focus:border-[#ff0055] cursor-pointer"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
          </select>

          {/* Admin Switcher */}
          <button
            onClick={onOpenAdmin}
            title="Merchant & Fulfillment Admin"
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ff0055] text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-bounce">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
