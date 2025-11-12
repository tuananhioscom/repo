import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const allProducts: Product[] = [
    { name: 'Son Kem Lì HERA Sensual Powder Matte', image: 'https://picsum.photos/id/1080/200/200', oldPrice: '420,000đ', newPrice: '420,000đ', discount: 11, isNew: true, },
    { name: 'Gấu Bông Thú Nhồi Bông...', image: 'https://i.imgur.com/vHZTmCE.png', oldPrice: '250,000đ', newPrice: '210,000đ', discount: 11, isNew: true, },
    { name: 'Gấu Bông Thú Nhồi Bông...', image: 'https://i.imgur.com/vHZTmCE.png', newPrice: '210,000đ' },
    { name: 'Điện thoại iPhone 14', image: 'https://picsum.photos/id/86/200/200', oldPrice: '22,000,000đ', newPrice: '20,000,000đ', discount: 11 },
    { name: 'Điện thoại iPhone 14 Pro', image: 'https://picsum.photos/id/87/200/200', newPrice: '29,000,000đ' },
    { name: 'Điện thoại iPhone 14 Pro', image: 'https://picsum.photos/id/88/200/200', oldPrice: '32,000,000đ', newPrice: '29,000,000đ', discount: 11, isNew: true, },
    { name: 'Điện thoại iPhone 14 Pro Max', image: 'https://picsum.photos/id/89/200/200', newPrice: '33,000,000đ' },
    { name: 'Gấu Bông Thú Nhồi Bông...', image: 'https://i.imgur.com/vHZTmCE.png', newPrice: '210,000đ' },
    { name: 'Gấu Bông Thú Nhồi Bông...', image: 'https://i.imgur.com/vHZTmCE.png', newPrice: '210,000đ' },
    { name: 'Gấu Bông Thú Nhồi Bông...', image: 'https://i.imgur.com/vHZTmCE.png', newPrice: '210,000đ' },
];

const ProductsPage: React.FC = () => {
    return (
         <div className="bg-white p-6 border border-gray-200">
            <Breadcrumb items={[{ label: 'Trang chủ' }, { label: 'Sản phẩm' }]} />
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Sản phẩm</h1>
            
            <div className="flex justify-between items-center mb-4 text-sm bg-gray-50 p-2 rounded">
                <p>Hiển thị 1-12 của 20 kết quả</p>
                <select className="border border-gray-300 rounded p-2 text-xs sm:text-sm">
                    <option>Thứ tự mặc định</option>
                    <option>Thứ tự theo mức độ phổ biến</option>
                    <option>Thứ tự theo giá: thấp đến cao</option>
                    <option>Thứ tự theo giá: cao xuống thấp</option>
                </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...allProducts, ...allProducts.slice(0, 2)].map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>

             <div className="flex justify-center mt-8">
                <nav className="flex space-x-2" aria-label="Pagination">
                    <span aria-current="page" className="px-4 py-2 bg-primary-red text-white rounded cursor-default">1</span>
                    <a href="#" className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100">2</a>
                    <a href="#" className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100">&raquo;</a>
                </nav>
            </div>
        </div>
    );
};

export default ProductsPage;