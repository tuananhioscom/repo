import React from 'react';

interface BreadcrumbProps {
    items: { label: string; href?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && <span className="mx-2">/</span>}
                        {/* The link is disabled for now, as we use state-based navigation */}
                        <span className={index === items.length - 1 ? 'text-gray-800' : 'text-primary-blue'}>{item.label}</span>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;