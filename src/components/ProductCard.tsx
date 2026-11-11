import React, { useState } from 'react';
import { Star, Sparkles, Truck, Eye, ShoppingBag, Plus } from 'lucide-react';
import { Product } from '../types/store';

interface ProductCardProps {
  product: Product;
  currencySymbol: string;
  currencyRate: number;
  onOpenDetails: (product: Product) => void;
  onQuickAdd: (product: Product, size: string, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currencySymbol,
  currencyRate,
  onOpenDetails,
  onQuickAdd,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const price = (product.price * currencyRate).toFixed(2);
  const compareAt = product.compareAtPrice ? (product.compareAtPrice * currencyRate).toFixed(2) : null;
  const currentImage = product.images[isHovered && product.images.length > 1 ? 1 : 0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, product.sizes[0], product.colors[selectedColorIndex].name);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl glass-panel glass-panel-hover overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300"
    >
      {/* Top Image Showcase */}
      <div className="relative aspect-[4/5] w-full bg-[#141620] overflow-hidden">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Model Badge (POD vs Dropship) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.model === 'pod' ? (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-[#ff0055] border border-[#ff0055]/30 flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" /> POD ORIGINAL
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-[#00f0ff] border border-[#00f0ff]/30 flex items-center gap-1 shadow-md">
              <Truck className="w-3 h-3" /> DROPSHIP
            </span>
          )}

          {product.weightGsm && (
            <span className="px-2 py-0.5 rounded-md text-[9px] font-mono-tech bg-white/10 backdrop-blur-md text-gray-300 self-start">
              {product.weightGsm}
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="p-3 rounded-full bg-white text-black font-semibold text-xs shadow-lg hover:scale-110 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Inspect Piece</span>
          </button>
        </div>

        {/* Bottom Quick-Add Pill */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff0055] to-[#7928ca] text-white text-xs font-bold font-mono-tech shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Quick Add • {product.sizes[0]}</span>
          </button>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Supplier line */}
          <div className="flex items-center justify-between text-[11px] font-mono-tech text-gray-400">
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="font-bold text-gray-200">{product.rating}</span>
              <span className="text-gray-500">({product.reviewsCount})</span>
            </span>
            <span className="text-gray-500 truncate max-w-[140px]">{product.supplierName}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-display font-bold text-sm lg:text-base text-white group-hover:text-[#ff0055] transition-colors mt-1 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-1">{product.tagline}</p>
        </div>

        {/* Color Swatches and Price */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          {/* Color Dots */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                title={color.name}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColorIndex === idx ? 'scale-125 border-[#ff0055]' : 'border-white/20'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="font-mono-tech font-bold text-sm lg:text-base text-white">
              {currencySymbol}{price}
            </span>
            {compareAt && (
              <span className="ml-1.5 text-xs text-gray-500 line-through font-mono-tech">
                {currencySymbol}{compareAt}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
