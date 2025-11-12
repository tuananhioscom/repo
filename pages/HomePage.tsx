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
      name: 'Ly Thủy Tinh In Logo Cao Cấp 350ml',
      image: 'https://picsum.photos/id/1080/200/200',
      oldPrice: '45,000đ',
      newPrice: '35,000đ',
      discount: 22,
      isNew: true,
    },
    {
      name: 'Bình Giữ Nhiệt In Logo 500ml',
      image: 'https://picsum.photos/id/225/200/200',
      oldPrice: '180,000đ',
      newPrice: '150,000đ',
      discount: 17,
      isNew: true,
    },
    {
      name: 'Cốc Sứ In Logo Doanh Nghiệp',
      image: 'https://picsum.photos/id/431/200/200',
      newPrice: '55,000đ',
      isNew: true,
    },
    {
      name: 'Ấm Chén Sứ Cao Cấp',
      image: 'https://picsum.photos/id/367/200/200',
      newPrice: '280,000đ',
    },
    {
      name: 'Áo Mưa In Thương Hiệu',
      image: 'https://picsum.photos/id/15/200/200',
      oldPrice: '35,000đ',
      newPrice: '28,000đ',
      discount: 20,
    },
    {
      name: 'Mũ Bảo Hiểm In Logo',
      image: 'https://picsum.photos/id/188/200/200',
      newPrice: '95,000đ',
    },
  ];

  const glassProducts: Product[] = [
    { name: 'Ly Thủy Tinh In Logo 300ml', image: 'https://picsum.photos/id/1080/200/200', oldPrice: '40,000đ', newPrice: '32,000đ', discount: 20 },
    { name: 'Tô Thủy Tinh In Logo', image: 'https://picsum.photos/id/225/200/200', newPrice: '45,000đ', isNew: true },
    { name: 'Đĩa Thủy Tinh Cao Cấp', image: 'https://picsum.photos/id/431/200/200', oldPrice: '55,000đ', newPrice: '48,000đ', discount: 13 },
    { name: 'Bộ Bình Nước Thủy Tinh', image: 'https://picsum.photos/id/367/200/200', newPrice: '280,000đ' },
    { name: 'Ly Rượu Thủy Tinh In Logo', image: 'https://picsum.photos/id/225/200/200', newPrice: '38,000đ', isNew: true },
    { name: 'Cốc Thủy Tinh Uống Nước', image: 'https://picsum.photos/id/1080/200/200', newPrice: '25,000đ' },
  ];

  const giftProducts: Product[] = [
    { name: 'Ô Dù Cầm Tay In Logo', image: 'https://picsum.photos/id/15/200/200', oldPrice: '85,000đ', newPrice: '68,000đ', discount: 20 },
    { name: 'Túi Canvas In Thương Hiệu', image: 'https://picsum.photos/id/188/200/200', newPrice: '45,000đ', isNew: true },
    { name: 'Móc Khóa Kim Loại In Logo', image: 'https://picsum.photos/id/367/200/200', newPrice: '18,000đ' },
    { name: 'Sổ Tay Da In Logo', image: 'https://picsum.photos/id/431/200/200', newPrice: '65,000đ', isNew: true },
    { name: 'Bình Nước Nhựa In Logo', image: 'https://picsum.photos/id/225/200/200', newPrice: '42,000đ' },
  ];

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
                <ProductSection title="LY THỦY TINH IN LOGO" products={glassProducts} />
                <PromoBanners />
                <ProductSection title="QUÀ TẶNG DOANH NGHIỆP" products={giftProducts} />
                <NewsSection />
            </div>
        </>
    );
}

export default HomePage;