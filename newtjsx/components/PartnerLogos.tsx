import React from 'react';

const logos = [
    'https://via.placeholder.com/150x60/cccccc/808080?text=AT01FOOD',
    'https://via.placeholder.com/150x60/cccccc/808080?text=BDS01',
    'https://via.placeholder.com/150x60/cccccc/808080?text=BDS03',
    'https://via.placeholder.com/150x60/cccccc/808080?text=BDS05',
    'https://via.placeholder.com/150x60/cccccc/808080?text=C2SHOP',
    'https://via.placeholder.com/150x60/cccccc/808080?text=C3SHOP',
];

const PartnerLogos: React.FC = () => {
    return (
        <div className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center flex-wrap gap-8">
                    {logos.map((logo, index) => (
                        <img key={index} src={logo} alt={`Partner logo ${index + 1}`} className="h-10 object-contain" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnerLogos;
