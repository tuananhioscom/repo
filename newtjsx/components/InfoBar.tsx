import React from 'react';

const InfoItem: React.FC<{ icon: string; title: string; subtitle: string }> = ({ icon, title, subtitle }) => (
    <div className="flex items-center space-x-4">
        <div className="text-4xl">{icon}</div>
        <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
    </div>
);


const InfoBar: React.FC = () => {
    return (
        <div className="bg-white rounded-lg p-4 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            <InfoItem icon="🛡️" title="Chất lượng hàng đầu" subtitle="Cam kết tất cả sản phẩm chính hãng 100%" />
            <InfoItem icon="🚚" title="Giao hàng siêu nhanh" subtitle="Chúng tôi cam kết giao hàng trong 24h" />
            <InfoItem icon="💰" title="Mua hàng tiết kiệm" subtitle="Giảm giá & khuyến mãi với ưu đãi cực lớn" />
            <InfoItem icon="📞" title="Hỗ trợ online 24/7" subtitle="Gọi ngay 0123.456.789 để được tư vấn" />
        </div>
    );
};

export default InfoBar;
