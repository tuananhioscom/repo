import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const promoProducts: Product[] = [
    { name: 'Điện thoại iPhone 14 Pro', image: 'https://picsum.photos/id/88/200/200', oldPrice: '32,000,000đ', newPrice: '29,000,000đ', discount: 11, isNew: true, },
    { name: 'Điện thoại iPhone 14 Pro Max', image: 'https://picsum.photos/id/89/200/200', newPrice: '33,000,000đ' },
    { name: 'Điện thoại iPhone 14 Pro Max', image: 'https://picsum.photos/id/90/200/200', newPrice: '31,000,000đ', discount: 11, isNew: true },
    { name: 'Điện thoại iPhone 14 Pro', image: 'https://picsum.photos/id/91/200/200', newPrice: '29,000,000đ' },
];

const promoProducts2: Product[] = [
    { name: 'Điện thoại iPhone 14', image: 'https://picsum.photos/id/86/200/200', oldPrice: '22,000,000đ', newPrice: '20,000,000đ', discount: 11 },
    { name: 'Gấu Bông Thú Nhồi Bông...', image: 'https://i.imgur.com/vHZTmCE.png', newPrice: '210,000đ' },
    { name: 'Gấu Bông Thú Nhồi Bông...', image: 'https://i.imgur.com/vHZTmCE.png', newPrice: '210,000đ' },
    { name: 'Son Kem Lì HERA Sensual Powder Matte', image: 'https://picsum.photos/id/1080/200/200', newPrice: '420,000đ' },
];

const PromotionsPage: React.FC = () => {
    return (
        <div className="bg-white p-6 border border-gray-200">
            <Breadcrumb items={[{ label: 'Trang chủ' }, { label: 'Khuyến mãi' }]} />
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Khuyến mãi</h1>
            <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-bold mb-3">Ưu đãi tháng 3</h2>
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {promoProducts.map((product, index) => <ProductCard key={index} product={product}/>)}
                   </div>
                </div>
                 <div>
                  <h2 className="text-lg font-bold mb-3">Giảm giá đặc biệt</h2>
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {promoProducts2.map((product, index) => <ProductCard key={index} product={product}/>)}
                   </div>
                </div>
                 <div>
                  <h2 className="text-lg font-bold mb-3">Flash Sale</h2>
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {promoProducts.map((product, index) => <ProductCard key={index} product={product}/>)}
                   </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionsPage;