import React, { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Sidebar from '../components/Sidebar';

interface StaticPageProps {
    title: string;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    children: React.ReactNode;
}

const StaticPage: React.FC<StaticPageProps> = ({ 
    title, 
    metaTitle, 
    metaDescription, 
    keywords,
    children 
}) => {
    useEffect(() => {
        // Set document title
        const pageTitle = metaTitle || `${title} - Xưởng In Đà Nẵng TGP`;
        document.title = pageTitle;

        // Update meta description
        if (metaDescription) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.setAttribute('name', 'description');
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', metaDescription);
        }

        // Update meta keywords
        if (keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.setAttribute('name', 'keywords');
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute('content', keywords);
        }

        // Update Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', pageTitle);
        }
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc && metaDescription) {
            ogDesc.setAttribute('content', metaDescription);
        }

        // Update canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            const currentUrl = window.location.href.split('?')[0];
            canonical.setAttribute('href', currentUrl);
        }
    }, [title, metaTitle, metaDescription, keywords]);

    // Generate breadcrumb structured data
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Trang chủ",
                "item": window.location.origin
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": title,
                "item": window.location.href
            }
        ]
    };

    return (
        <>
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema)
                }}
            />
            <div className="bg-white p-4 sm:p-6 border border-gray-200">
                <div className="lg:flex lg:flex-row-reverse lg:space-x-8 lg:space-x-reverse">
                    <div className="lg:w-1/4 mb-8 lg:mb-0">
                        <Sidebar />
                    </div>
                    <div className="lg:w-3/4">
                        <Breadcrumb items={[{ label: 'Trang chủ' }, { label: title }]} />
                        <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">{title}</h1>
                        <div className="prose max-w-none text-gray-700 text-sm leading-relaxed">
                           {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaticPage;