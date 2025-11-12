import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 text-gray-700">
            {/* Newsletter Section */}
            <div className="bg-primary-red text-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <h3 className="font-bold text-lg">ĐĂNG KÝ NHẬN EMAIL</h3>
                        <p className="text-sm">Nhận thông tin sản phẩm mới</p>
                    </div>
                    <div className="flex w-full max-w-md">
                        <input type="email" placeholder="Nhập địa chỉ email" className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none" />
                        <button className="bg-gray-800 text-white font-bold px-6 py-2 rounded-r-md hover:bg-gray-700">GỬI</button>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <a href="/" className="text-4xl font-bold text-gray-800">
                            <span className="text-primary-red">C5</span>
                            <span className="text-yellow-500">SHOP</span>
                        </a>
                        <p className="text-sm mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <p className="text-sm mt-4">📍 123 Đường Phan Chu Trinh, Quận 10, TPHCM</p>
                        <p className="text-sm mt-2">📞 Điện thoại: 0123.456.789</p>
                        <p className="text-sm mt-2">✉️ Email: contact@demo.com</p>
                    </div>

                    {/* Links Section 1 */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">CHÍNH SÁCH ĐỔI TRẢ</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary-red">Chính sách mua hàng</a></li>
                            <li><a href="#" className="hover:text-primary-red">Chính sách đổi trả</a></li>
                            <li><a href="#" className="hover:text-primary-red">Giao hàng</a></li>
                            <li><a href="#" className="hover:text-primary-red">Thanh toán</a></li>
                            <li><a href="#" className="hover:text-primary-red">Tài khoản</a></li>
                            <li><a href="#" className="hover:text-primary-red">Giới thiệu</a></li>
                        </ul>
                    </div>
                    
                    {/* Links Section 2 */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">SẢN PHẨM</h4>
                         <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary-red">Điện Thoại & Phụ Kiện</a></li>
                            <li><a href="#" className="hover:text-primary-red">Đồ Chơi</a></li>
                            <li><a href="#" className="hover:text-primary-red">Đồng Hồ</a></li>
                            <li><a href="#" className="hover:text-primary-red">Giày Dép Nam</a></li>
                            <li><a href="#" className="hover:text-primary-red">Giày Dép Nữ</a></li>
                             <li><a href="#" className="hover:text-primary-red">Làm Đẹp</a></li>
                             <li><a href="#" className="hover:text-primary-red">Máy Ảnh & Máy Quay Phim</a></li>
                        </ul>
                    </div>

                    {/* New Products Section */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">SẢN PHẨM MỚI</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center space-x-3">
                                <img src="https://picsum.photos/id/1080/50/50" alt="New product 1" className="w-12 h-12 object-cover rounded"/>
                                <div>
                                    <a href="#" className="font-semibold hover:text-primary-red">Son Kem Lì HERA...</a>
                                    <p className="text-primary-red font-bold">420,000đ</p>
                                </div>
                            </li>
                             <li className="flex items-center space-x-3">
                                <img src="https://i.imgur.com/vHZTmCE.png" alt="New product 2" className="w-12 h-12 object-cover rounded"/>
                                <div>
                                    <a href="#" className="font-semibold hover:text-primary-red">Gấu Bông Thú Nhồi Bông...</a>
                                    <p className="text-primary-red font-bold">210,000đ</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-gray-200 py-4">
                 <p className="text-center text-sm">Copyright © 2023 C5 SHOP</p>
            </div>
        </footer>
    );
};

export default Footer;
