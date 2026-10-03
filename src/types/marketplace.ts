export type ProductCategory = 
  | 'all'
  | 'video-motion'
  | 'stills-carousels'
  | 'engineering-web'
  | 'automation'
  | 'interactive-tools';

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'video-motion' | 'stills-carousels' | 'engineering-web' | 'automation' | 'interactive-tools';
  price: number;
  isFree?: boolean;
  isPopular?: boolean;
  stack: string[];
  formats: string[];
  deliverables: string[];
  previewType: 'video' | 'card' | 'code' | 'terminal' | 'tool';
  propsSample?: Record<string, unknown>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  tier: 'Starter' | 'Pro' | 'Enterprise';
}

export interface OrderSubmission {
  productSlug: string;
  productTitle: string;
  tier: string;
  customerName: string;
  customerEmail: string;
  customerLinkedin?: string;
  amount: number;
  notes?: string;
}

export interface InquirySubmission {
  name: string;
  email: string;
  linkedinUrl?: string;
  projectType: string;
  estimatedTimeline?: string;
  message: string;
}
