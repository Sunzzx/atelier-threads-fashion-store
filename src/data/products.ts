import { Product } from '../types/store';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'pod-01-cyber-oversized-tee',
    name: 'Glitch Matrix Heavyweight Tee',
    tagline: '280 GSM Ring-Spun Cotton | Direct-to-Garment Bio-Inks',
    model: 'pod',
    category: 'pod-tees',
    price: 38.00,
    compareAtPrice: 52.00,
    supplierCost: 13.50,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#0f0f11' },
      { name: 'Ghost White', hex: '#f0f2f5' },
      { name: 'Vintage Acid Wash', hex: '#373a40' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'Engineered for the neo-urban silhouette. Boxy oversized fit crafted with ultra-dense 280 GSM combed organic cotton. Printed using zero-water direct-to-garment (DTG) Japanese industrial pigment inks with micro-crisp resolution.',
    details: [
      '280 GSM 100% Combed Compact Ring-Spun Cotton',
      'Drop-shoulder boxy silhouette with thick 1.25" rib collar',
      'Double-needle sleeve and bottom hems for zero curl',
      'Pre-shrunk fabric to preserve structural geometry wash after wash',
      'Oeko-Tex certified non-toxic vegan inks'
    ],
    materials: '100% Organic Ring-Spun Cotton',
    weightGsm: '280 GSM',
    stockStatus: 'made_to_order',
    shippingDays: '3 - 6 Business Days (Print-On-Demand)',
    supplierName: 'Printify DTG Premium Hub (US / EU / India)',
    isFeatured: true,
    isBestseller: true,
    badge: 'POD ORIGINAL',
    reviews: [
      {
        id: 'r1',
        author: 'Kaelen Vance',
        rating: 5,
        date: '2026-10-24',
        comment: 'The collar structure is insane. Most drop tees stretch out after 2 washes; this one sits rigid like Balenciaga. Print definition is crystal clear.',
        verified: true,
        userLocation: 'Berlin, DE'
      },
      {
        id: 'r2',
        author: 'Maya Lin',
        rating: 5,
        date: '2026-11-02',
        comment: 'Ordered an L for an oversized streetwear look. Arrived in 4 days from the local POD facility. 10/10 quality.',
        verified: true,
        userLocation: 'Seattle, USA'
      }
    ]
  },
  {
    id: 'pod-02-monolith-hoodie',
    name: 'Monolith 460 GSM Heavyweight Hoodie',
    tagline: 'Extreme Weight French Terry | High-Density Puff Embroidery',
    model: 'pod',
    category: 'pod-hoodies',
    price: 78.00,
    compareAtPrice: 110.00,
    supplierCost: 29.00,
    rating: 5.0,
    reviewsCount: 89,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111215' },
      { name: 'Earth Clay', hex: '#4a3b32' },
      { name: 'Concrete Gray', hex: '#7a7e85' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    description: 'An architectural outerwear garment built from 460 GSM unbrushed French terry. Designed without front drawstrings for a minimalist brutalist drape, featuring a double-layered structured hood that stays upright naturally.',
    details: [
      '460 GSM Heavyweight 100% Cotton Loopback French Terry',
      'No drawstrings for clean architectural silhouette',
      'Double-ply crossover hood with seamless rim',
      'Deep kangaroo pocket with reinforced bartack stitches',
      'Heavy-gauge 2x2 elastane ribbing at waist and cuffs'
    ],
    materials: '100% Ultra-Heavy French Terry Cotton',
    weightGsm: '460 GSM',
    stockStatus: 'made_to_order',
    shippingDays: '4 - 7 Business Days',
    supplierName: 'Printify Heavy Apparel Workshop',
    isFeatured: true,
    isBestseller: true,
    badge: 'HAUTE POD',
    reviews: [
      {
        id: 'r3',
        author: 'Darius Thorne',
        rating: 5,
        date: '2026-11-05',
        comment: 'Heavy enough to feel like armor. The hood literally stands up on its own without slouching. Worth double the price tag.',
        verified: true,
        userLocation: 'London, UK'
      }
    ]
  },
  {
    id: 'drop-01-tactical-cargo-pant',
    name: 'Sector-07 Modular Cyber Cargo Pants',
    tagline: 'Waterproof Ripstop Membrane | 8 Tactical Magnetic Utility Pockets',
    model: 'dropship',
    category: 'dropship-techwear',
    price: 74.00,
    compareAtPrice: 105.00,
    supplierCost: 22.00,
    rating: 4.8,
    reviewsCount: 164,
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#0a0a0c' },
      { name: 'Military Olive', hex: '#3b443b' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'Sourced directly from vanguard technical outerwear specialists. Features DWR Teflon-coated hydrophobic ripstop nylon, articulated knee darts for unrestricted range of motion, and magnetic Fidlock-style utility pouches.',
    details: [
      'Military-spec 320D Teflon DWR Waterproof Ripstop Nylon',
      '8 ergonomic pockets with waterproof bonded tape zippers',
      'Fidlock-compatible quick-release magnetic flaps',
      'Adjustable toggle cinch cuffs for customizable ankle taper',
      'Pre-shaped ergonomic knee articulation'
    ],
    materials: 'DWR Coated 320D Ballistic Nylon Blend',
    stockStatus: 'in_stock',
    shippingDays: '6 - 10 Business Days (Direct Dropship Express)',
    supplierName: 'Shenzhen Techwear Guild (Global CJ Hub)',
    isFeatured: true,
    badge: 'DROPSHIP EXCLUSIVE',
    reviews: [
      {
        id: 'r4',
        author: 'Alex Ren',
        rating: 5,
        date: '2026-10-18',
        comment: 'Pockets are legitimately waterproof. Poured water on them to test and it bead right off. Fits true to size with sneaker stacks.',
        verified: true,
        userLocation: 'Tokyo, JP'
      }
    ]
  },
  {
    id: 'drop-02-modular-utility-vest',
    name: 'Kevlar-Aesthetic Modular Chest Rig Vest',
    tagline: 'Multi-Compartment Tactical Harness | 1000D Cordura Construction',
    model: 'dropship',
    category: 'dropship-outerwear',
    price: 68.00,
    compareAtPrice: 94.00,
    supplierCost: 21.00,
    rating: 4.9,
    reviewsCount: 78,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Night Ops Black', hex: '#0e0e11' },
      { name: 'Tactical Khaki', hex: '#5c5446' }
    ],
    sizes: ['One Size (Fully Adjustable Straps)'],
    description: 'A statement streetwear layering piece constructed with abrasion-resistant 1000D Cordura canvas. Engineered with breathable mesh backing and 4 modular clip-on pockets for phone, cards, passport, and daily tech EDC.',
    details: [
      '1000D Heavy Duty Oxford Cordura Nylon with PU coating',
      'Breathable 3D honeycomb air-mesh inner lining',
      'MOLLE webbing system for modular accessory expansion',
      '4-point harness adjustment fits all chest sizes (32" - 50")',
      'Industrial YKK matte black zippers'
    ],
    materials: '1000D Cordura Nylon & Aerospace Aluminum Hardware',
    stockStatus: 'in_stock',
    shippingDays: '5 - 9 Business Days (Direct Dropship)',
    supplierName: 'Neo-Gear Direct Fulfillment',
    isFeatured: false,
    badge: 'TRENDING'
  },
  {
    id: 'pod-03-acid-wash-crewneck',
    name: 'Solar Flare Acid-Wash Vintage Crewneck',
    tagline: 'Individual Mineral Washed 360 GSM Fleece | Custom Back Print',
    model: 'pod',
    category: 'pod-originals',
    price: 58.00,
    compareAtPrice: 76.00,
    supplierCost: 20.50,
    rating: 4.7,
    reviewsCount: 93,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Acid Washed Charcoal', hex: '#2c2d30' },
      { name: 'Bleached Indigo', hex: '#31394d' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'No two pieces are identical. Each sweater undergoes an individual potassium permanganate mineral acid bath to create a distinct vintage distressed patina, finished with high-contrast screen-printed art.',
    details: [
      '360 GSM 80% Cotton / 20% Polyester fleece for shrinkage control',
      'Artisanal hand-acid wash pattern unique to every single garment',
      'Drop shoulders with generous sleeve stack',
      'Heavy 1x1 rib knit cuffs and bottom hem'
    ],
    materials: '80% Combed Cotton, 20% Poly-Fleece',
    weightGsm: '360 GSM',
    stockStatus: 'made_to_order',
    shippingDays: '4 - 7 Business Days',
    supplierName: 'Printify Vintage Wash Apparel Line',
    isFeatured: true,
    badge: 'LIMITED POD'
  },
  {
    id: 'drop-03-titanium-cyber-sunglasses',
    name: 'Vektor-01 Frameless Cyber Shield Sunglasses',
    tagline: 'Aerospace Grade Rimless Lens | UV400 Polarized Mirror',
    model: 'dropship',
    category: 'dropship-accessories',
    price: 44.00,
    compareAtPrice: 65.00,
    supplierCost: 9.80,
    rating: 4.9,
    reviewsCount: 215,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Chrome Mirror', hex: '#c0c0c0' },
      { name: 'Obsidian Smoke', hex: '#1c1c1e' },
      { name: 'Cyber Neon Iridescent', hex: '#00f0ff' }
    ],
    sizes: ['One Size (Standard Universal Fit)'],
    description: 'Futuristic wraparound monolithic shield glasses inspired by cyberpunk anime and sci-fi brutalism. Features shatter-resistant polycarbonate UV400 lenses and ultra-lightweight memory alloy arms.',
    details: [
      '100% UV400 Polarized Polycarbonate Single Piece Shield',
      'Hydrophobic and anti-scratch nano coating',
      'Weight: only 28 grams for all-day comfort',
      'Comes with hard clamshell protective case and microfiber pouch'
    ],
    materials: 'Aviation Memory Alloy & Hardened Polycarbonate',
    stockStatus: 'in_stock',
    shippingDays: '5 - 8 Business Days (Direct Dropship)',
    supplierName: 'Vanguard Eyewear Co. (Guangzhou)',
    isFeatured: false,
    badge: 'VIRAL HIT'
  },
  {
    id: 'drop-04-industrial-chain-necklace',
    name: 'Barbed Wire Heavy Link Chain Necklace',
    tagline: '316L Solid Surgical Stainless Steel | Hypoallergenic & Tarnish-Proof',
    model: 'dropship',
    category: 'dropship-accessories',
    price: 36.00,
    compareAtPrice: 55.00,
    supplierCost: 6.20,
    rating: 4.8,
    reviewsCount: 110,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Raw Silver Polished', hex: '#e2e8f0' },
      { name: 'Gunmetal PVD Black', hex: '#27272a' }
    ],
    sizes: ['50cm (20")', '60cm (24")'],
    description: 'Solid curb Cuban links intertwined with stylized industrial barbed wire motifs. Hand-cast from surgical 316L stainless steel that will never rust, fade, turn green, or irritate sensitive skin even when worn in showers or oceans.',
    details: [
      'Solid 316L Marine-Grade Stainless Steel',
      'High-vacuum PVD electroplating for everlasting luster',
      'Reinforced double-spring lobster clasp mechanism',
      '100% Sweat-proof, waterproof, hypoallergenic'
    ],
    materials: 'Solid 316L Stainless Steel',
    stockStatus: 'in_stock',
    shippingDays: '4 - 8 Business Days',
    supplierName: 'Apex Jewelry Foundry (Direct Dropship)',
    isFeatured: false,
    badge: 'EVERLASTING'
  },
  {
    id: 'pod-04-heavy-canvas-tote',
    name: 'Brutalist 16oz Waxed Canvas Tote',
    tagline: 'Heavy 450 GSM Organic Cotton Canvas | Internal Laptop Sleeve',
    model: 'pod',
    category: 'pod-originals',
    price: 32.00,
    compareAtPrice: 45.00,
    supplierCost: 9.00,
    rating: 4.9,
    reviewsCount: 65,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Natural Ecru Canvas', hex: '#ede8dc' },
      { name: 'Midnight Charcoal', hex: '#1f2024' }
    ],
    sizes: ['One Size (16" x 15" x 5")'],
    description: 'A heavyweight utilitarian carryall for city commuters, creators, and students. Reinforced X-stitch handles easily withstand 25kg loads. Features dual-sided high-density textile printing with customizable artwork.',
    details: [
      '16oz / 450 GSM 100% Organic Cotton Heavy Canvas',
      'Interior zip pocket for phone/keys + padded 15" laptop divider',
      'Heavy-duty 1.5" wide reinforced cotton webbing shoulder straps',
      'Boxed bottom corner gusset gives structure when placed down'
    ],
    materials: '100% Organic Heavy Canvas',
    stockStatus: 'made_to_order',
    shippingDays: '3 - 6 Business Days',
    supplierName: 'Printify Canvas Line',
    isFeatured: false,
    badge: 'ESSENTIAL'
  }
];
