import React from 'react';
import CategoryMenu from '../components/CategoryMenu';
import Hero from '../components/Hero';
import InfoBar from '../components/InfoBar';
import ProductSection from '../components/ProductSection';
import PromoBanners from '../components/PromoBanners';
import NewsSection from '../components/NewsSection';
import type { Product } from '../types';


const HomePage: React.FC = () => {
      const newProducts: Product[] = [
    {
      name: 'Son Kem Lì HERA Sensual Powder Matte',
      image: 'https://picsum.photos/id/1080/200/200',
      oldPrice: '420,000đ',
      newPrice: '420,000đ',
      discount: 11,
      isNew: true,
    },
    {
      name: 'Gấu Bông Thú Nhồi Bông...',
      image: 'https://i.imgur.com/vHZTmCE.png',
      oldPrice: '250,000đ',
      newPrice: '210,000đ',
      discount: 11,
      isNew: true,
    },
    {
      name: 'Gấu Bông Thú Nhồi Bông...',
      image: 'https://i.imgur.com/vHZTmCE.png',
      newPrice: '210,000đ',
    },
    {
      name: 'Gấu Bông Thú Nhồi Bông...',
      image: 'https://i.imgur.com/vHZTmCE.png',
      newPrice: '210,000đ',
    },
    {
      name: 'Gấu Bông Thú Nhồi Bông...',
      image: 'https://i.imgur.com/vHZTmCE.png',
      newPrice: '210,000đ',
    },
    {
      name: 'Gấu Bông Thú Nhồi Bông...',
      image: 'https://i.imgur.com/vHZTmCE.png',
      newPrice: '210,000đ',
    },
  ];

  const phoneProducts: Product[] = [
    { name: 'Điện thoại iPhone 14', image: 'https://picsum.photos/id/86/200/200', oldPrice: '22,000,000đ', newPrice: '20,000,000đ', discount: 11 },
    { name: 'Điện thoại iPhone 14 Pro', image: 'https://picsum.photos/id/87/200/200', newPrice: '29,000,000đ' },
    { name: 'Điện thoại iPhone 14 Pro', image: 'https://picsum.photos/id/88/200/200', oldPrice: '32,000,000đ', newPrice: '29,000,000đ', discount: 11, isNew: true, },
    { name: 'Điện thoại iPhone 14 Pro Max', image: 'https://picsum.photos/id/89/200/200', newPrice: '33,000,000đ' },
    { name: 'Điện thoại iPhone 14 Pro Max', image: 'https://picsum.photos/id/90/200/200', newPrice: '31,000,000đ', discount: 11, isNew: true },
    { name: 'Điện thoại iPhone 14 Pro', image: 'https://picsum.photos/id/91/200/200', newPrice: '29,000,000đ' },
  ];
  
  const toyProducts: Product[] = newProducts.slice(1);

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
                <ProductSection title="SẢN PHẨM MỚI" products={newProducts} />
                <ProductSection title="ĐIỆN THOẠI & PHỤ KIỆN" products={phoneProducts} />
                <PromoBanners />
                <ProductSection title="ĐỒ CHƠI" products={toyProducts} />
                <NewsSection />
            </div>
        </>
    );
}

export default HomePage;