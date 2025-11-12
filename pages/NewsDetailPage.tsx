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

      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Article Content */}
          <article className="bg-white rounded-lg shadow-sm mt-4 p-6 md:p-8">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-primary-blue text-white text-sm font-bold px-3 py-1 rounded">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center text-gray-600 text-sm mb-6 pb-6 border-b">
              <span className="mr-4">📅 {article.date}</span>
              <span>📂 {article.category}</span>
            </div>

            {/* Featured Image */}
            <div className="mb-6">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>

            {/* Excerpt */}
            {article.excerpt && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-primary-blue">
                <p className="text-lg text-gray-700 italic">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Article Content */}
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              {article.content ? (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                <div>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="mb-4">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tiêu đề phụ</h2>
                  <p className="mb-4">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <p className="mb-4">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                </div>
              )}
            </div>

            {/* Share Buttons */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chia sẻ bài viết</h3>
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  Facebook
                </button>
                <button
                  className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}
                >
                  Twitter
                </button>
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Đã sao chép link!');
                  }}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* This would show related articles - can be implemented later */}
            </div>
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

