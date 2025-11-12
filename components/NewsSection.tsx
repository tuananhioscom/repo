import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { ChevronRightIcon } from '../constants';
import type { NewsArticle } from '../types';
import newsData from '../data/news.json';

const NewsSection: React.FC = () => {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);

    useEffect(() => {
        const loadNews = () => {
            const savedNews = localStorage.getItem('admin_news');
            if (savedNews) {
                try {
                    setNewsArticles(JSON.parse(savedNews).slice(0, 4));
                } catch (e) {
                    setNewsArticles(newsData.news.slice(0, 4));
                }
            } else {
                setNewsArticles(newsData.news.slice(0, 4));
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
        <div className="my-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">TIN TỨC</h2>
                <a 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/#news';
                    }}
                    className="text-sm font-semibold text-gray-600 hover:text-primary-blue flex items-center"
                >
                    Xem thêm <ChevronRightIcon />
                </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {newsArticles.map((article, index) => (
                    <NewsCard key={article.id || index} article={article} />
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
