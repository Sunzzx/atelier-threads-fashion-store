import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Check, ArrowRight, Sparkles, Truck, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, CustomerDetails, Order } from '../types/store';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discount: number;
  discountCode?: string;
  onOrderSuccess: (order: Order) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  discount,
  discountCode,
  onOrderSuccess,
  currencySymbol,
  currencyRate,
}) => {
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 415 555 2671',
    addressLine1: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94103',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'razorpay' | 'cod'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || cart.length === 0) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const supplierCostTotal = cart.reduce((acc, item) => acc + item.supplierCost * item.quantity, 0);
  const shippingFee = rawSubtotal >= 100 ? 0 : 8.00;
  const grandTotal = Math.max(0, rawSubtotal - discount + shippingFee);
  const netProfit = grandTotal - supplierCostTotal - shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment gateway handshake & POD dispatch API generation
    setTimeout(() => {
      setIsProcessing(false);

      // Create rich order record with automated fulfillment payload for Printify / Gelato / Dropshipper
      const orderId = `AT-${Date.now().toString().slice(-6)}`;
      
      const fulfillmentPayload = {
        external_order_id: orderId,
        store_source: 'atelier-threads-web-edge',
        created_at: new Date().toISOString(),
        shipping_method: 1, // Standard Global
        recipient: {
          name: customer.fullName,
          address1: customer.addressLine1,
          city: customer.city,
          state_code: customer.state,
          country_code: customer.country === 'United States' ? 'US' : 'IN',
          zip: customer.postalCode,
          phone: customer.phone,
          email: customer.email,
        },
        line_items: cart.map((item) => ({
          product_id: item.productId,
          variant_name: `${item.selectedColor} / ${item.selectedSize}`,
          quantity: item.quantity,
          model: item.model,
          supplier_channel: item.model === 'pod' ? 'Printify DTG Cloud' : 'Global Dropship Forwarder',
          customization: item.customization || null,
        })),
      };

      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        customer,
        items: [...cart],
        subtotal: rawSubtotal,
        discount,
        shipping: shippingFee,
        total: grandTotal,
        netProfit,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        fulfillmentStatus: 'sent_to_pod',
        trackingNumber: `TRK-${Math.floor(100000000 + Math.random() * 900000000)}`,
        fulfillmentPayload,
      };

      // Confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff0055', '#00f0ff', '#ffffff', '#7928ca'],
        });
      } catch (err) {
        // fallback
      }

      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#11131c] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#151824]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-[#ff0055] to-[#00f0ff] text-white">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Secure Zero-Touch Checkout</h2>
              <p className="text-xs font-mono-tech text-gray-400">
                End-to-end encrypted • Automated POD & dropship routing
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

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto grid md:grid-cols-12 gap-0">
          {/* Customer & Shipping Inputs (7 cols) */}
          <div className="md:col-span-7 p-6 space-y-5 border-b md:border-b-0 md:border-r border-white/10">
            {/* Step 1: Customer Contact */}
            <div className="space-y-3">
              <div className="text-xs font-mono-tech uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#ff0055] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Contact & Shipping Address</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-[11px] font-mono-tech text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full bg-[#181a26] text-xs text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech text-gray-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full bg-[#181a26] text-xs text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech text-gray-400 mb-1">Phone (for courier SMS)</label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full bg-[#181a26] text-xs text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[11px] font-mono-tech text-gray-400 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={customer.addressLine1}
                    onChange={(e) => setCustomer({ ...customer, addressLine1: e.target.value })}
                    className="w-full bg-[#181a26] text-xs text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech text-gray-400 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full bg-[#181a26] text-xs text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech text-gray-400 mb-1">Postal / ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={customer.postalCode}
                    onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                    className="w-full bg-[#181a26] text-xs text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[11px] font-mono-tech text-gray-400 mb-1">Country</label>
                  <select
                    value={customer.country}
                    onChange={(e) => setCustomer({ ...customer, country: e.target.value })}
                    className="w-full bg-[#181a26] text-xs text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Gateway Selection */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="text-xs font-mono-tech uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#00f0ff] text-black flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Payment Gateway Hook</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Stripe */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-3 rounded-xl border text-left flex items-start justify-between transition cursor-pointer ${
                    paymentMethod === 'stripe'
                      ? 'border-[#ff0055] bg-[#ff0055]/10 text-white'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-white flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#ff0055]" />
                      Stripe Card
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono-tech mt-1">Visa, MC, Amex, Apple Pay</div>
                  </div>
                  {paymentMethod === 'stripe' && <Check className="w-4 h-4 text-[#ff0055]" />}
                </button>

                {/* PayPal */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border text-left flex items-start justify-between transition cursor-pointer ${
                    paymentMethod === 'paypal'
                      ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-white'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-white">PayPal Express</div>
                    <div className="text-[10px] text-gray-400 font-mono-tech mt-1">Global 1-Click Pay</div>
                  </div>
                  {paymentMethod === 'paypal' && <Check className="w-4 h-4 text-[#00f0ff]" />}
                </button>

                {/* Razorpay / UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-3 rounded-xl border text-left flex items-start justify-between transition cursor-pointer ${
                    paymentMethod === 'razorpay'
                      ? 'border-emerald-400 bg-emerald-500/10 text-white'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-white">UPI / Razorpay</div>
                    <div className="text-[10px] text-gray-400 font-mono-tech mt-1">Google Pay, PhonePe, Paytm (₹)</div>
                  </div>
                  {paymentMethod === 'razorpay' && <Check className="w-4 h-4 text-emerald-400" />}
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left flex items-start justify-between transition cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-amber-400 bg-amber-500/10 text-white'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-white">Cash on Delivery</div>
                    <div className="text-[10px] text-gray-400 font-mono-tech mt-1">Pay upon doorstep receipt</div>
                  </div>
                  {paymentMethod === 'cod' && <Check className="w-4 h-4 text-amber-400" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Profit Transparency (5 cols) */}
          <div className="md:col-span-5 p-6 flex flex-col justify-between bg-[#0e1017] space-y-6">
            <div>
              <div className="text-xs font-mono-tech uppercase tracking-wider text-gray-400 mb-3">
                Order Review ({cart.length} items)
              </div>

              {/* Items summary list */}
              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex items-center gap-2.5 text-xs">
                    <img src={item.image} alt="" className="w-10 h-12 rounded-lg object-cover bg-black/40 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white truncate">{item.name}</div>
                      <div className="text-[11px] font-mono-tech text-gray-400">
                        Qty {item.quantity} • {item.selectedSize} / {item.selectedColor}
                      </div>
                    </div>
                    <div className="font-mono-tech text-right font-bold text-white">
                      {currencySymbol}{((item.price * item.quantity) * currencyRate).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 font-mono-tech text-xs text-gray-400 pt-4 border-t border-white/10 mt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">{currencySymbol}{(rawSubtotal * currencyRate).toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountCode})</span>
                    <span>-{currencySymbol}{(discount * currencyRate).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white">{shippingFee === 0 ? 'FREE' : `${currencySymbol}${(shippingFee * currencyRate).toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="text-[#00f0ff] font-mono-tech text-base">
                    {currencySymbol}{(grandTotal * currencyRate).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Owner Zero-Cost Profit Intelligence */}
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/25 text-xs font-mono-tech space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Merchant Net Profit on this Order:</span>
                </div>
                <div className="text-lg font-bold text-emerald-400">
                  +{currencySymbol}{(netProfit * currencyRate).toFixed(2)}
                </div>
                <div className="text-[10px] text-gray-400">
                  Wholesale Cost: {currencySymbol}{(supplierCostTotal * currencyRate).toFixed(2)} deducted automatically upon fulfillment. Zero inventory retained!
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ff0055] via-[#ff5e62] to-[#7928ca] text-white font-display font-bold text-sm shadow-xl hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authorizing Gateway & Dispatching POD...
                  </span>
                ) : (
                  <>
                    <span>Complete Order & Dispatch</span>
                    <span>•</span>
                    <span className="font-mono-tech">{currencySymbol}{(grandTotal * currencyRate).toFixed(2)}</span>
                  </>
                )}
              </button>

              <div className="text-center text-[10px] font-mono-tech text-gray-500">
                🔒 256-bit TLS Gateway Encrypted • Instant Dispatch Webhook
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
