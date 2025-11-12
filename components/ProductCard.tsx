import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-blue transition-all duration-300 group">
            <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                {product.discount && (
                    <span className="absolute top-2 left-2 bg-primary-orange text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product.discount}%
                    </span>
                )}
                {product.isNew && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Mới
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 h-10 overflow-hidden group-hover:text-primary-blue">
                    {product.name}
                </h3>
                <div className="mt-2 flex items-baseline space-x-2">
                    <p className="text-primary-orange font-bold text-base">{product.newPrice}</p>
                    {product.oldPrice && (
                         <p className="text-gray-500 line-through text-xs">{product.oldPrice}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
