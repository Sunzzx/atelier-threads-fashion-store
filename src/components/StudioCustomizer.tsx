import React, { useState, useRef } from 'react';
import { Sparkles, Upload, RotateCw, ZoomIn, Eye, Check, X, ShieldAlert, Layers } from 'lucide-react';
import { GARMENT_TEMPLATES, PRESET_DESIGNS, GarmentTemplate, PresetDesign } from '../data/mockups';
import { CartItem, PODCustomization } from '../types/store';

interface StudioCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const StudioCustomizer: React.FC<StudioCustomizerProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  currencySymbol,
  currencyRate,
}) => {
  const [selectedGarmentId, setSelectedGarmentId] = useState<'tee' | 'hoodie' | 'crewneck' | 'tote'>('tee');
  const [selectedColorHex, setSelectedColorHex] = useState<string>('#111215');
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [selectedDesign, setSelectedDesign] = useState<PresetDesign>(PRESET_DESIGNS[0]);
  const [customImageUri, setCustomImageUri] = useState<string | null>(null);
  const [customText, setCustomText] = useState<string>('');
  const [scale, setScale] = useState<number>(100);
  const [posX, setPosX] = useState<number>(0); // offset from center
  const [posY, setPosY] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentGarment = GARMENT_TEMPLATES.find((g) => g.id === selectedGarmentId) || GARMENT_TEMPLATES[0];
  const printArea = viewSide === 'front' ? currentGarment.frontPrintArea : currentGarment.backPrintArea;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImageUri(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    const activeDesignUrl = customImageUri || selectedDesign.svgDataUri;
    const activeDesignName = customImageUri ? 'Custom Uploaded Artwork' : selectedDesign.name;

    const customization: PODCustomization = {
      garmentType: selectedGarmentId,
      garmentColor: currentGarment.colors.find((c) => c.hex === selectedColorHex)?.name || 'Custom',
      garmentColorHex: selectedColorHex,
      designSource: customImageUri ? 'upload' : 'preset',
      designUrl: activeDesignUrl,
      designName: activeDesignName,
      placement: viewSide,
      scale,
      posX,
      posY,
      customText: customText.trim() || undefined,
    };

    const cartItem: CartItem = {
      cartId: `custom-pod-${Date.now()}`,
      productId: `pod-custom-${selectedGarmentId}`,
      name: `Custom ${currentGarment.name}`,
      model: 'pod',
      price: currentGarment.basePrice,
      supplierCost: currentGarment.supplierCost,
      selectedColor: customization.garmentColor,
      selectedSize,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      customization,
    };

    onAddToCart(cartItem);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const activeGraphicUri = customImageUri || selectedDesign.svgDataUri;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#10121a] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141724]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-[#ff0055] to-[#7928ca] text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                POD Design Atelier // Interactive Studio
              </h2>
              <p className="text-xs font-mono-tech text-gray-400">
                Design custom graphics on premium blanks. Direct-to-Garment manufactured on demand.
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

        {/* Studio Body: Split View (Interactive Canvas on left, Controls on right) */}
        <div className="flex-1 overflow-y-auto grid lg:grid-cols-12 gap-0">
          {/* Canvas & Mockup Previewer (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b0c10] p-6 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-white/10">
            {/* View Switcher (Front / Back) */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#161822]/90 backdrop-blur-md p-1 rounded-full border border-white/10">
              <button
                onClick={() => setViewSide('front')}
                className={`px-3 py-1 rounded-full text-xs font-mono-tech transition cursor-pointer ${
                  viewSide === 'front' ? 'bg-[#ff0055] text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setViewSide('back')}
                className={`px-3 py-1 rounded-full text-xs font-mono-tech transition cursor-pointer ${
                  viewSide === 'back' ? 'bg-[#ff0055] text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Back View
              </button>
            </div>

            {/* Print Spec Tag */}
            <div className="absolute top-4 right-4 z-20 text-[11px] font-mono-tech text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
              Max Print: {currentGarment.printWidthMm} × {currentGarment.printHeightMm} mm
            </div>

            {/* SVG Garment Mockup Container */}
            <div className="relative w-full max-w-[380px] aspect-[4/5] flex items-center justify-center my-6">
              {/* Garment Base Vector Representation */}
              <div
                className="w-full h-full rounded-3xl relative shadow-2xl transition-colors duration-300 overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: selectedColorHex }}
              >
                {/* Silhouette Texture & Shadows overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40 pointer-events-none" />
                <div className="absolute inset-x-8 top-0 h-10 border-b-2 border-white/15 rounded-b-full pointer-events-none" />

                {/* Garment Collar & Stitching Details */}
                <div className="absolute top-0 inset-x-1/4 h-8 border-b border-black/30 rounded-b-3xl pointer-events-none" />

                {/* Printable Boundary Box */}
                <div
                  className="absolute border border-dashed border-[#00f0ff]/40 rounded-lg pointer-events-none flex items-center justify-center overflow-hidden"
                  style={{
                    left: `${printArea.x}%`,
                    top: `${printArea.y}%`,
                    width: `${printArea.width}%`,
                    height: `${printArea.height}%`,
                  }}
                >
                  <span className="absolute top-1 left-1.5 text-[8px] font-mono-tech text-[#00f0ff]/60 uppercase">
                    DTG Safe Zone
                  </span>

                  {/* Customer Graphic Rendered on Garment */}
                  <div
                    className="relative transition-transform duration-75 flex flex-col items-center justify-center"
                    style={{
                      transform: `translate(${posX}px, ${posY}px) scale(${scale / 100})`,
                      maxWidth: '85%',
                      maxHeight: '85%',
                    }}
                  >
                    <img
                      src={activeGraphicUri}
                      alt="POD Design Preview"
                      className="max-h-48 max-w-full object-contain filter drop-shadow-md select-none pointer-events-none"
                    />

                    {customText && (
                      <div className="mt-2 text-center font-bold tracking-widest text-white text-sm font-mono-tech uppercase drop-shadow-lg">
                        {customText}
                      </div>
                    )}
                  </div>
                </div>

                {/* Subtle garment folds overlay for realism */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_60%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
              </div>
            </div>

            {/* Canvas Coordinates Guide */}
            <div className="w-full max-w-sm flex items-center justify-between text-[11px] font-mono-tech text-gray-500 pt-2 border-t border-white/5">
              <span>Position: ({posX}px, {posY}px)</span>
              <span>Scale: {scale}%</span>
              <span>Layer: DTG Direct Bio-Ink</span>
            </div>
          </div>

          {/* Controls & Configuration Sidebar (5 cols) */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6 overflow-y-auto">
            {/* Step 1: Blank Garment Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono-tech tracking-wider uppercase text-gray-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#ff0055]" />
                1. Select Garment Blank
              </label>
              <div className="grid grid-cols-2 gap-2">
                {GARMENT_TEMPLATES.map((garment) => (
                  <button
                    key={garment.id}
                    onClick={() => {
                      setSelectedGarmentId(garment.id);
                      setSelectedColorHex(garment.colors[0].hex);
                    }}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      selectedGarmentId === garment.id
                        ? 'border-[#ff0055] bg-[#ff0055]/10 text-white'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold text-xs leading-snug">{garment.name}</div>
                    <div className="text-[11px] font-mono-tech text-[#00f0ff] mt-1">
                      {currencySymbol}{(garment.basePrice * currencyRate).toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Garment Color Swatches */}
            <div className="space-y-2">
              <label className="text-xs font-mono-tech tracking-wider uppercase text-gray-400">
                2. Blank Color: {currentGarment.colors.find((c) => c.hex === selectedColorHex)?.name}
              </label>
              <div className="flex items-center gap-3">
                {currentGarment.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColorHex(color.hex)}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border-2 transition transform hover:scale-110 cursor-pointer flex items-center justify-center ${
                      selectedColorHex === color.hex ? 'border-[#ff0055] scale-110' : 'border-white/20'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColorHex === color.hex && (
                      <Check className={`w-4 h-4 ${color.hex === '#f4f5f7' || color.hex === '#ece6d8' || color.hex === '#e8e4db' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Choose Design Vault or Upload Your Own */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono-tech tracking-wider uppercase text-gray-400">
                  3. Graphic Artwork
                </label>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-mono-tech text-[#00f0ff] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload Custom PNG
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png,image/jpeg,image/svg+xml"
                  className="hidden"
                />
              </div>

              {/* Preset Vault Chips */}
              <div className="grid grid-cols-2 gap-2">
                {PRESET_DESIGNS.map((design) => (
                  <button
                    key={design.id}
                    onClick={() => {
                      setSelectedDesign(design);
                      setCustomImageUri(null);
                    }}
                    className={`p-2 rounded-xl border flex items-center gap-2 transition text-left cursor-pointer ${
                      !customImageUri && selectedDesign.id === design.id
                        ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-white'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-black/60 p-1 flex-shrink-0 flex items-center justify-center">
                      <img src={design.svgDataUri} alt={design.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold truncate text-white">{design.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono-tech">{design.category}</div>
                    </div>
                  </button>
                ))}
              </div>

              {customImageUri && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-400">
                  <span className="flex items-center gap-1.5 font-mono-tech">
                    <Check className="w-4 h-4" /> Custom Image Active
                  </span>
                  <button
                    onClick={() => setCustomImageUri(null)}
                    className="text-gray-400 hover:text-white text-xs cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            {/* Custom Slogan / Text field */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono-tech tracking-wider uppercase text-gray-400">
                Optional Typography Stamp
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={24}
                placeholder="E.g. TOKYO // PROTOCOL"
                className="w-full bg-[#161822] text-xs text-white px-3 py-2 rounded-xl border border-white/10 focus:border-[#ff0055] focus:outline-none"
              />
            </div>

            {/* Step 4: Scale & Position Sliders */}
            <div className="space-y-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs font-mono-tech text-gray-300">
                <span>Print Scale: {scale}%</span>
                <button
                  onClick={() => {
                    setScale(100);
                    setPosX(0);
                    setPosY(0);
                  }}
                  className="text-gray-500 hover:text-white text-[10px] cursor-pointer"
                >
                  Reset Pos
                </button>
              </div>
              <input
                type="range"
                min="50"
                max="160"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-[#ff0055] cursor-pointer"
              />

              <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech text-gray-300">
                <div>
                  <label className="block text-[10px] text-gray-400">Horiz Offset (X)</label>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={posX}
                    onChange={(e) => setPosX(Number(e.target.value))}
                    className="w-full accent-[#00f0ff] cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400">Vert Offset (Y)</label>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={posY}
                    onChange={(e) => setPosY(Number(e.target.value))}
                    className="w-full accent-[#00f0ff] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono-tech tracking-wider uppercase text-gray-400">
                Select Sizing
              </label>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold font-mono-tech transition cursor-pointer ${
                      selectedSize === size
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Economics & Profit Breakdown Box */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-cyan-950/40 border border-emerald-500/20 text-xs font-mono-tech space-y-1">
              <div className="flex justify-between text-gray-300">
                <span>Customer Retail Price:</span>
                <span className="font-bold text-white">{currencySymbol}{(currentGarment.basePrice * currencyRate).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-[11px]">
                <span>Base POD Manufacturing Cost:</span>
                <span>{currencySymbol}{(currentGarment.supplierCost * currencyRate).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-white/10">
                <span>Your Net Margin (Zero Stock Risk):</span>
                <span>+{currencySymbol}{((currentGarment.basePrice - currentGarment.supplierCost) * currencyRate).toFixed(2)} ({Math.round(((currentGarment.basePrice - currentGarment.supplierCost) / currentGarment.basePrice) * 100)}%)</span>
              </div>
            </div>

            {/* Add to Bag Action Button */}
            <button
              onClick={handleAddToCart}
              disabled={addedSuccess}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#ff0055] via-[#ff5e62] to-[#7928ca] text-white font-display font-bold text-sm shadow-xl hover:opacity-95 transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-5 h-5 animate-bounce" />
                  <span>Added To Atelier Bag!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Produce Custom Piece • {currencySymbol}{(currentGarment.basePrice * currencyRate).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
