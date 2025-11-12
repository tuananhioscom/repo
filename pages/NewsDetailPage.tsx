import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import newsData from '../data/news.json';
import type { NewsArticle } from '../types';

interface NewsDetailPageProps {
  newsId?: string;
  newsSlug?: string;
}

const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ newsId, newsSlug }) => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = () => {
      // Try to load from localStorage first
      const savedNews = localStorage.getItem('admin_news');
      let allNews: NewsArticle[] = [];

      if (savedNews) {
        try {
          allNews = JSON.parse(savedNews);
        } catch (e) {
          allNews = newsData.news;
        }
      } else {
        allNews = newsData.news;
      }

      let foundArticle: NewsArticle | undefined;

      if (newsId) {
        foundArticle = allNews.find(n => n.id === newsId || 
          n.title.toLowerCase().replace(/\s+/g, '-') === newsId);
      } else if (newsSlug) {
        foundArticle = allNews.find(n => n.slug === newsSlug || 
          n.title.toLowerCase().replace(/\s+/g, '-') === newsSlug);
      }

      // Auto-generate slug if not exists
      if (foundArticle && !foundArticle.slug) {
        foundArticle.slug = foundArticle.title.toLowerCase().replace(/\s+/g, '-');
      }

      setArticle(foundArticle || null);
      setLoading(false);
    };

    loadArticle();
  }, [newsId, newsSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy bài viết</h1>
          <p className="text-gray-600">Bài viết bạn đang tìm kiếm không tồn tại.</p>
        </div>
      </div>
    );
  }

  // Generate breadcrumb
  const breadcrumbItems = [
    { label: 'Trang chủ', onClick: () => window.location.href = '/' },
    { label: 'Tin tức', onClick: () => window.location.href = '/#news' },
    { label: article.title }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>{article.metaTitle || `${article.title} - Xưởng In Đà Nẵng TGP`}</title>
        <meta name="description" content={article.metaDescription || article.excerpt || article.title} />
        <meta name="keywords" content={article.keywords || `${article.title}, tin tức, xưởng in đà nẵng`} />
        <meta property="og:title" content={article.metaTitle || article.title} />
        <meta property="og:description" content={article.metaDescription || article.excerpt || ''} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:section" content={article.category} />
      </head>
  
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Article Content */}
            <article className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Category Badge & Meta Info */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-primary-blue text-white text-sm font-bold px-3 py-1 rounded">
                      {article.category}
                    </span>
                    <time className="text-sm text-gray-500" dateTime={article.date}>
                      📅 {article.date}
                    </time>
                  </div>
                  
                  {/* Title - H1 for SEO */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                    {article.title}
                  </h1>
                </div>

                {/* Featured Image */}
                <div className="px-6 pt-6">
                  <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden mb-6">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                {article.excerpt && (
                  <div className="px-6 mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border-l-4 border-primary-blue">
                      <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="px-6 pb-8">
                  <div 
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                      prose-headings:font-bold prose-headings:text-gray-900
                      prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-6 prose-h1:font-extrabold prose-h1:text-gray-900
                      prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                      prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                      prose-p:mb-4 prose-p:text-base prose-p:leading-7
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
                      prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4
                      prose-li:mb-2 prose-li:text-base
                      prose-a:text-primary-blue prose-a:underline hover:prose-a:text-primary-blue-dark
                      prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                      prose-blockquote:border-l-4 prose-blockquote:border-primary-blue prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600"
                    dangerouslySetInnerHTML={{ __html: article.content || '' }}
                  />
                </div>

                {/* Share Buttons */}
                <div className="px-6 py-6 border-t border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Chia sẻ bài viết</h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center gap-2"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      <span>📘</span> Facebook
                    </button>
                    <button
                      className="bg-blue-400 text-white px-5 py-2.5 rounded-lg hover:bg-blue-500 transition-colors font-medium text-sm flex items-center gap-2"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}
                    >
                      <span>🐦</span> Twitter
                    </button>
                    <button
                      className="bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm flex items-center gap-2"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Đã sao chép link!');
                      }}
                    >
                      <span>🔗</span> Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin bài viết</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24 flex-shrink-0">📂 Danh mục:</span>
                    <span className="text-gray-900 font-medium">{article.category}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-500 w-24 flex-shrink-0">📅 Ngày đăng:</span>
                    <span className="text-gray-900 font-medium">{article.date}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'NewsArticle',
            headline: article.title,
            image: article.image,
            datePublished: article.date,
            dateModified: article.date,
            author: {
              '@type': 'Organization',
              name: 'Xưởng In Đà Nẵng TGP'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Xưởng In Đà Nẵng TGP',
              logo: {
                '@type': 'ImageObject',
                url: article.image
              }
            },
            description: article.excerpt || article.title
          })
        }}
      />
    </>
  );
};

export default NewsDetailPage;

