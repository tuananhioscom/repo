import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import CategoryMenu from '../components/CategoryMenu';
import type { Product } from '../types';
import { getAllProducts } from '../utils/productLoader';
import categoriesData from '../data/categories.json';

const ProductsPage: React.FC = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categoryName, setCategoryName] = useState<string>('Tất cả sản phẩm');
    const [showNewOnly, setShowNewOnly] = useState<boolean>(false);
    const [showGiftOnly, setShowGiftOnly] = useState<boolean>(false);

    const updateProducts = () => {
        // Get category and filter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const categorySlug = urlParams.get('category');
        const filterNew = urlParams.get('new') === 'true';
        const filterGift = urlParams.get('gift') === 'true';

        // Load products
        const products = getAllProducts();
        setAllProducts(products);

        // Get categories
        const savedCategories = localStorage.getItem('admin_categories');
        let categories: any[] = [];
        if (savedCategories) {
            try {
                const parsed = JSON.parse(savedCategories);
                categories = parsed.categories || parsed;
            } catch (e) {
                categories = categoriesData.categories;
            }
        } else {
            categories = categoriesData.categories;
        }

        // Filter by category if provided
        if (categorySlug) {
            setSelectedCategory(categorySlug);
            setShowNewOnly(false);
            setShowGiftOnly(false);
            
            // Find category name
            const category = categories.find((cat: any) => cat.slug === categorySlug);
            if (category) {
                setCategoryName(category.name);
            }

            // Special handling for "Quà Tặng Doanh Nghiệp" category
            // Check if category name or slug contains "quà tặng" or "qua-tang"
            const isGiftCategory = category && (
                category.name.toLowerCase().includes('quà tặng') || 
                category.name.toLowerCase().includes('qua tang') ||
                category.slug.toLowerCase().includes('qua-tang') ||
                category.slug.toLowerCase().includes('gift')
            );

            if (isGiftCategory) {
                // For "Quà Tặng Doanh Nghiệp" category, show ALL products (including thuy-tinh and su)
                setFilteredProducts(products);
            } else {
                // Filter products by exact category match
                let filtered = products.filter(p => p.category === categorySlug);
                
                // If no exact match, try to find child categories
                if (filtered.length === 0) {
                    const childCategories = categories.filter((cat: any) => cat.parent === category?.id);
                    if (childCategories.length > 0) {
                        const childSlugs = childCategories.map((cat: any) => cat.slug);
                        filtered = products.filter(p => p.category && childSlugs.includes(p.category));
                    }
                }
                
                setFilteredProducts(filtered);
            }
        } else if (filterNew) {
            // Filter by isNew tag
            setSelectedCategory(null);
            setShowNewOnly(true);
            setCategoryName('Sản phẩm mới');
            
            // Filter products by isNew
            const filtered = products.filter(p => p.isNew);
            setFilteredProducts(filtered);
        } else if (filterGift) {
            // Filter by gift products (quà tặng doanh nghiệp) - show ALL products
            setSelectedCategory(null);
            setShowNewOnly(false);
            setShowGiftOnly(true);
            setCategoryName('Quà Tặng Doanh Nghiệp');
            
            // Show all products for "Quà Tặng Doanh Nghiệp" (including thuy-tinh and su)
            setFilteredProducts(products);
        } else {
            setSelectedCategory(null);
            setShowNewOnly(false);
            setShowGiftOnly(false);
            setCategoryName('Tất cả sản phẩm');
            setFilteredProducts(products);
        }
    };

    useEffect(() => {
        updateProducts();

        // Listen for product updates
        const handleProductsUpdate = () => {
            updateProducts();
        };

        // Listen for URL changes (popstate)
        const handlePopState = () => {
            updateProducts();
        };

        window.addEventListener('productsUpdated', handleProductsUpdate);
        window.addEventListener('storage', handleProductsUpdate);
        window.addEventListener('popstate', handlePopState);

        // Check URL periodically (for same-tab navigation)
        const interval = setInterval(() => {
            updateProducts();
        }, 500);

        return () => {
            window.removeEventListener('productsUpdated', handleProductsUpdate);
            window.removeEventListener('storage', handleProductsUpdate);
            window.removeEventListener('popstate', handlePopState);
            clearInterval(interval);
        };
    }, []);

    // Determine which products to display
    const hasFilter = selectedCategory || showNewOnly || showGiftOnly;
    const displayProducts = hasFilter ? filteredProducts : allProducts;

    return (
        <div className="bg-white p-6 border border-gray-200">
            <Breadcrumb items={[
                { label: 'Trang chủ' }, 
                { label: 'Sản phẩm' },
                ...(hasFilter ? [{ label: categoryName }] : [])
            ]} />
            
            <div className="lg:flex lg:space-x-6 mt-4">
                {/* Category Sidebar */}
                <div className="hidden lg:block lg:w-1/4 mb-6 lg:mb-0">
                    <CategoryMenu />
                </div>

                {/* Products Content */}
                <div className="lg:w-3/4">
                    <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                        {categoryName}
                    </h1>
                    
                    {hasFilter && filteredProducts.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">
                                {showNewOnly ? 'Không có sản phẩm mới nào.' : showGiftOnly ? 'Không có sản phẩm quà tặng doanh nghiệp nào.' : 'Không có sản phẩm nào trong danh mục này.'}
                            </p>
                        </div>
                    )}

                    {displayProducts.length > 0 && (
                        <>
                            <div className="flex justify-between items-center mb-4 text-sm bg-gray-50 p-2 rounded">
                                <p>Hiển thị {displayProducts.length} sản phẩm</p>
                                <select className="border border-gray-300 rounded p-2 text-xs sm:text-sm">
                                    <option>Thứ tự mặc định</option>
                                    <option>Thứ tự theo mức độ phổ biến</option>
                                    <option>Thứ tự theo giá: thấp đến cao</option>
                                    <option>Thứ tự theo giá: cao xuống thấp</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {displayProducts.map((product, index) => (
                                    <ProductCard key={product.id || index} product={product} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;