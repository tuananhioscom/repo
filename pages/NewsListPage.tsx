import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import NewsCard from '../components/NewsCard';
import type { NewsArticle } from '../types';

const allNewsArticles: NewsArticle[] = [
    { title: 'TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...', image: 'https://picsum.photos/seed/tv1/400/300', date: '24/03/2023', category: 'TIN TỨC' },
    { title: 'TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...', image: 'https://picsum.photos/seed/tv2/400/300', date: '24/03/2023', category: 'TIN TỨC' },
    { title: 'TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...', image: 'https://picsum.photos/seed/tv3/400/300', date: '24/03/2023', category: 'TIN TỨC' },
    { title: 'TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...', image: 'https://picsum.photos/seed/tv4/400/300', date: '24/03/2023', category: 'TIN TỨC' },
    { title: 'TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...', image: 'https://picsum.photos/seed/tv5/400/300', date: '24/03/2023', category: 'TIN TỨC' },
];

const NewsListPage: React.FC = () => {
    return (
        <div className="bg-white p-6 border border-gray-200">
            <Breadcrumb items={[{ label: 'Trang chủ' }, { label: 'Tin tức' }]} />
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Tin tức</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allNewsArticles.map((article, index) => (
                    <NewsCard key={index} article={article} />
                ))}
            </div>
        </div>
    );
};

export default NewsListPage;