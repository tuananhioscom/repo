import React from 'react';
import NewsCard from './NewsCard';
import { ChevronRightIcon } from '../constants';
import type { NewsArticle } from '../types';


const newsArticles: NewsArticle[] = [
    {
        title: 'TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...',
        image: 'https://picsum.photos/seed/tv1/400/300',
        date: '24/03/2023',
        category: 'TIN TỨC'
    },
    {
        title: 'TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...',
        image: 'https://picsum.photos/seed/tv2/400/300',
        date: '24/03/2023',
        category: 'TIN TỨC'
    },
    {
        title: 'TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...',
        image: 'https://picsum.photos/seed/tv3/400/300',
        date: '24/03/2023',
        category: 'TIN TỨC'
    },
    {
        title: 'TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...',
        image: 'https://picsum.photos/seed/tv4/400/300',
        date: '24/03/2023',
        category: 'TIN TỨC'
    },
];

const NewsSection: React.FC = () => {
    return (
        <div className="my-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">TIN TỨC</h2>
                <a href="#" className="text-sm font-semibold text-gray-600 hover:text-primary-blue flex items-center">
                    Xem thêm <ChevronRightIcon />
                </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {newsArticles.map((article, index) => (
                    <NewsCard key={index} article={article} />
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
