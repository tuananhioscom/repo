export interface Product {
  id?: string;
  name: string;
  image: string;
  images?: string[]; // Multiple images for product detail
  oldPrice?: string;
  newPrice: string;
  discount?: number;
  isNew?: boolean;
  category?: string;
  slug?: string; // URL-friendly name for SEO
  description?: string; // Short description
  content?: string; // Full product content/description
  specifications?: { [key: string]: string }; // Product specifications
  metaTitle?: string; // SEO meta title
  metaDescription?: string; // SEO meta description
  keywords?: string; // SEO keywords
}

export interface NewsArticle {
  id?: string;
  title: string;
  slug?: string; // URL-friendly name for SEO
  image: string;
  date: string;
  category: string;
  excerpt?: string; // Short description
  content?: string; // Full article content
  metaTitle?: string; // SEO meta title
  metaDescription?: string; // SEO meta description
  keywords?: string; // SEO keywords
}
