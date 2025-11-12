import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import NewsCard from '../components/NewsCard';
import type { NewsArticle } from '../types';
import newsData from '../data/news.json';

const NewsListPage: React.FC = () => {
    const [allNewsArticles, setAllNewsArticles] = useState<NewsArticle[]>([]);

    useEffect(() => {
        const loadNews = () => {
            const savedNews = localStorage.getItem('admin_news');
            if (savedNews) {
                try {
                    setAllNewsArticles(JSON.parse(savedNews));
                } catch (e) {
                    setAllNewsArticles(newsData.news);
                }
            } else {
                setAllNewsArticles(newsData.news);
            }
        };

        loadNews();

        // Listen for news updates
        const handleNewsUpdate = () => {
            loadNews();
        };

        window.addEventListener('newsUpdated', handleNewsUpdate);
        window.addEventListener('storage', handleNewsUpdate);

        return () => {
            window.removeEventListener('newsUpdated', handleNewsUpdate);
            window.removeEventListener('storage', handleNewsUpdate);
        };
    }, []);

    return (
        <div className="bg-white p-6 border border-gray-200">
            <Breadcrumb items={[{ label: 'Trang chủ' }, { label: 'Tin tức' }]} />
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Tin tức</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allNewsArticles.map((article, index) => (
                    <NewsCard key={article.id || index} article={article} />
                ))}
            </div>
        </div>
    );
};

export default NewsListPage;