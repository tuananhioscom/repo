import React, { useState, useEffect } from 'react';

const PromoBanners: React.FC = () => {
    const [promoBanners, setPromoBanners] = useState<string[]>([
        'https://picsum.photos/seed/promo1/600/150',
        'https://picsum.photos/seed/promo2/600/150'
    ]);

    useEffect(() => {
        // Load promo banners from localStorage
        const savedBanners = localStorage.getItem('promo_banners');
        if (savedBanners) {
            try {
                const parsed = JSON.parse(savedBanners);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setPromoBanners(parsed);
                }
            } catch (e) {
                console.error('Error loading promo banners:', e);
            }
        }

        // Listen for updates
        const handleBannerUpdate = () => {
            const updated = localStorage.getItem('promo_banners');
            if (updated) {
                try {
                    const parsed = JSON.parse(updated);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setPromoBanners(parsed);
                    }
                } catch (e) {
                    console.error('Error loading promo banners:', e);
                }
            }
        };

        window.addEventListener('promoBannersUpdated', handleBannerUpdate);
        window.addEventListener('storage', handleBannerUpdate);

        return () => {
            window.removeEventListener('promoBannersUpdated', handleBannerUpdate);
            window.removeEventListener('storage', handleBannerUpdate);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-6 md:my-8">
            {promoBanners.map((banner, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md">
                    <img 
                        src={banner} 
                        alt={`Promo banner ${index + 1}`} 
                        className="w-full h-auto object-cover"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};

export default PromoBanners;
