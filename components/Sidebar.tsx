import React from 'react';
import type { Product } from '../types';

const sidebarCategories = [
    'Chuyên mục',
    'Tin tức'
];

const shockingPriceProducts: Product[] = [
    { name: 'Son Kem Lì HERA Sensual Powder Matte 5g', image: 'https://picsum.photos/id/1080/200/200', newPrice: '420,000đ' },
    { name: 'Gấu Bông Thú Nhồi Bông Hoàng Thượng Siêu Bông Mềm (Size 40cm) (Săn sale)', image: 'https://i.imgur.com/vHZTmCE.png', newPrice: '210,000đ' },
    { name: 'Gấu Bông Thú Nhồi Bông Mèo Hoàng Thượng Siêu Bông Mềm', image: 'https://i.imgur.com/vHZTmCE.png', newPrice: '210,000đ' },
    { name: 'Điện thoại iPhone 14', image: 'https://picsum.photos/id/86/200/200', newPrice: '20,000,000đ' },
    { name: 'Điện thoại iPhone 14 Pro', image: 'https://picsum.photos/id/87/200/200', newPrice: '29,000,000đ' },
];


const Sidebar: React.FC = () => {
    return (
        <aside className="w-full">
            <div className="bg-white border border-gray-200 mb-6">
                <h3 className="bg-primary-blue text-white font-bold p-3 text-sm">CHUYÊN MỤC</h3>
                <ul className="p-4 space-y-2 text-sm">
                    {sidebarCategories.map(cat => (
                         <li key={cat}><a href="#" className="hover:text-primary-blue">{cat}</a></li>
                    ))}
                </ul>
            </div>

            <div className="bg-white border border-gray-200">
                <h3 className="bg-primary-blue text-white font-bold p-3 text-sm">SẢN PHẨM GIÁ SỐC</h3>
                <ul className="p-4 space-y-4">
                    {shockingPriceProducts.map((product, index) => (
                         <li key={index} className="flex items-center space-x-3">
                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover border"/>
                            <div>
                                <a href="#" className="text-sm font-semibold hover:text-primary-blue leading-tight">{product.name}</a>
                                <p className="text-primary-orange font-bold text-sm mt-1">{product.newPrice}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;