export interface PresetDesign {
  id: string;
  name: string;
  category: string;
  svgDataUri: string;
}

export interface GarmentTemplate {
  id: 'tee' | 'hoodie' | 'crewneck' | 'tote';
  name: string;
  basePrice: number;
  supplierCost: number;
  printWidthMm: number;
  printHeightMm: number;
  frontPrintArea: { x: number; y: number; width: number; height: number }; // percentages 0-100
  backPrintArea: { x: number; y: number; width: number; height: number };
  colors: { name: string; hex: string }[];
}

export const GARMENT_TEMPLATES: GarmentTemplate[] = [
  {
    id: 'tee',
    name: '280 GSM Boxy Heavy Tee',
    basePrice: 38.00,
    supplierCost: 13.50,
    printWidthMm: 300,
    printHeightMm: 400,
    frontPrintArea: { x: 30, y: 22, width: 40, height: 46 },
    backPrintArea: { x: 28, y: 18, width: 44, height: 50 },
    colors: [
      { name: 'Pitch Black', hex: '#111215' },
      { name: 'Ghost White', hex: '#f4f5f7' },
      { name: 'Washed Ash', hex: '#373a40' },
      { name: 'Deep Forest', hex: '#1b2a22' },
      { name: 'Crimson Blood', hex: '#4a111a' }
    ]
  },
  {
    id: 'hoodie',
    name: '460 GSM Brutalist Heavy Hoodie',
    basePrice: 78.00,
    supplierCost: 29.00,
    printWidthMm: 350,
    printHeightMm: 420,
    frontPrintArea: { x: 32, y: 28, width: 36, height: 35 },
    backPrintArea: { x: 26, y: 22, width: 48, height: 52 },
    colors: [
      { name: 'Pitch Black', hex: '#111215' },
      { name: 'Charcoal Wash', hex: '#24262c' },
      { name: 'Raw Bone', hex: '#e8e4db' },
      { name: 'Espresso Earth', hex: '#34261f' }
    ]
  },
  {
    id: 'crewneck',
    name: '360 GSM Mineral Washed Crewneck',
    basePrice: 58.00,
    supplierCost: 20.50,
    printWidthMm: 320,
    printHeightMm: 400,
    frontPrintArea: { x: 30, y: 24, width: 40, height: 44 },
    backPrintArea: { x: 27, y: 20, width: 46, height: 50 },
    colors: [
      { name: 'Acid Washed Black', hex: '#28292d' },
      { name: 'Concrete Gray', hex: '#585c66' },
      { name: 'Faded Plum', hex: '#392938' }
    ]
  },
  {
    id: 'tote',
    name: '16oz Heavyweight Canvas Tote',
    basePrice: 32.00,
    supplierCost: 9.00,
    printWidthMm: 280,
    printHeightMm: 320,
    frontPrintArea: { x: 25, y: 35, width: 50, height: 45 },
    backPrintArea: { x: 25, y: 35, width: 50, height: 45 },
    colors: [
      { name: 'Natural Ecru', hex: '#ece6d8' },
      { name: 'Midnight Jet', hex: '#16171b' }
    ]
  }
];

// Rich SVG graphic vectors for the studio vault
export const PRESET_DESIGNS: PresetDesign[] = [
  {
    id: 'design-cyber-kanji',
    name: 'Neo Tokyo // 空 (Void)',
    category: 'Cyberpunk',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none"><rect width="400" height="400" rx="20" fill="transparent"/><circle cx="200" cy="200" r="140" stroke="%23ff0055" stroke-width="4" stroke-dasharray="10 6"/><path d="M120 130 H280 M200 130 V270 M150 200 H250 M140 280 L200 240 L260 280" stroke="%2300f0ff" stroke-width="8" stroke-linecap="round"/><text x="200" y="330" text-anchor="middle" fill="%23ffffff" font-family="monospace" font-size="22" letter-spacing="8">VOID PROTOCOL</text><text x="200" y="80" text-anchor="middle" fill="%23ff0055" font-family="monospace" font-size="14" letter-spacing="4">SYSTEM OVERRIDE // 001</text></svg>`
  },
  {
    id: 'design-chrome-biomech',
    name: 'Biomechanic Chrome Core',
    category: 'Futurism',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none"><polygon points="200,60 320,130 320,270 200,340 80,270 80,130" stroke="%23ffffff" stroke-width="6" fill="%23141622"/><polygon points="200,100 280,150 280,250 200,300 120,250 120,150" stroke="%23ff0055" stroke-width="3"/><circle cx="200" cy="200" r="50" fill="%2300f0ff" fill-opacity="0.2" stroke="%2300f0ff" stroke-width="4"/><line x1="200" y1="60" x2="200" y2="340" stroke="%2300f0ff" stroke-width="2" stroke-dasharray="4 4"/><text x="200" y="375" text-anchor="middle" fill="%23a0a0b0" font-family="monospace" font-size="16" letter-spacing="6">CHROME SYNTHESIS</text></svg>`
  },
  {
    id: 'design-brutalist-grid',
    name: 'Brutalist Typography Grid',
    category: 'Minimalist',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none"><rect x="40" y="40" width="320" height="320" stroke="%23ffffff" stroke-width="3"/><line x1="40" y1="140" x2="360" y2="140" stroke="%23ffffff" stroke-width="2"/><line x1="40" y1="240" x2="360" y2="240" stroke="%23ffffff" stroke-width="2"/><line x1="160" y1="40" x2="160" y2="360" stroke="%23ffffff" stroke-width="2"/><text x="60" y="110" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="44">01</text><text x="180" y="90" fill="%23ff0055" font-family="sans-serif" font-weight="700" font-size="16">ATELIER CORE</text><text x="180" y="115" fill="%23a0a0b0" font-family="monospace" font-size="12">EST. 2026 // POD</text><text x="60" y="210" fill="%2300f0ff" font-family="sans-serif" font-weight="900" font-size="32">ARCHIVE</text><text x="60" y="310" fill="%23ffffff" font-family="sans-serif" font-weight="800" font-size="28">HAUTE SPEC</text></svg>`
  },
  {
    id: 'design-acid-acid-sun',
    name: 'Eclipsed Nuclear Sigil',
    category: 'Underground',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none"><circle cx="200" cy="200" r="110" stroke="%23ff0055" stroke-width="8"/><circle cx="200" cy="200" r="60" fill="%23ff0055"/><path d="M200 40 L200 80 M200 320 L200 360 M40 200 L80 200 M320 200 L360 200 M87 87 L115 115 M285 285 L313 313 M87 313 L115 285 M285 115 L313 87" stroke="%23ffffff" stroke-width="6" stroke-linecap="round"/><text x="200" y="206" text-anchor="middle" fill="%23000000" font-family="sans-serif" font-weight="900" font-size="18">CRITICAL</text></svg>`
  }
];
