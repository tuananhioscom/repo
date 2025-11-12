import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';
import { ChevronRightIcon } from '../constants';

interface ProductSectionProps {
    title: string;
    products: Product[];
    categorySlug?: string; // Category slug for filtering when clicking "Xem thêm"
    showNewOnly?: boolean; // If true, filter by isNew tag when clicking "Xem thêm"
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products, categorySlug, showNewOnly }) => {
    const handleViewMore = (e: React.MouseEvent) => {
        e.preventDefault();
        if (categorySlug) {
            // Navigate to products page with category filter
            window.location.href = `/?category=${categorySlug}`;
        } else if (showNewOnly) {
            // Navigate to products page with new products filter
            window.location.href = '/?new=true&page=products';
        } else {
            // Navigate to products page without filter
            window.location.href = '/?page=products';
        }
    };

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold bg-primary-blue text-white py-2 px-4 rounded-r-full">{title}</h2>
                <a 
                    href="#" 
                    onClick={handleViewMore}
                    className="text-sm font-semibold text-gray-600 hover:text-primary-blue flex items-center cursor-pointer"
                >
                    Xem thêm <ChevronRightIcon />
                </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {products.map((product, index) => (
                    <ProductCard key={product.id || index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductSection;
