import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';
import { ChevronRightIcon } from '../constants';

interface ProductSectionProps {
    title: string;
    products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold bg-primary-blue text-white py-2 px-4 rounded-r-full">{title}</h2>
                <a href="#" className="text-sm font-semibold text-gray-600 hover:text-primary-blue flex items-center">
                    Xem thêm <ChevronRightIcon />
                </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductSection;
