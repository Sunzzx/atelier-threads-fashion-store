import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Sparkles, Truck, Tag, ShieldCheck, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: (appliedDiscount: number, discountCode: string) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currencySymbol,
  currencyRate,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingGoal = 100.0;
  const progressToFreeShipping = Math.min(100, (rawSubtotal / freeShippingGoal) * 100);
  const remainingForFree = Math.max(0, freeShippingGoal - rawSubtotal);

  const discountAmount = appliedPromo ? (rawSubtotal * appliedPromo.percent) / 100 : 0;
  const shippingFee = rawSubtotal >= freeShippingGoal || rawSubtotal === 0 ? 0 : 8.00;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'HERMES10') {
      setAppliedPromo({ code: 'HERMES10', percent: 10 });
      setPromoError('');
    } else if (code === 'STREETWEAR20') {
      setAppliedPromo({ code: 'STREETWEAR20', percent: 20 });
      setPromoError('');
    } else if (code === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', percent: 8 });
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try HERMES10 or STREETWEAR20');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#11131c] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#151824]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#ff0055]" />
              <h2 className="font-display font-bold text-base text-white">Your Atelier Bag</h2>
              <span className="text-xs font-mono-tech px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-4 bg-white/5 border-b border-white/5 space-y-1.5 font-mono-tech text-xs">
            <div className="flex justify-between text-gray-300">
              {remainingForFree > 0 ? (
                <span>
                  Add <strong className="text-[#00f0ff]">{currencySymbol}{(remainingForFree * currencyRate).toFixed(2)}</strong> more for Free Worldwide Shipping
                </span>
              ) : (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  ✓ Unlocked Free Express Shipping!
                </span>
              )}
              <span>{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#ff0055] to-[#00f0ff] rounded-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="font-display font-bold text-lg text-white">Your bag is empty</div>
                <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                  Explore our heavyweight Print-On-Demand blanks or curated techwear dropship catalog.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono-tech transition cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartId}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#161822] flex-shrink-0 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    {item.model === 'pod' ? (
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-mono-tech text-[#ff0055] font-bold">
                        POD
                      </span>
                    ) : (
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-mono-tech text-[#00f0ff] font-bold">
                        DROPSHIP
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="font-display font-bold text-xs text-white truncate">{item.name}</h4>
                      <div className="text-[11px] font-mono-tech text-gray-400 mt-0.5">
                        <span>{item.selectedSize}</span> • <span>{item.selectedColor}</span>
                      </div>
                      {item.customization && (
                        <div className="text-[10px] text-[#00f0ff] font-mono-tech mt-1 truncate">
                          Art: {item.customization.designName}
                        </div>
                      )}
                    </div>

                    {/* Quantity controls and price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center bg-black/40 rounded-lg border border-white/10 p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-gray-400 hover:text-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono-tech font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-gray-400 hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-mono-tech font-bold text-xs text-white">
                        {currencySymbol}{((item.price * item.quantity) * currencyRate).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => onRemoveItem(item.cartId)}
                    className="text-gray-500 hover:text-red-400 transition cursor-pointer p-1 self-start"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#141724] space-y-4">
              {/* Promo Code Input */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo (try HERMES10)"
                      className="w-full bg-[#0d0f17] text-xs text-white pl-8 pr-2 py-2 rounded-xl border border-white/10 uppercase font-mono-tech focus:border-[#ff0055] focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono-tech font-bold transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="text-[11px] text-emerald-400 font-mono-tech flex items-center gap-1">
                    ✓ Code {appliedPromo.code} applied (-{appliedPromo.percent}%)
                  </div>
                )}
                {promoError && (
                  <div className="text-[11px] text-red-400 font-mono-tech">{promoError}</div>
                )}
              </div>

              {/* Order Cost Breakdown */}
              <div className="space-y-1.5 font-mono-tech text-xs text-gray-400 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">{currencySymbol}{(rawSubtotal * currencyRate).toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-{currencySymbol}{(discountAmount * currencyRate).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white">
                    {shippingFee === 0 ? 'FREE' : `${currencySymbol}${(shippingFee * currencyRate).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="text-[#00f0ff] font-mono-tech text-base">
                    {currencySymbol}{(grandTotal * currencyRate).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => onProceedToCheckout(discountAmount, appliedPromo?.code || '')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#ff0055] via-[#ff5e62] to-[#7928ca] text-white font-display font-bold text-sm shadow-xl hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono-tech text-gray-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SSL Encrypted
                </span>
                <span>•</span>
                <span>Stripe / PayPal / UPI / COD</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
