import React from 'react';

interface BreadcrumbProps {
    items: { label: string; href?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    // Generate BreadcrumbList structured data for SEO
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.href || (typeof window !== 'undefined' ? window.location.href : '')
        }))
    };

    return (
        <>
            {/* Breadcrumb Schema for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema)
                }}
            />
            <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex" itemScope itemType="https://schema.org/BreadcrumbList">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                            {index > 0 && <span className="mx-2" aria-hidden="true">/</span>}
                            <span 
                                className={index === items.length - 1 ? 'text-gray-800 font-semibold' : 'text-primary-blue hover:underline cursor-pointer'}
                                itemProp="name"
                            >
                                {item.label}
                            </span>
                            <meta itemProp="position" content={String(index + 1)} />
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
};

export default Breadcrumb;