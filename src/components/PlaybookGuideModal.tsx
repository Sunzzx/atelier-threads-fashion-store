import React from 'react';
import { X, CheckCircle, Zap, ShieldCheck, DollarSign, Globe, Sparkles, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';

interface PlaybookGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlaybookGuideModal: React.FC<PlaybookGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#11131c] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#151824]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-500 text-black">
              <Zap className="w-5 h-5 font-bold" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">The $0 Forever Fashion Playbook</h2>
              <p className="text-xs font-mono-tech text-gray-400">
                How to run a high-margin POD + Dropshipping brand with $0 upfront capital & zero recurring fees
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

        {/* Playbook Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Section 1: The Zero-Cost Architecture */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono-tech text-emerald-400">
              <Globe className="w-3.5 h-3.5" />
              <span>PILLAR 1: PERMANENT $0 CLOUD HOSTING</span>
            </div>
            <h3 className="font-display font-bold text-xl text-white">
              Why this store stays online forever without monthly bills
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Traditional e-commerce platforms like Shopify cost $39 to $299 per month, plus transaction fees and expensive app subscriptions. If sales pause for a month, you are still charged. This store is built as an edge-rendered Single Page Application running on <strong>GitHub Pages CDN</strong> with zero server overhead.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1 font-mono-tech text-xs">
                <span className="text-[#00f0ff] font-bold block">✓ GitHub Pages / Cloudflare</span>
                <p className="text-[11px] text-gray-400">100% Free worldwide edge CDN, 99.99% uptime, zero sleep mode or cold starts.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1 font-mono-tech text-xs">
                <span className="text-emerald-400 font-bold block">✓ Automatic Free SSL</span>
                <p className="text-[11px] text-gray-400">HTTPS certificate auto-renewed by GitHub/Cloudflare forever at zero cost.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1 font-mono-tech text-xs">
                <span className="text-[#ff0055] font-bold block">✓ Custom Domain Option</span>
                <p className="text-[11px] text-gray-400">Runs free on `sunzzx.github.io` or bind any custom domain (.com/.store) with 1 CNAME line.</p>
              </div>
            </div>
          </div>

          {/* Section 2: The Print-On-Demand (POD) Mechanism */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff0055]/10 border border-[#ff0055]/20 text-xs font-mono-tech text-[#ff0055]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PILLAR 2: ZERO-INVENTORY POD CASHFLOW</span>
            </div>
            <h3 className="font-display font-bold text-xl text-white">
              Sell your own custom designs without touching physical inventory
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              In the Print-on-Demand model, you never buy boxes of shirts in advance. The customer funds the manufacturing. When a customer orders a $78 heavyweight hoodie, their $78 hits your Stripe/Razorpay account. You automatically pass the order to Printify/Gelato who prints, packs, and ships it directly to the customer in packaging with your brand name.
            </p>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 font-mono-tech text-xs space-y-2">
              <div className="font-bold text-white">Recommended $0 Free-Tier POD Providers:</div>
              <ul className="space-y-2 text-gray-300 text-[11px]">
                <li className="flex items-start gap-2">
                  <span className="text-[#ff0055] font-bold">1. Printify (Free Plan):</span>
                  <span>Connects to 80+ print providers worldwide. 850+ apparel blanks (Bella+Canvas, Gildan, Comfort Colors 1717, Stanley/Stella organic French terry). Integrates via free API.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00f0ff] font-bold">2. Gelato (Free Plan):</span>
                  <span>Local production in 32 countries (US, EU, UK, India, Australia). Decreases shipping times to 3–5 days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">3. Blinkstore / Qikink (India Specific):</span>
                  <span>Free print-on-demand with local Indian shipping, Cash on Delivery (COD) fulfillment, and 240+ GSM oversized cotton tees.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Dropshipping Mechanism */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono-tech text-[#00f0ff]">
              <DollarSign className="w-3.5 h-3.5" />
              <span>PILLAR 3: CURATED HIGH-MARGIN DROPSHIPPING</span>
            </div>
            <h3 className="font-display font-bold text-xl text-white">
              Expand catalog into technical cargos, vests, & jewelry with 60%+ margins
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Curate avant-garde accessories and outerwear that would normally require huge factory minimums. Using <strong>CJ Dropshipping</strong> (100% free account, free packaging custom branding, faster 6–10 day US/EU shipping) or <strong>AliExpress/DSers</strong>, you source trending techwear pieces at wholesale ($6–$22) and retail them at $36–$85.
            </p>
          </div>

          {/* Section 4: Zero-Cost Payment Processing */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono-tech text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PILLAR 4: ZERO-FEE PAYMENT GATEWAYS</span>
            </div>
            <h3 className="font-display font-bold text-xl text-white">
              Accept credit cards, Apple Pay, PayPal & UPI at $0 monthly fee
            </h3>
            <div className="grid sm:grid-cols-3 gap-3 text-xs font-mono-tech text-gray-300">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-white font-bold block">Stripe</span>
                <p className="text-[11px] text-gray-400">$0/mo. Pay standard 2.9% + 30¢ only when you make a sale. Works in 45+ countries.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-white font-bold block">Razorpay / UPI</span>
                <p className="text-[11px] text-gray-400">$0/mo. Accept instant UPI payments (Google Pay, PhonePe, Paytm) in India at zero fixed cost.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-white font-bold block">PayPal & COD</span>
                <p className="text-[11px] text-gray-400">Instant setup. Cash on Delivery supported for local dropship fulfillment.</p>
              </div>
            </div>
          </div>

          {/* Section 5: $0 Customer Acquisition & Marketing */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono-tech text-purple-400">
              <Zap className="w-3.5 h-3.5" />
              <span>PILLAR 5: VIRAL ORGANIC TRAFFIC ($0 AD SPEND)</span>
            </div>
            <h3 className="font-display font-bold text-xl text-white">
              How to get your first 1,000 fashion buyers organically
            </h3>
            <div className="space-y-2 text-xs font-mono-tech text-gray-300">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <strong className="text-white block">1. The "Aesthetic Outfit Grid" TikTok / Reel Format</strong>
                <p className="text-[11px] text-gray-400">
                  Post 7-second videos matching your POD heavy hoodie with cargo pants, chunky sneakers, and ambient synthwave audio. Fashion aesthetic reels regularly hit 50k–500k views on TikTok and Instagram Reels with $0 ad spend.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <strong className="text-white block">2. Pinterest Streetwear Moodboards</strong>
                <p className="text-[11px] text-gray-400">
                  Upload your product lifestyle images to Pinterest boards ("Techwear Inspo", "Cyberpunk Fashion 2026", "Minimalist Oversized Fits"). Pinterest delivers evergreen, purchasing-ready search traffic for months.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-white/10 bg-[#141724] flex items-center justify-between">
          <span className="text-xs font-mono-tech text-emerald-400">
            ✓ Total Monthly Infrastructure Cost: $0.00
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white text-black font-mono-tech font-bold text-xs hover:bg-gray-200 transition cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
