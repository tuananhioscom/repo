import React from 'react';
import type { NewsArticle } from '../types';
import { ChevronRightIcon } from '../constants';


interface NewsCardProps {
    article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
                <span className="absolute top-2 left-2 bg-primary-red bg-opacity-80 text-white text-xs font-bold px-2 py-1 rounded">
                    {article.category}
                </span>
            </div>
            <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 h-10 overflow-hidden mb-2">
                    {article.title}
                </h3>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>📅 {article.date}</span>
                    <a href="#" className="bg-primary-red text-white px-3 py-1 rounded-full text-xs flex items-center hover:bg-primary-red-dark">
                        Chi tiết <ChevronRightIcon />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
