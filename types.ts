export interface Product {
  name: string;
  image: string;
  oldPrice?: string;
  newPrice: string;
  discount?: number;
  isNew?: boolean;
}

export interface NewsArticle {
  title: string;
  image: string;
  date: string;
  category: string;
}
