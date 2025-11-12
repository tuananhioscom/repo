import React, { useState } from 'react';
import { PhoneIcon, MailIcon, LocationIcon, UserIcon, CartIcon, SearchIcon, MenuIcon } from '../constants';

interface HeaderProps {
    onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
        e.preventDefault();
        onNavigate(page);
    };

    const TopBar = () => (
        <div className="bg-primary-blue text-white text-xs py-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        <PhoneIcon />
                        <span>0935.444.945</span>
                    </div>
                    <div className="hidden sm:flex items-center space-x-1">
                        <MailIcon />
                        <span>xuongindanang09@gmail.com</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-1">
                        <LocationIcon />
                        <span>126-128 Quách Xân, Hòa Khánh, Đà Nẵng</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="#" onClick={(e) => handleNavClick(e, 'Chính sách mua hàng')} className="hover:underline">Chính sách mua hàng</a>
                    <a href="#" onClick={(e) => handleNavClick(e, 'Đổi trả')} className="hover:underline">Đổi trả</a>
                </div>
            </div>
        </div>
    );
    
    const MainHeader = () => (
        <div className="bg-white py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center">
                     <a href="#" onClick={(e) => handleNavClick(e, 'TRANG CHỦ')} className="text-3xl font-bold text-gray-800">
                        <span className="text-primary-blue">XƯỞNG IN</span>
                        <span className="text-primary-orange"> ĐÀ NẴNG</span>
                    </a>
                </div>

                <div className="hidden lg:flex flex-grow max-w-xl mx-8">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Nhập từ khóa..."
                            className="w-full border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-orange"
                        />
                        <button className="absolute right-0 top-0 h-full bg-primary-orange text-white px-6 rounded-r-md hover:bg-primary-orange-dark">
                            <SearchIcon />
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                     <div className="hidden sm:flex items-center space-x-2 text-sm">
                        <UserIcon />
                        <div>
                            <a href="#" className="font-semibold hover:text-primary-blue">Đăng nhập</a> & <a href="#" className="font-semibold hover:text-primary-blue">Đăng ký</a>
                            <div>Tài khoản</div>
                        </div>
                    </div>
                     <div className="flex items-center space-x-2 text-sm">
                        <div className="relative">
                            <CartIcon />
                            <span className="absolute -top-2 -right-2 bg-primary-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
                        </div>
                        <div>
                            <div className="font-semibold">Giỏ hàng</div>
                            <div>của bạn</div>
                        </div>
                    </div>
                </div>
                 <div className="lg:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <MenuIcon />
                    </button>
                </div>
            </div>
        </div>
    );

    const NavBar = () => {
        const navItems = ['TRANG CHỦ', 'GIỚI THIỆU', 'SẢN PHẨM', 'IN THƯƠNG HIỆU', 'TIN TỨC', 'LIÊN HỆ'];

        return (
            <nav className="bg-white border-t border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="hidden lg:flex items-center">
                        <div className="bg-primary-blue text-white px-6 py-3 font-bold flex items-center">
                            <MenuIcon />
                            <span className="ml-2">DANH MỤC SẢN PHẨM</span>
                        </div>
                        <div className="flex space-x-8 ml-8 text-sm font-semibold">
                            {navItems.map(item => (
                                <a key={item} href="#" onClick={(e) => handleNavClick(e, item)} className="py-4 text-gray-700 hover:text-primary-orange border-b-2 border-transparent hover:border-primary-orange">
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        );
    };

    return (
        <header className="shadow-md">
            <TopBar />
            <MainHeader />
            <NavBar />
            {/* Mobile menu could be implemented here */}
        </header>
    );
};

export default Header;