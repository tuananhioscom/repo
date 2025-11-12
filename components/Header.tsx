import React, { useState, useEffect } from 'react';
import { PhoneIcon, MailIcon, LocationIcon, UserIcon, CartIcon, SearchIcon, MenuIcon } from '../constants';
import { getCart } from '../utils/cart';
import { getCurrentUser, logout } from '../utils/userAuth';

interface HeaderProps {
    onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [currentUser, setCurrentUser] = useState(getCurrentUser());

    // Load cart count
    useEffect(() => {
        const updateCartCount = () => {
            const cart = getCart();
            setCartCount(cart.itemCount);
        };

        updateCartCount();
        window.addEventListener('cartUpdated', updateCartCount);
        return () => window.removeEventListener('cartUpdated', updateCartCount);
    }, []);

    // Load user
    useEffect(() => {
        const handleUserChange = () => {
            setCurrentUser(getCurrentUser());
        };

        window.addEventListener('userLoggedIn', handleUserChange);
        window.addEventListener('userLoggedOut', handleUserChange);
        return () => {
            window.removeEventListener('userLoggedIn', handleUserChange);
            window.removeEventListener('userLoggedOut', handleUserChange);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setCurrentUser(null);
    };

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

                <div className="flex items-center space-x-4">
                    <div className="hidden sm:flex items-center space-x-2 text-sm">
                        <UserIcon />
                        <div>
                            {currentUser ? (
                                <>
                                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('USER_AUTH'); }} className="font-semibold hover:text-primary-blue">
                                        {currentUser.fullName}
                                    </a>
                                    <div>
                                        <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="text-xs text-gray-500 hover:text-red-600">
                                            Đăng xuất
                                        </a>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('USER_AUTH'); }} className="font-semibold hover:text-primary-blue">Đăng nhập</a> & <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('USER_AUTH'); }} className="font-semibold hover:text-primary-blue">Đăng ký</a>
                                    <div>Tài khoản</div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm cursor-pointer" onClick={(e) => { e.preventDefault(); onNavigate('CART'); }}>
                        <div className="relative">
                            <CartIcon />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-semibold">Giỏ hàng</div>
                            <div>của bạn</div>
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-gray-700 hover:text-primary-orange"
                            aria-label="Toggle menu"
                        >
                            <MenuIcon />
                        </button>
                    </div>
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

    const MobileMenu = () => {
        const navItems = ['TRANG CHỦ', 'GIỚI THIỆU', 'SẢN PHẨM', 'IN THƯƠNG HIỆU', 'TIN TỨC', 'LIÊN HỆ'];
        
        if (!mobileMenuOpen) return null;

        return (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
                <div className="bg-white w-64 h-full shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-4 border-b">
                        <span className="text-lg font-bold text-primary-blue">Menu</span>
                        <button 
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="py-2">
                        {navItems.map(item => (
                            <a
                                key={item}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(e, item);
                                    setMobileMenuOpen(false);
                                }}
                                className="block px-4 py-3 text-gray-700 hover:bg-primary-orange hover:text-white transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                    <div className="border-t pt-4 px-4">
                        {currentUser ? (
                            <div className="space-y-2">
                                <div className="text-sm font-semibold text-gray-700">{currentUser.fullName}</div>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="block text-sm text-red-600 hover:text-red-700"
                                >
                                    Đăng xuất
                                </a>
                            </div>
                        ) : (
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate('USER_AUTH');
                                    setMobileMenuOpen(false);
                                }}
                                className="block text-sm font-semibold text-primary-blue hover:text-primary-orange"
                            >
                                Đăng nhập & Đăng ký
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <header className="shadow-md">
            <TopBar />
            <MainHeader />
            <NavBar />
            <MobileMenu />
        </header>
    );
};

export default Header;