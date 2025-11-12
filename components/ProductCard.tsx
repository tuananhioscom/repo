import React, { useState } from 'react';
import type { Product } from '../types';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-blue transition-all duration-300 group relative">
                <div className="relative">
                    <img 
                        src={product.image} 
                        alt={`${product.name} - Quà tặng doanh nghiệp in logo tại Đà Nẵng`} 
                        title={`${product.name} - Dịch vụ in logo chuyên nghiệp`}
                        className="w-full h-40 object-cover" 
                        loading="lazy"
                    />
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
                    {/* Quick View Button - appears on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                            onClick={() => setIsQuickViewOpen(true)}
                            className="bg-white text-primary-blue px-4 py-2 rounded-lg font-semibold hover:bg-primary-blue hover:text-white transition-colors"
                        >
                            Xem nhanh
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <h3 
                        className="text-sm font-semibold text-gray-800 h-10 overflow-hidden group-hover:text-primary-blue cursor-pointer"
                        onClick={() => {
                            const productId = product.id || product.name.toLowerCase().replace(/\s+/g, '-');
                            window.location.href = `/?product=${productId}`;
                        }}
                    >
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
            
            {/* Quick View Modal */}
            <QuickViewModal
                product={product}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
            />
        </>
    );
};

export default ProductCard;
