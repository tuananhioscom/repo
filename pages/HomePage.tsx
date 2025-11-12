import React, { useState, useEffect } from 'react';
import CategoryMenu from '../components/CategoryMenu';
import Hero from '../components/Hero';
import InfoBar from '../components/InfoBar';
import ProductSection from '../components/ProductSection';
import PromoBanners from '../components/PromoBanners';
import NewsSection from '../components/NewsSection';
import type { Product } from '../types';
import { loadProducts } from '../utils/productLoader';


const HomePage: React.FC = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [glassProducts, setGlassProducts] = useState<Product[]>([]);
  const [giftProducts, setGiftProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products from localStorage or JSON
    const products = loadProducts();
    setNewProducts(products.newProducts);
    setGlassProducts(products.glassProducts);
    setGiftProducts(products.giftProducts);

    // Listen for products update event (when admin saves)
    const handleProductsUpdate = () => {
      const updatedProducts = loadProducts();
      setNewProducts(updatedProducts.newProducts);
      setGlassProducts(updatedProducts.glassProducts);
      setGiftProducts(updatedProducts.giftProducts);
    };

    window.addEventListener('productsUpdated', handleProductsUpdate);
    window.addEventListener('storage', handleProductsUpdate);

    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
      window.removeEventListener('storage', handleProductsUpdate);
    };
  }, []);

    return (
        <>
            <div className="lg:flex lg:space-x-6">
                <div className="hidden lg:block lg:w-1/4">
                    <CategoryMenu />
                </div>
                <div className="lg:w-3/4">
                    <Hero />
                </div>
            </div>
            <InfoBar />
            <div className="mt-6">
                <ProductSection 
                    title="SẢN PHẨM MỚI" 
                    products={newProducts}
                    showNewOnly={true}
                />
                <ProductSection 
                    title="LY THỦY TINH IN LOGO" 
                    products={glassProducts}
                    categorySlug="ly-thuy-tinh"
                />
                <PromoBanners />
                <ProductSection 
                    title="QUÀ TẶNG DOANH NGHIỆP" 
                    products={giftProducts}
                    // No specific category - could be multiple categories
                />
                <NewsSection />
            </div>
        </>
    );
}

export default HomePage;