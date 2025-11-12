import productsData from '../data/products.json';

export type Product = {
  id?: string;
  name: string;
  image: string;
  oldPrice?: string;
  newPrice: string;
  discount?: number;
  isNew?: boolean;
  category?: string;
  slug?: string;
};

// Load products from localStorage or fallback to JSON
export const loadProducts = (): {
  newProducts: Product[];
  glassProducts: Product[];
  giftProducts: Product[];
} => {
  // Try to load from localStorage first
  const savedProducts = localStorage.getItem('admin_products');
  
  if (savedProducts) {
    try {
      const allProducts: Product[] = JSON.parse(savedProducts);
      
      // Organize products back into their sections (same logic as AdminPage)
      return {
        newProducts: allProducts.filter(p => p.isNew).slice(0, 6),
        glassProducts: allProducts.filter(p => p.category === 'ly-thuy-tinh'),
        giftProducts: allProducts.filter(p => 
          p.category && 
          !p.category.includes('thuy-tinh') && 
          !p.category.includes('su')
        )
      };
    } catch (e) {
      console.error('Failed to parse saved products, using default:', e);
    }
  }
  
  // Fallback to default JSON data
  // Combine all products from JSON
  const allProductsFromJSON = [
    ...productsData.newProducts,
    ...productsData.glassProducts,
    ...productsData.giftProducts
  ];
  
  // Filter by isNew tag for newProducts
  return {
    newProducts: allProductsFromJSON.filter(p => p.isNew).slice(0, 6),
    glassProducts: productsData.glassProducts,
    giftProducts: productsData.giftProducts
  };
};

// Get all products as a flat array
export const getAllProducts = (): Product[] => {
  const { newProducts, glassProducts, giftProducts } = loadProducts();
  return [...newProducts, ...glassProducts, ...giftProducts];
};

