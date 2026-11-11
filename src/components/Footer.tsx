import React from 'react';
import { Sparkles, Globe, ShieldCheck, Heart, Sliders, BookOpen } from 'lucide-react';

interface FooterProps {
  onOpenStudio: () => void;
  onOpenPlaybook: () => void;
  onOpenAdmin: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenStudio,
  onOpenPlaybook,
  onOpenAdmin,
  onSelectCategory,
}) => {
  return (
    <footer className="bg-[#08090d] border-t border-white/10 text-gray-400 font-mono-tech text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#ff0055] to-[#00f0ff] p-[1.5px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0b0c10] rounded-[6px] flex items-center justify-center font-bold text-white text-xs">
                  AT
                </div>
              </div>
              <span className="font-display font-extrabold text-base tracking-wider text-white">
                ATELIER<span className="text-[#ff0055]">.</span>THREADS
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              The next-generation autonomous fashion house. We blend high-density organic Print-On-Demand blanks with curated avant-garde dropshipped outerwear. Zero unsold inventory, zero waste, infinite style.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] text-gray-500">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Edge CDN Online
              </span>
              <span>•</span>
              <span>$0 Overhead Cloud</span>
            </div>
          </div>

          {/* Collection Column */}
          <div className="space-y-2.5">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Collections</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onSelectCategory('pod-originals')} className="hover:text-white transition cursor-pointer">
                  POD Heavy Originals
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('pod-hoodies')} className="hover:text-white transition cursor-pointer">
                  460 GSM Hoodies
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('dropship-techwear')} className="hover:text-white transition cursor-pointer">
                  Modular Techwear Cargos
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('dropship-accessories')} className="hover:text-white transition cursor-pointer">
                  Cyberpunk Shades & Chains
                </button>
              </li>
              <li>
                <button onClick={onOpenStudio} className="text-[#ff0055] hover:underline font-bold transition cursor-pointer">
                  Launch Customizer Studio →
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture Column */}
          <div className="space-y-2.5">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Zero-Cost Stack</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={onOpenPlaybook} className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>$0 Playbook Manual</span>
                </button>
              </li>
              <li className="text-gray-500">GitHub Pages Static CDN</li>
              <li className="text-gray-500">Printify & Gelato DTG Cloud</li>
              <li className="text-gray-500">CJ Dropship Direct API</li>
              <li className="text-gray-500">Stripe / Razorpay UPI</li>
            </ul>
          </div>

          {/* Store Ops Column */}
          <div className="space-y-2.5">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Merchant Portal</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={onOpenAdmin} className="text-[#00f0ff] hover:underline flex items-center gap-1 cursor-pointer">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Store Operator Studio</span>
                </button>
              </li>
              <li className="text-gray-500">Live Orders Stream</li>
              <li className="text-gray-500">Automated Dispatch JSON</li>
              <li className="text-gray-500">Profit Margin Calculator</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
          <div>
            © 2026 Atelier Threads™ • Deployed via GitHub Pages Edge • Built for Autonomous E-Commerce.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Free Tier Commercial Stack
            </span>
            <span>•</span>
            <span>Worldwide Fulfilled</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
