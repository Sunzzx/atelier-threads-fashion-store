import React, { useState } from 'react';
import { X, TrendingUp, DollarSign, Package, Settings, Plus, Check, RefreshCw, Key, ShieldCheck } from 'lucide-react';
import { Order, Product, StoreSettings } from '../types/store';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  products: Product[];
  onUpdateOrderStatus: (orderId: string, status: Order['fulfillmentStatus']) => void;
  onAddProduct: (product: Product) => void;
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  orders,
  products,
  onUpdateOrderStatus,
  onAddProduct,
  settings,
  onUpdateSettings,
  currencySymbol,
  currencyRate,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'settings'>('overview');

  // New product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdTagline, setNewProdTagline] = useState('');
  const [newProdModel, setNewProdModel] = useState<'pod' | 'dropship'>('pod');
  const [newProdPrice, setNewProdPrice] = useState(48.0);
  const [newProdCost, setNewProdCost] = useState(16.0);
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80');

  // API settings state
  const [tempSettings, setTempSettings] = useState<StoreSettings>(settings);
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);

  if (!isOpen) return null;

  const totalGMV = orders.reduce((acc, o) => acc + o.total, 0);
  const totalNetProfit = orders.reduce((acc, o) => acc + o.netProfit, 0);
  const totalItemsSold = orders.reduce((acc, o) => acc + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const profitMarginPercent = totalGMV > 0 ? Math.round((totalNetProfit / totalGMV) * 100) : 62;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newProduct: Product = {
      id: `custom-prod-${Date.now()}`,
      name: newProdName,
      tagline: newProdTagline || 'Vanguard Streetwear Piece',
      model: newProdModel,
      category: newProdModel === 'pod' ? 'pod-tees' : 'dropship-techwear',
      price: Number(newProdPrice),
      supplierCost: Number(newProdCost),
      compareAtPrice: Number(newProdPrice) * 1.35,
      rating: 5.0,
      reviewsCount: 1,
      images: [newProdImage],
      colors: [{ name: 'Onyx Black', hex: '#111215' }, { name: 'Raw Bone', hex: '#ece7de' }],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      description: 'Engineered for the contemporary minimalist atelier. Premium blanks with automated fulfillment.',
      details: ['Hand-finished garment', 'Reinforced seams', 'Automated dropship/POD fulfillment'],
      materials: 'Heavyweight Combed Cotton / Technical Poly',
      stockStatus: newProdModel === 'pod' ? 'made_to_order' : 'in_stock',
      shippingDays: newProdModel === 'pod' ? '3 - 6 Business Days' : '5 - 9 Business Days',
      supplierName: newProdModel === 'pod' ? 'Printify Custom Line' : 'Direct Dropship Supplier',
      badge: 'NEW LAUNCH',
    };

    onAddProduct(newProduct);
    setNewProdName('');
    setNewProdTagline('');
    setActiveTab('products');
  };

  const handleSaveSettings = () => {
    onUpdateSettings(tempSettings);
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#11131c] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#151824]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-[#00f0ff] to-[#7928ca] text-white">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Merchant Operations Studio</h2>
              <p className="text-xs font-mono-tech text-gray-400">
                Atelier live analytics, orders fulfillment stream, and API integrations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-[#0e1017] border-b border-white/5 font-mono-tech text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'overview' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Revenue & Metrics
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>Live Orders</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#ff0055] text-white text-[10px]">
              {orders.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'products' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Product Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeTab === 'settings' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Fulfillment & API Keys</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[11px] font-mono-tech text-gray-400 uppercase">Gross GMV</div>
                  <div className="text-xl sm:text-2xl font-mono-tech font-bold text-white">
                    {currencySymbol}{(totalGMV * currencyRate).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono-tech">100% Customer Funded</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 space-y-1">
                  <div className="text-[11px] font-mono-tech text-emerald-300 uppercase">Net Owner Profit</div>
                  <div className="text-xl sm:text-2xl font-mono-tech font-bold text-emerald-400">
                    +{currencySymbol}{(totalNetProfit * currencyRate).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono-tech">Zero Upfront Stock Cost</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[11px] font-mono-tech text-gray-400 uppercase">Profit Margin %</div>
                  <div className="text-xl sm:text-2xl font-mono-tech font-bold text-[#00f0ff]">
                    {profitMarginPercent}%
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono-tech">Industry High Margin</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[11px] font-mono-tech text-gray-400 uppercase">Total Orders</div>
                  <div className="text-xl sm:text-2xl font-mono-tech font-bold text-white">
                    {orders.length}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono-tech">{totalItemsSold} Garments Sourced</div>
                </div>
              </div>

              {/* Zero-Cost Operating Architecture Visual */}
              <div className="p-5 rounded-2xl bg-[#0b0c10] border border-white/10 space-y-3">
                <div className="font-display font-bold text-base text-white">
                  Zero-Cost Economics: Why You Never Pay Upfront
                </div>
                <div className="grid md:grid-cols-3 gap-3 text-xs font-mono-tech text-gray-400">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <strong className="text-white block">1. Customer Orders First</strong>
                    <p className="text-[11px]">Customer pays full retail price ($78) into your Stripe / PayPal / Razorpay account before any item is made.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <strong className="text-[#00f0ff] block">2. Supplier Sourced On Demand</strong>
                    <p className="text-[11px]">Printify/Dropshipper charges only the wholesale cost ($29) from the received customer payment.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <strong className="text-emerald-400 block">3. Keep 100% Net Profit</strong>
                    <p className="text-[11px]">You keep the $49 difference in your bank. No unsold inventory, no warehouse rent, $0 hosting cost forever.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE ORDERS FULFILLMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-white">Fulfillment Stream ({orders.length})</h3>
                <span className="text-xs font-mono-tech text-gray-400">Status updates auto-sync with customer</span>
              </div>

              {orders.length === 0 ? (
                <div className="p-8 text-center bg-white/5 rounded-2xl border border-white/10 text-gray-400 text-xs font-mono-tech">
                  No orders recorded yet. Place a test order through the storefront to test automated dispatch!
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 font-mono-tech text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                        <div>
                          <strong className="text-white text-sm">#{ord.id}</strong>
                          <span className="text-gray-400 ml-2">({ord.date})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">
                            {ord.paymentMethod.toUpperCase()} • {ord.paymentStatus.toUpperCase()}
                          </span>
                          <span className="text-white font-bold text-sm">
                            {currencySymbol}{(ord.total * currencyRate).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-2 text-[11px] text-gray-300">
                        <div>
                          <span className="text-gray-500 block">Customer:</span>
                          <span className="text-white">{ord.customer.fullName}</span> ({ord.customer.city}, {ord.customer.country})
                        </div>
                        <div>
                          <span className="text-gray-500 block">Tracking Number:</span>
                          <span className="text-[#00f0ff]">{ord.trackingNumber || 'Generating...'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Net Profit:</span>
                          <span className="text-emerald-400 font-bold">+{currencySymbol}{(ord.netProfit * currencyRate).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[11px] text-gray-400">Update Fulfillment Stage:</span>
                        <select
                          value={ord.fulfillmentStatus}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-[#181a26] text-xs text-white py-1 px-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#ff0055] cursor-pointer"
                        >
                          <option value="sent_to_pod">1. Sent to Printify/POD</option>
                          <option value="sent_to_dropshipper">2. Sourced by Dropshipper</option>
                          <option value="in_production">3. In Garment Production</option>
                          <option value="shipped">4. Shipped with Tracking</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRODUCTS & ADD NEW */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Add New Product Box */}
              <form onSubmit={handleCreateProduct} className="p-5 rounded-2xl bg-[#0b0c10] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#ff0055]" />
                    Add New POD or Dropship Product
                  </h4>
                  <span className="text-xs font-mono-tech text-gray-500">Instant publish to live catalog</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono-tech text-gray-400 mb-1">Product Title</label>
                    <input
                      type="text"
                      required
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      placeholder="E.g. Acid Glitch Cyber Pant"
                      className="w-full bg-[#161822] text-xs text-white px-3 py-2 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech text-gray-400 mb-1">Fulfillment Model</label>
                    <select
                      value={newProdModel}
                      onChange={(e) => setNewProdModel(e.target.value as any)}
                      className="w-full bg-[#161822] text-xs text-white px-3 py-2 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none"
                    >
                      <option value="pod">Print-On-Demand (POD)</option>
                      <option value="dropship">Curated Dropship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech text-gray-400 mb-1">Retail Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="w-full bg-[#161822] text-xs text-white px-3 py-2 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none font-mono-tech"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech text-gray-400 mb-1">Wholesale Cost ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProdCost}
                      onChange={(e) => setNewProdCost(Number(e.target.value))}
                      className="w-full bg-[#161822] text-xs text-white px-3 py-2 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none font-mono-tech"
                    />
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="flex-1">
                    <label className="block text-[11px] font-mono-tech text-gray-400 mb-1">Image URL (Unsplash or CDN)</label>
                    <input
                      type="url"
                      required
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      className="w-full bg-[#161822] text-xs text-white px-3 py-2 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff0055] to-[#7928ca] text-white text-xs font-bold font-mono-tech hover:opacity-95 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Publish Piece</span>
                  </button>
                </div>
              </form>

              {/* Current Products Listing */}
              <div className="space-y-2">
                <div className="text-xs font-mono-tech uppercase text-gray-400">Current Catalog ({products.length})</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {products.map((p) => (
                    <div key={p.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-12 h-14 rounded-lg object-cover bg-black/40 flex-shrink-0" />
                      <div className="min-w-0 flex-1 text-xs">
                        <div className="font-bold text-white truncate">{p.name}</div>
                        <div className="text-[11px] font-mono-tech text-gray-400 flex items-center gap-2 mt-0.5">
                          <span className={p.model === 'pod' ? 'text-[#ff0055]' : 'text-[#00f0ff]'}>
                            {p.model.toUpperCase()}
                          </span>
                          <span>•</span>
                          <span>Retail: ${p.price.toFixed(2)}</span>
                          <span>•</span>
                          <span className="text-emerald-400">Profit: +${(p.price - p.supplierCost).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FULFILLMENT & API INTEGRATIONS */}
          {activeTab === 'settings' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-white">Payment Gateway & POD Provider Hooks</h3>
                <p className="text-xs font-mono-tech text-gray-400">
                  Configure your free credentials. No paid software required.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Printify API Key */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <label className="block text-xs font-mono-tech text-white font-bold">
                    Printify API Access Token (Free)
                  </label>
                  <p className="text-[11px] text-gray-400">
                    Get free API token from Printify Settings &gt; Connections &gt; API. Enables automated 1-click DTG printing dispatch.
                  </p>
                  <input
                    type="password"
                    value={tempSettings.printifyApiKey || ''}
                    onChange={(e) => setTempSettings({ ...tempSettings, printifyApiKey: e.target.value })}
                    placeholder="eyJhbGciOi..."
                    className="w-full bg-[#161822] text-xs text-white px-3 py-2 rounded-xl border border-white/10 font-mono-tech focus:border-[#ff0055] focus:outline-none"
                  />
                </div>

                {/* Stripe Key */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <label className="block text-xs font-mono-tech text-white font-bold">
                    Stripe Publishable Key / Payment Link
                  </label>
                  <p className="text-[11px] text-gray-400">
                    Your standard Stripe public key (`pk_live_...`) or pre-configured checkout link. Free account, zero monthly fee.
                  </p>
                  <input
                    type="text"
                    value={tempSettings.stripePublishableKey || ''}
                    onChange={(e) => setTempSettings({ ...tempSettings, stripePublishableKey: e.target.value })}
                    placeholder="pk_live_51M..."
                    className="w-full bg-[#161822] text-xs text-white px-3 py-2 rounded-xl border border-white/10 font-mono-tech focus:border-[#ff0055] focus:outline-none"
                  />
                </div>

                {/* Razorpay Key */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <label className="block text-xs font-mono-tech text-white font-bold">
                    Razorpay Key ID (For India / UPI Instant Payments)
                  </label>
                  <p className="text-[11px] text-gray-400">
                    Free standard Razorpay account (`rzp_live_...`). Accept UPI, Netbanking, Rupay & Credit Cards at 0 monthly subscription.
                  </p>
                  <input
                    type="text"
                    value={tempSettings.razorpayKeyId || ''}
                    onChange={(e) => setTempSettings({ ...tempSettings, razorpayKeyId: e.target.value })}
                    placeholder="rzp_live_..."
                    className="w-full bg-[#161822] text-xs text-white px-3 py-2 rounded-xl border border-white/10 font-mono-tech focus:border-[#ff0055] focus:outline-none"
                  />
                </div>

                {/* Notification Email */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <label className="block text-xs font-mono-tech text-white font-bold">
                    Merchant Notification Email
                  </label>
                  <p className="text-[11px] text-gray-400">
                    Where order notifications & supplier packing slips are forwarded instantly upon checkout.
                  </p>
                  <input
                    type="email"
                    value={tempSettings.notificationEmail || ''}
                    onChange={(e) => setTempSettings({ ...tempSettings, notificationEmail: e.target.value })}
                    placeholder="ayush@atelierthreads.com"
                    className="w-full bg-[#161822] text-xs text-white px-3 py-2 rounded-xl border border-white/10 font-mono-tech focus:border-[#ff0055] focus:outline-none"
                  />
                </div>
              </div>

              {/* Save Settings Button */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-mono-tech text-xs font-bold hover:opacity-95 transition cursor-pointer flex items-center gap-2"
                >
                  {savedSettingsSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Settings Saved Securely!</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Save Live Integrations</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
