import React, { useState, useEffect } from 'react';

const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 md:bottom-6 md:left-6 md:transform-none z-40 bg-primary-orange hover:bg-primary-orange-dark text-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            aria-label="Trở lên đầu trang"
            title="Trở lên đầu trang"
        >
            <svg 
                className="w-5 h-5 md:w-6 md:h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 10l7-7m0 0l7 7m-7-7v18" 
                />
            </svg>
            <span className="ml-2 text-xs md:text-sm font-semibold hidden md:group-hover:inline-block animate-fadeIn">
                Lên đầu
            </span>
        </button>
    );
};

export default BackToTop;

