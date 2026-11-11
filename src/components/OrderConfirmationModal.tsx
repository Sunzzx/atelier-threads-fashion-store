import React, { useState } from 'react';
import { CheckCircle2, Download, Copy, Check, Package, Sparkles, Truck, ArrowRight, ExternalLink } from 'lucide-react';
import { Order } from '../types/store';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  currencySymbol: string;
  currencyRate: number;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  currencySymbol,
  currencyRate,
}) => {
  const [copiedPayload, setCopiedPayload] = useState(false);

  if (!order) return null;

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(order.fulfillmentPayload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleDownloadInvoice = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(order, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Order-${order.id}-Invoice.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#11131c] border border-white/15 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Celebration Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-white">Order Confirmed & Sourced!</h2>
          <p className="text-xs font-mono-tech text-gray-400 max-w-md mx-auto">
            Order <strong className="text-white">#{order.id}</strong> has been received and automatically routed to our Print-on-Demand & dropship fulfillment pipeline.
          </p>
        </div>

        {/* Order Quick Summary Card */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 font-mono-tech text-xs">
          <div className="grid grid-cols-2 gap-3 text-gray-300">
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">Recipient</span>
              <strong className="text-white text-xs">{order.customer.fullName}</strong>
              <div className="text-[11px] text-gray-400 truncate">{order.customer.city}, {order.customer.country}</div>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase">Tracking Number</span>
              <strong className="text-[#00f0ff] text-xs">{order.trackingNumber}</strong>
              <div className="text-[11px] text-emerald-400">Status: Dispatched to Print Hub</div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs">
            <span className="text-gray-400">Total Charged ({order.paymentMethod.toUpperCase()}):</span>
            <span className="font-bold text-white text-sm">
              {currencySymbol}{(order.total * currencyRate).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Items Dispatched */}
        <div className="space-y-2">
          <div className="text-xs font-mono-tech uppercase text-gray-400 tracking-wider">
            Items in Fulfillment Stream ({order.items.length})
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {order.items.map((it) => (
              <div key={it.cartId} className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={it.image} alt="" className="w-8 h-10 object-cover rounded bg-[#161822]" />
                  <div className="truncate">
                    <div className="text-white font-semibold truncate">{it.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono-tech">
                      {it.selectedSize} • {it.selectedColor} • Qty {it.quantity}
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-white/10 text-gray-300">
                  {it.model === 'pod' ? 'POD DTG' : 'DROPSHIP'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automated API Fulfillment Payload Preview (For store owner zero-touch automation) */}
        <div className="p-3.5 rounded-2xl bg-[#0a0b10] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono-tech text-gray-400">
              <Sparkles className="w-3.5 h-3.5 text-[#ff0055]" />
              <span>Automated Printify / Dropship Dispatch Payload:</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopyPayload}
                className="text-xs font-mono-tech text-[#00f0ff] hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPayload ? 'Copied JSON' : 'Copy JSON'}</span>
              </button>
            </div>
          </div>
          <pre className="text-[10px] font-mono-tech text-gray-400 bg-black/50 p-2.5 rounded-xl overflow-x-auto max-h-24">
            {JSON.stringify(order.fulfillmentPayload, null, 2)}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleDownloadInvoice}
            className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono-tech transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Invoice & Packing Slip</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#ff0055] to-[#7928ca] text-white font-display font-bold text-xs shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
