import React, { useState } from 'react';
import { X, Star, Sparkles, Truck, Check, ShieldCheck, Ruler, ArrowRight, Heart } from 'lucide-react';
import { Product, CartItem } from '../types/store';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  currencySymbol,
  currencyRate,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [added, setAdded] = useState(false);

  const price = (product.price * currencyRate).toFixed(2);
  const compareAt = product.compareAtPrice ? (product.compareAtPrice * currencyRate).toFixed(2) : null;

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartId: `${product.id}-${selectedColor}-${selectedSize}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      model: product.model,
      price: product.price,
      supplierCost: product.supplierCost,
      selectedColor,
      selectedSize,
      quantity,
      image: product.images[activeImageIndex] || product.images[0],
    };
    onAddToCart(cartItem);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#12141e] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-gray-300 hover:text-white hover:bg-black/90 transition border border-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto grid md:grid-cols-12 gap-0">
          {/* Left Column: Image Gallery (6 cols) */}
          <div className="md:col-span-6 bg-[#0b0c10] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            {/* Active Display Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#161822]">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3">
                {product.model === 'pod' ? (
                  <span className="px-3 py-1 rounded-full text-xs font-mono-tech font-bold uppercase bg-black/80 text-[#ff0055] border border-[#ff0055]/40 flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" /> POD Original
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-mono-tech font-bold uppercase bg-black/80 text-[#00f0ff] border border-[#00f0ff]/40 flex items-center gap-1 shadow-lg">
                    <Truck className="w-3.5 h-3.5" /> Direct Dropship
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#ff0055]' : 'border-white/15 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specs, Sizing, Details (6 cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tech text-gray-400 mb-1">
                  <span className="text-[#ff0055] uppercase font-bold">{product.supplierName}</span>
                  <span>•</span>
                  <span>{product.stockStatus === 'made_to_order' ? 'Zero-Waste Made To Order' : 'Ready to Dispatch'}</span>
                </div>

                <h1 className="font-display font-bold text-2xl text-white">{product.name}</h1>
                <p className="text-xs text-gray-400 mt-1">{product.tagline}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono-tech text-gray-300 font-bold">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="font-mono-tech font-extrabold text-2xl text-white">
                  {currencySymbol}{price}
                </span>
                {compareAt && (
                  <span className="text-sm font-mono-tech text-gray-500 line-through">
                    {currencySymbol}{compareAt}
                  </span>
                )}
                {compareAt && (
                  <span className="ml-auto px-2 py-0.5 rounded-md text-[11px] font-mono-tech font-bold bg-[#ff0055]/20 text-[#ff0055]">
                    SAVE {Math.round((1 - product.price / (product.compareAtPrice || product.price)) * 100)}%
                  </span>
                )}
              </div>

              {/* Colorway Selection */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono-tech">
                  <span className="text-gray-400">Colorway:</span>
                  <span className="text-white font-bold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full border-2 transition transform hover:scale-105 cursor-pointer flex items-center justify-center ${
                        selectedColor === color.name ? 'border-[#ff0055] scale-110' : 'border-white/20'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.name && (
                        <Check className={`w-4 h-4 ${color.hex === '#f0f2f5' || color.hex === '#ede8dc' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono-tech">
                  <span className="text-gray-400">Size Selection:</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[#00f0ff] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{showSizeGuide ? 'Hide Measurements' : 'Size Guide (CM/IN)'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono-tech font-bold transition cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-white text-black shadow-md'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* Size Guide Table */}
                {showSizeGuide && (
                  <div className="p-3 bg-black/60 rounded-xl border border-white/10 text-[11px] font-mono-tech space-y-1.5 animate-fadeIn">
                    <div className="font-bold text-white text-xs mb-1">Garment Dimensions (Relaxed Fit)</div>
                    <div className="grid grid-cols-4 gap-1 text-gray-400 font-bold border-b border-white/10 pb-1">
                      <span>Size</span>
                      <span>Chest</span>
                      <span>Length</span>
                      <span>Sleeve</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-gray-300">
                      <span>S</span>
                      <span>108 cm / 42.5"</span>
                      <span>72 cm / 28.3"</span>
                      <span>22 cm / 8.6"</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-gray-300">
                      <span>M</span>
                      <span>114 cm / 44.8"</span>
                      <span>74 cm / 29.1"</span>
                      <span>23 cm / 9.0"</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-gray-300">
                      <span>L</span>
                      <span>120 cm / 47.2"</span>
                      <span>76 cm / 29.9"</span>
                      <span>24 cm / 9.4"</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-gray-300">
                      <span>XL</span>
                      <span>126 cm / 49.6"</span>
                      <span>78 cm / 30.7"</span>
                      <span>25 cm / 9.8"</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description & Specs */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <p className="text-xs text-gray-300 leading-relaxed">{product.description}</p>
                <ul className="text-xs text-gray-400 space-y-1 font-mono-tech list-disc list-inside">
                  {product.details.map((dt, i) => (
                    <li key={i}>{dt}</li>
                  ))}
                </ul>
              </div>

              {/* Fulfillment & Shipping Notice */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs">
                <Truck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5 font-mono-tech">
                  <div className="text-white font-semibold">Estimated Delivery: {product.shippingDays}</div>
                  <div className="text-[11px] text-gray-400">
                    Fulfillment automated via {product.supplierName}. Zero customs delay.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Quantity & Add to Cart */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center bg-white/5 rounded-2xl border border-white/10 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono-tech font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                disabled={added}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#ff0055] via-[#ff5e62] to-[#7928ca] text-white font-display font-bold text-sm shadow-xl hover:opacity-95 transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 animate-bounce" />
                    <span>Added To Bag!</span>
                  </>
                ) : (
                  <>
                    <span>Add To Atelier Bag</span>
                    <span>•</span>
                    <span className="font-mono-tech">{currencySymbol}{((product.price * quantity) * currencyRate).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
