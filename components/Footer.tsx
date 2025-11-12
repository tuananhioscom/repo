import React from 'react';

interface FooterProps {
    onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-gray-100 text-gray-700">
            {/* Newsletter Section */}
            <div className="bg-primary-blue text-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <h3 className="font-bold text-lg">ĐĂNG KÝ NHẬN EMAIL</h3>
                        <p className="text-sm">Nhận thông tin sản phẩm mới</p>
                    </div>
                    <div className="flex w-full max-w-md">
                        <input type="email" placeholder="Nhập địa chỉ email" className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none" />
                        <button className="bg-primary-orange text-white font-bold px-6 py-2 rounded-r-md hover:bg-primary-orange-dark">GỬI</button>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <a href="/" className="text-3xl font-bold text-gray-800">
                            <span className="text-primary-blue">XƯỞNG IN</span>
                            <span className="text-primary-orange"> ĐÀ NẴNG</span>
                        </a>
                        <p className="text-sm mt-4 font-semibold">
                            Công ty TNHH Tam Giang Phát
                        </p>
                        <p className="text-sm mt-2">
                            Chuyên thiết kế, sản xuất và cung ứng quà tặng quảng bá thương hiệu. Giúp doanh nghiệp tiếp thị một cách tinh tế, thương hiệu in sâu vào tâm trí khách hàng.
                        </p>
                        <p className="text-sm mt-4">📍 126-128 Quách Xân, Phường Hòa Khánh, TP Đà Nẵng</p>
                        <p className="text-sm mt-2">📞 Hotline: 0935.444.945</p>
                        <p className="text-sm mt-2">✉️ Email: xuongindanang09@gmail.com</p>
                    </div>

                    {/* Links Section 1 */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">CHÍNH SÁCH ĐỔI TRẢ</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary-blue">Chính sách mua hàng</a></li>
                            <li><a href="#" className="hover:text-primary-blue">Chính sách đổi trả</a></li>
                            <li><a href="#" className="hover:text-primary-blue">Giao hàng</a></li>
                            <li><a href="#" className="hover:text-primary-blue">Thanh toán</a></li>
                            <li><a href="#" className="hover:text-primary-blue">Tài khoản</a></li>
                            <li><a href="#" className="hover:text-primary-blue">Giới thiệu</a></li>
                        </ul>
                    </div>

                    {/* Links Section 2 */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">SẢN PHẨM</h4>
                         <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary-blue">Ly Thủy Tinh In Logo</a></li>
                            <li><a href="#" className="hover:text-primary-blue">Bình Giữ Nhiệt</a></li>
                            <li><a href="#" className="hover:text-primary-blue">Cốc Sứ & Ấm Chén</a></li>
                            <li><a href="#" className="hover:text-primary-blue">Áo Mưa In Thương Hiệu</a></li>
                            <li><a href="#" className="hover:text-primary-blue">Mũ Bảo Hiểm</a></li>
                             <li><a href="#" className="hover:text-primary-blue">Ô Dù Cầm Tay</a></li>
                             <li><a href="#" className="hover:text-primary-blue">Bộ Bình Nước</a></li>
                        </ul>
                    </div>

                    {/* New Products Section */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">SẢN PHẨM MỚI</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center space-x-3">
                                <img src="https://picsum.photos/id/1080/50/50" alt="New product 1" className="w-12 h-12 object-cover rounded"/>
                                <div>
                                    <a href="#" className="font-semibold hover:text-primary-blue">Son Kem Lì HERA...</a>
                                    <p className="text-primary-orange font-bold">420,000đ</p>
                                </div>
                            </li>
                             <li className="flex items-center space-x-3">
                                <img src="https://i.imgur.com/vHZTmCE.png" alt="New product 2" className="w-12 h-12 object-cover rounded"/>
                                <div>
                                    <a href="#" className="font-semibold hover:text-primary-blue">Gấu Bông Thú Nhồi Bông...</a>
                                    <p className="text-primary-orange font-bold">210,000đ</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-gray-200 py-4">
                 <p className="text-center text-sm">
                    Copyright © 2024 Xưởng In Đà Nẵng TGP - Công ty TNHH Tam Giang Phát
                    {onNavigate && (
                        <>
                            {' '}<span className="mx-2">|</span>{' '}
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); onNavigate('ADMIN'); }}
                                className="text-gray-400 hover:text-primary-blue text-xs"
                            >
                                Admin
                            </a>
                        </>
                    )}
                 </p>
            </div>
        </footer>
    );
};

export default Footer;
