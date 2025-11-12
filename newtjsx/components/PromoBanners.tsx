import React from 'react';

const PromoBanners: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-pink-500 rounded-lg overflow-hidden">
                <img src="https://picsum.photos/seed/promo1/600/150" alt="Freeship banner" className="w-full h-full object-cover" />
            </div>
            <div className="bg-red-500 rounded-lg overflow-hidden">
                 <img src="https://picsum.photos/seed/promo2/600/150" alt="Voucher banner" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default PromoBanners;
