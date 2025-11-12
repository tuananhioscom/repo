import React from 'react';
import { ChevronRightIcon } from '../constants';

const categories = [
    'Ly Thủy Tinh In Logo',
    'Tô Chén Thủy Tinh',
    'Đĩa Thủy Tinh',
    'Bộ Bình Nước Thủy Tinh',
    'Bình Giữ Nhiệt',
    'Cốc Sứ In Logo',
    'Ấm Chén Sứ',
    'Áo Mưa In Thương Hiệu',
    'Mũ Bảo Hiểm In Logo',
    'Ô Dù Cầm Tay',
    'Túi Canvas In Logo',
    'Móc Khóa Quà Tặng',
    'Sổ Tay In Logo'
];

const CategoryMenuItem: React.FC<{ category: string }> = ({ category }) => (
    <li className="border-b border-gray-200 last:border-b-0">
        <a href="#" className="flex justify-between items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-blue">
            <span>{category}</span>
            <ChevronRightIcon />
        </a>
    </li>
);

const CategoryMenu: React.FC = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <h2 className="bg-primary-blue text-white px-4 py-3 font-bold flex items-center text-base">
                DANH MỤC SẢN PHẨM
            </h2>
            <ul>
                {categories.map(category => (
                    <CategoryMenuItem key={category} category={category} />
                ))}
            </ul>
        </div>
    );
};

export default CategoryMenu;
