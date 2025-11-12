import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
    const [banners, setBanners] = useState({
        mainBanner: 'https://picsum.photos/id/1018/800/600',
        sideBanner: 'https://picsum.photos/id/1080/400/600',
        bottomBanner1: 'https://picsum.photos/id/21/600/200',
        bottomBanner2: 'https://picsum.photos/id/22/600/200',
        bottomBanner3: 'https://picsum.photos/id/23/600/200'
    });

    useEffect(() => {
        // Load banners from localStorage
        const savedBanners = localStorage.getItem('hero_banners');
        if (savedBanners) {
            try {
                const parsed = JSON.parse(savedBanners);
                setBanners(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error('Error loading hero banners:', e);
            }
        }

        // Listen for updates
        const handleBannerUpdate = () => {
            const updated = localStorage.getItem('hero_banners');
            if (updated) {
                try {
                    const parsed = JSON.parse(updated);
                    setBanners(prev => ({ ...prev, ...parsed }));
                } catch (e) {
                    console.error('Error loading hero banners:', e);
                }
            }
        };

        window.addEventListener('heroBannersUpdated', handleBannerUpdate);
        window.addEventListener('storage', handleBannerUpdate);

        return () => {
            window.removeEventListener('heroBannersUpdated', handleBannerUpdate);
            window.removeEventListener('storage', handleBannerUpdate);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-3 md:gap-4">
            {/* Main Banner */}
            <div 
                className="col-span-1 lg:col-span-2 lg:row-span-2 bg-cover bg-center rounded-lg flex flex-col justify-center items-start p-4 md:p-6 lg:p-8 min-h-[250px] md:min-h-[350px] lg:min-h-[450px] relative"
                style={{ backgroundImage: `url('${banners.mainBanner}')` }}
            >
                {/* Overlay for better text readability on mobile */}
                <div className="absolute inset-0 bg-black bg-opacity-30 lg:bg-opacity-0 rounded-lg"></div>
                <div className="relative z-10">
                    <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold drop-shadow-lg">
                        Dịch Vụ In Ấn & In Logo
                    </h1>
                    <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-yellow-300 drop-shadow-lg mt-1">
                        Quà Tặng Doanh Nghiệp
                    </h2>
                    <p className="text-white mt-2 text-sm sm:text-base md:text-lg drop-shadow-md">Chuyên nghiệp - Chất lượng cao - Giá tốt</p>
                    <p className="text-white text-xs sm:text-sm drop-shadow-md mt-1 hidden sm:block">In logo lên ly thủy tinh, bình giữ nhiệt, cốc sứ, áo mưa, mũ bảo hiểm</p>
                    <button 
                        onClick={() => window.location.href = '/?page=SẢN PHẨM&gift=true'}
                        className="mt-3 md:mt-4 bg-yellow-400 text-gray-900 font-bold py-2 px-4 md:py-2 md:px-6 rounded-full hover:bg-yellow-500 transition duration-300 text-xs sm:text-sm md:text-base"
                    >
                        XEM QUÀ TẶNG DOANH NGHIỆP &gt;
                    </button>
                </div>
            </div>

            {/* Side Banner */}
            <div 
                className="hidden lg:block col-span-1 lg:row-span-2 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url('${banners.sideBanner}')` }}
            >
            </div>
            
            {/* Bottom Banners - Hidden on mobile, shown on desktop */}
            <div 
                className="hidden lg:block col-span-1 bg-cover bg-center rounded-lg h-32"
                style={{ backgroundImage: `url('${banners.bottomBanner1}')` }}
            >
            </div>
            <div 
                className="hidden lg:block col-span-1 bg-cover bg-center rounded-lg h-32"
                style={{ backgroundImage: `url('${banners.bottomBanner2}')` }}
            >
            </div>
            <div 
                className="hidden lg:block col-span-1 bg-cover bg-center rounded-lg h-32"
                style={{ backgroundImage: `url('${banners.bottomBanner3}')` }}
            >
            </div>

        </div>
    );
};

export default Hero;
