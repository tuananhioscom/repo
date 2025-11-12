import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Sidebar from '../components/Sidebar';

interface StaticPageProps {
    title: string;
    children: React.ReactNode;
}

const StaticPage: React.FC<StaticPageProps> = ({ title, children }) => {
    return (
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
    );
};

export default StaticPage;