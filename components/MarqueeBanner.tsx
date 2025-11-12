import React, { useState, useEffect } from 'react';

interface MarqueeBannerProps {
    text?: string;
    speed?: number;
}

const MarqueeBanner: React.FC<MarqueeBannerProps> = ({ 
    text = "🎉 Chào mừng đến với Xưởng In Đà Nẵng TGP - Chuyên dịch vụ in ấn, in logo & quà tặng doanh nghiệp | Thiết kế miễn phí | Freeship toàn quốc | Hotline: 0935.444.945",
    speed = 50 
}) => {
    const [marqueeText, setMarqueeText] = useState(text);

    useEffect(() => {
        // Load from localStorage
        const savedText = localStorage.getItem('marquee_banner_text');
        if (savedText) {
            setMarqueeText(savedText);
        }

        // Listen for updates
        const handleMarqueeUpdate = () => {
            const updatedText = localStorage.getItem('marquee_banner_text');
            if (updatedText) {
                setMarqueeText(updatedText);
            }
        };

        window.addEventListener('marqueeUpdated', handleMarqueeUpdate);
        window.addEventListener('storage', handleMarqueeUpdate);

        return () => {
            window.removeEventListener('marqueeUpdated', handleMarqueeUpdate);
            window.removeEventListener('storage', handleMarqueeUpdate);
        };
    }, []);

    if (!marqueeText || marqueeText.trim() === '') {
        return null;
    }

    // Duplicate text for seamless loop
    const duplicatedText = `${marqueeText} • ${marqueeText} • ${marqueeText}`;

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-primary-blue via-blue-600 to-primary-blue py-2.5 shadow-md mb-4 z-10">
            <div className="flex items-center relative">
                {/* Left gradient fade */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary-blue to-transparent z-20 pointer-events-none"></div>
                
                {/* Scrolling text */}
                <div 
                    className="flex whitespace-nowrap animate-marquee"
                    style={{
                        animation: `marquee ${speed}s linear infinite`
                    }}
                >
                    <span className="text-white font-semibold text-sm md:text-base px-4">
                        {duplicatedText}
                    </span>
                </div>
                
                {/* Right gradient fade */}
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary-blue to-transparent z-20 pointer-events-none"></div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }
                .animate-marquee {
                    will-change: transform;
                }
            `}</style>
        </div>
    );
};

export default MarqueeBanner;

