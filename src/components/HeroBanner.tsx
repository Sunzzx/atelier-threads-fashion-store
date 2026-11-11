import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, PackageCheck } from 'lucide-react';

interface HeroBannerProps {
  onOpenStudio: () => void;
  onExploreCatalog: () => void;
  onOpenPlaybook: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenStudio,
  onExploreCatalog,
  onOpenPlaybook,
}) => {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-[#0e1017]">
      {/* Background ambient neon glow gradients */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-[#ff0055]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#00f0ff]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-gray-300">
              <span className="w-2 h-2 rounded-full bg-[#ff0055] animate-ping" />
              <span>COLLECTION 2026 // ZERO-INVENTORY ATELIER</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white">
              Haute Streetwear. <br />
              <span className="bg-gradient-to-r from-[#ff0055] via-[#ff5e62] to-[#00f0ff] bg-clip-text text-transparent">
                POD Originals + Dropship.
              </span>
            </h1>

            <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Experience the dual-model fashion revolution. Order limited-batch 460 GSM heavyweight Print-on-Demand garments, design your own custom pieces live in our interactive studio, or explore curated techwear sourced directly from global ateliers with zero inventory markup.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenStudio}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#ff0055] to-[#7928ca] text-white font-bold text-sm hover:opacity-95 shadow-lg shadow-[#ff0055]/25 flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch POD Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition cursor-pointer"
              >
                Explore Dropship & Originals
              </button>

              <button
                onClick={onOpenPlaybook}
                className="px-4 py-3.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-mono-tech border border-emerald-500/20 transition cursor-pointer flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>$0 Forever Architecture</span>
              </button>
            </div>

            {/* Micro Feature Proof Pillars */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10">
              <div>
                <div className="font-display font-bold text-lg text-white">460 GSM</div>
                <div className="text-[11px] text-gray-400 font-mono-tech">Heavy French Terry & Organic Cotton</div>
              </div>
              <div>
                <div className="font-display font-bold text-lg text-[#ff0055]">Zero Stock Risk</div>
                <div className="text-[11px] text-gray-400 font-mono-tech">Produced on order via Printify/Gelato</div>
              </div>
              <div>
                <div className="font-display font-bold text-lg text-[#00f0ff]">Free Forever</div>
                <div className="text-[11px] text-gray-400 font-mono-tech">GitHub Pages edge hosting ($0/mo)</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-2xl glass-panel p-4 border border-white/15 shadow-2xl">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#161822] group">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
                  alt="Monolith Heavyweight Hoodie"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono-tech text-[#ff0055] font-bold">
                  POD ORIGINAL // 460 GSM
                </div>

                <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold font-display">Monolith Heavy Hoodie</div>
                    <div className="text-[11px] text-gray-400">Direct-to-Garment Embroidered</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono-tech font-bold text-[#00f0ff]">$78.00</div>
                    <div className="text-[10px] text-gray-400 line-through">$110.00</div>
                  </div>
                </div>
              </div>

              {/* Live Dispatch Indicator */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 font-mono-tech px-1">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Print Hub Online (US/EU/IN)
                </span>
                <span>Worldwide Fulfillment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="bg-black/50 border-t border-white/5 py-2.5 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite] text-xs font-mono-tech tracking-wider text-gray-400">
          <span className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#00f0ff]" /> 100% Free Lifetime Hosting (GitHub Pages CDN)
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <PackageCheck className="w-3.5 h-3.5 text-[#ff0055]" /> Print-on-Demand: Pay only when customer buys
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-yellow-400" /> Curated High-Margin Dropshipping Built In
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Multi-Gateway: Stripe, PayPal, Razorpay & UPI
          </span>
        </div>
      </div>
    </div>
  );
};
