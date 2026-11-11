export type ProductModel = 'pod' | 'dropship';

export type ProductCategory = 
  | 'all'
  | 'pod-originals'
  | 'pod-hoodies'
  | 'pod-tees'
  | 'dropship-techwear'
  | 'dropship-outerwear'
  | 'dropship-accessories';

export interface ProductColor {
  name: string;
  hex: string;
  previewImage?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  userLocation?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  model: ProductModel;
  category: ProductCategory;
  price: number;
  supplierCost: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  details: string[];
  materials: string;
  weightGsm?: string;
  stockStatus: 'in_stock' | 'low_stock' | 'made_to_order';
  shippingDays: string;
  supplierName: string;
  isFeatured?: boolean;
  isBestseller?: boolean;
  badge?: string;
  reviews?: Review[];
}

export interface PODCustomization {
  garmentType: 'tee' | 'hoodie' | 'crewneck' | 'tote';
  garmentColor: string;
  garmentColorHex: string;
  designSource: 'upload' | 'preset';
  designUrl: string;
  designName: string;
  placement: 'front' | 'back';
  scale: number;
  posX: number;
  posY: number;
  customText?: string;
}

export interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  model: ProductModel;
  price: number;
  supplierCost: number;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  image: string;
  customization?: PODCustomization;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  netProfit: number;
  paymentMethod: 'stripe' | 'paypal' | 'razorpay' | 'cod';
  paymentStatus: 'paid' | 'pending';
  fulfillmentStatus: 'unfulfilled' | 'sent_to_pod' | 'sent_to_dropshipper' | 'in_production' | 'shipped';
  trackingNumber?: string;
  fulfillmentPayload: Record<string, any>;
}

export interface StoreSettings {
  storeName: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR';
  currencyRate: number; // vs USD
  currencySymbol: string;
  freeShippingThreshold: number;
  printifyApiKey?: string;
  printifyShopId?: string;
  printfulApiKey?: string;
  stripePublishableKey?: string;
  razorpayKeyId?: string;
  notificationEmail?: string;
  autoDispatchPOD: boolean;
  autoDispatchDropship: boolean;
}
