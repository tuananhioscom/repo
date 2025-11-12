import React, { useRef, useState, useEffect } from 'react';
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
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

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

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollButtons);
            window.addEventListener('resize', checkScrollButtons);
            return () => {
                container.removeEventListener('scroll', checkScrollButtons);
                window.removeEventListener('resize', checkScrollButtons);
            };
        }
    }, [products]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
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
            
            {/* Scrollable container with arrows */}
            <div className="relative">
                {/* Left Arrow Button */}
                {showLeftArrow && products.length > 6 && (
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all"
                        aria-label="Scroll left"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Product Grid - Horizontal Scroll */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {products.map((product, index) => (
                        <div key={product.id || index} className="flex-shrink-0 w-40 sm:w-48">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow Button */}
                {showRightArrow && products.length > 6 && (
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all"
                        aria-label="Scroll right"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default ProductSection;
