import React, { useState, useEffect } from 'react';
import { ChevronRightIcon } from '../constants';
import categoriesData from '../data/categories.json';

type Category = {
  id: string;
  name: string;
  slug: string;
  parent: string | null;
  order: number;
  icon: string;
};

const CategoryMenuItem: React.FC<{ category: Category }> = ({ category }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to products page with category filter
    window.location.href = `/?category=${category.slug}`;
  };

  return (
    <li className="border-b border-gray-200 last:border-b-0">
        <a 
          href="#" 
          onClick={handleClick}
          className="flex justify-between items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-blue cursor-pointer"
        >
            <span className="flex items-center">
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </span>
            <ChevronRightIcon />
        </a>
    </li>
  );
};

const CategoryMenu: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Load categories from localStorage or use default
    const savedCategories = localStorage.getItem('admin_categories');
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories);
        setCategories(parsed.categories || parsed);
      } catch (e) {
        setCategories(categoriesData.categories);
      }
    } else {
      setCategories(categoriesData.categories);
    }

    // Listen for category updates
    const handleCategoryUpdate = () => {
      const savedCategories = localStorage.getItem('admin_categories');
      if (savedCategories) {
        try {
          const parsed = JSON.parse(savedCategories);
          setCategories(parsed.categories || parsed);
        } catch (e) {
          setCategories(categoriesData.categories);
        }
      } else {
        setCategories(categoriesData.categories);
      }
    };

    window.addEventListener('categoriesUpdated', handleCategoryUpdate);
    window.addEventListener('storage', handleCategoryUpdate);

    return () => {
      window.removeEventListener('categoriesUpdated', handleCategoryUpdate);
      window.removeEventListener('storage', handleCategoryUpdate);
    };
  }, []);

  // Filter only parent categories (no parent) and sort by order
  const parentCategories = categories
    .filter(cat => !cat.parent)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
      <h2 className="bg-primary-blue text-white px-4 py-3 font-bold flex items-center text-base">
        DANH MỤC SẢN PHẨM
      </h2>
      <ul>
        {parentCategories.map(category => (
          <CategoryMenuItem key={category.id} category={category} />
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
