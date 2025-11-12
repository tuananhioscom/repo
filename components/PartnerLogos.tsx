import React, { useState, useEffect } from 'react';

const PartnerLogos: React.FC = () => {
    const [logos, setLogos] = useState<string[]>([]);

    useEffect(() => {
        // Load from localStorage
        const savedLogos = localStorage.getItem('partner_logos');
        if (savedLogos) {
            try {
                const parsedLogos = JSON.parse(savedLogos);
                setLogos(parsedLogos.filter((logo: string) => logo && logo.trim() !== ''));
            } catch (e) {
                // Default logos
                setLogos([
                    'https://via.placeholder.com/150x60/cccccc/808080?text=AT01FOOD',
                    'https://via.placeholder.com/150x60/cccccc/808080?text=BDS01',
                    'https://via.placeholder.com/150x60/cccccc/808080?text=BDS03',
                    'https://via.placeholder.com/150x60/cccccc/808080?text=BDS05',
                    'https://via.placeholder.com/150x60/cccccc/808080?text=C2SHOP',
                    'https://via.placeholder.com/150x60/cccccc/808080?text=C3SHOP',
                ]);
            }
        } else {
            // Default logos
            setLogos([
                'https://via.placeholder.com/150x60/cccccc/808080?text=AT01FOOD',
                'https://via.placeholder.com/150x60/cccccc/808080?text=BDS01',
                'https://via.placeholder.com/150x60/cccccc/808080?text=BDS03',
                'https://via.placeholder.com/150x60/cccccc/808080?text=BDS05',
                'https://via.placeholder.com/150x60/cccccc/808080?text=C2SHOP',
                'https://via.placeholder.com/150x60/cccccc/808080?text=C3SHOP',
            ]);
        }

        // Listen for updates
        const handlePartnerLogosUpdate = () => {
            const updatedLogos = localStorage.getItem('partner_logos');
            if (updatedLogos) {
                try {
                    const parsedLogos = JSON.parse(updatedLogos);
                    setLogos(parsedLogos.filter((logo: string) => logo && logo.trim() !== ''));
                } catch (e) {
                    // Keep current logos on error
                }
            }
        };

        window.addEventListener('partnerLogosUpdated', handlePartnerLogosUpdate);
        window.addEventListener('storage', handlePartnerLogosUpdate);

        return () => {
            window.removeEventListener('partnerLogosUpdated', handlePartnerLogosUpdate);
            window.removeEventListener('storage', handlePartnerLogosUpdate);
        };
    }, []);

    if (logos.length === 0) {
        return null;
    }

    return (
        <div className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title Section */}
                <div className="text-center mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                        Đối Tác Tin Cậy Của Chúng Tôi
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">
                        Các đối tác lớn đã tin tưởng và hợp tác lâu dài với chúng tôi
                    </p>
                </div>
                
                {/* Logos Section */}
                <div className="flex justify-center items-center flex-wrap gap-8">
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            className="group relative"
                            style={{
                                animation: `floatUp 3s ease-in-out infinite`,
                                animationDelay: `${index * 0.2}s`
                            }}
                        >
                            <img 
                                src={logo} 
                                alt={`Partner logo ${index + 1}`} 
                                className="h-10 object-contain opacity-100 group-hover:scale-110 transition-all duration-300 cursor-pointer"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes floatUp {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }
            `}</style>
        </div>
    );
};

export default PartnerLogos;
