import React, { useState, useEffect } from 'react';
import { emailConfig, isEmailJSConfigured } from '../utils/emailConfig';
import { getAllProducts, Product } from '../utils/productLoader';

// Declare EmailJS types
declare global {
    interface Window {
        emailjs: {
            send: (serviceId: string, templateId: string, templateParams: any) => Promise<any>;
        };
    }
}

interface FooterProps {
    onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [newProducts, setNewProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Initialize EmailJS if configured
        if (isEmailJSConfigured() && window.emailjs && emailConfig.publicKey) {
            try {
                window.emailjs.init(emailConfig.publicKey);
            } catch (error) {
                console.error('EmailJS initialization error:', error);
            }
        }

        // Load new products
        const loadNewProducts = () => {
            const allProducts = getAllProducts();
            const newProductsList = allProducts.filter(p => p.isNew);
            
            if (newProductsList.length === 0) {
                setNewProducts([]);
                return;
            }
            
            // Shuffle and get 4-5 random products
            const shuffled = [...newProductsList].sort(() => Math.random() - 0.5);
            
            // Show 4-5 products: if we have 4 or less, show all; if 5+, show 4-5 randomly
            let count = 4; // Default to 4
            if (shuffled.length >= 5) {
                // Randomly choose between 4 and 5
                count = Math.random() > 0.5 ? 5 : 4;
            } else {
                // Show all if less than 4
                count = shuffled.length;
            }
            
            setNewProducts(shuffled.slice(0, count));
        };

        loadNewProducts();

        // Listen for product updates
        const handleProductsUpdate = () => {
            loadNewProducts();
        };

        window.addEventListener('productsUpdated', handleProductsUpdate);
        window.addEventListener('storage', handleProductsUpdate);

        return () => {
            window.removeEventListener('productsUpdated', handleProductsUpdate);
            window.removeEventListener('storage', handleProductsUpdate);
        };
    }, []);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate email
        if (!email || !email.includes('@')) {
            setMessage({ type: 'error', text: 'Vui lòng nhập địa chỉ email hợp lệ!' });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Save to localStorage
            const subscriptions = JSON.parse(localStorage.getItem('email_subscriptions') || '[]');
            const newSubscription = {
                email,
                date: new Date().toISOString(),
                source: 'footer'
            };
            
            // Check if email already exists
            if (subscriptions.some((sub: any) => sub.email === email)) {
                setMessage({ type: 'error', text: 'Email này đã được đăng ký rồi!' });
                setTimeout(() => setMessage(null), 3000);
                setIsSubmitting(false);
                return;
            }
            
            subscriptions.push(newSubscription);
            localStorage.setItem('email_subscriptions', JSON.stringify(subscriptions));
            
            // Send email via EmailJS if configured
            if (isEmailJSConfigured() && window.emailjs) {
                try {
                    await window.emailjs.send(
                        emailConfig.serviceId,
                        emailConfig.templates.subscribe,
                        {
                            to_email: 'xuongindanang09@gmail.com', // Email nhận thông báo
                            subscriber_email: email,
                            date: new Date().toLocaleString('vi-VN'),
                            message: `Email ${email} đã đăng ký nhận thông tin sản phẩm mới từ website.`
                        }
                    );
                } catch (emailError) {
                    console.error('EmailJS error:', emailError);
                    // Continue even if email fails - data is saved in localStorage
                }
            }
            
            // Clear form
            setEmail('');
            setMessage({ type: 'success', text: 'Đăng ký thành công! Cảm ơn bạn đã quan tâm.' });
            setTimeout(() => setMessage(null), 5000);
            
        } catch (error) {
            setMessage({ type: 'error', text: 'Có lỗi xảy ra. Vui lòng thử lại sau!' });
            setTimeout(() => setMessage(null), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="bg-gray-100 text-gray-700">
            {/* Newsletter Section */}
            <div className="bg-primary-blue text-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <h3 className="font-bold text-lg">ĐĂNG KÝ NHẬN EMAIL</h3>
                        <p className="text-sm">Nhận thông tin sản phẩm mới</p>
                    </div>
                    <form onSubmit={handleEmailSubmit} className="flex w-full max-w-md">
                        <input 
                            type="email" 
                            placeholder="Nhập địa chỉ email" 
                            className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-orange" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary-orange text-white font-bold px-6 py-2 rounded-r-md hover:bg-primary-orange-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {isSubmitting ? 'Đang gửi...' : 'GỬI'}
                        </button>
                    </form>
                </div>
                {message && (
                    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 text-center text-sm ${
                        message.type === 'success' ? 'text-green-200' : 'text-red-200'
                    }`}>
                        {message.text}
                    </div>
                )}
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
                            Chuyên dịch vụ <strong>in ấn</strong>, <strong>in logo theo yêu cầu</strong> và cung ứng <strong>quà tặng quảng cáo</strong>, <strong>quà tặng doanh nghiệp</strong>. 
                            Chúng tôi cung cấp <strong>quà tặng khách hàng</strong>, <strong>quà tặng nhân viên</strong>, <strong>quà tặng đối tác</strong>, <strong>quà tặng đại hội</strong>, <strong>quà tặng văn phòng</strong>. 
                            Thiết kế miễn phí, freeship toàn quốc, giá tốt. Giúp doanh nghiệp tiếp thị một cách tinh tế, thương hiệu in sâu vào tâm trí khách hàng.
                        </p>
                        <p className="text-sm mt-4">📍 126-128 Quách Xân, Phường Hòa Khánh, TP Đà Nẵng</p>
                        <p className="text-sm mt-2">📞 Hotline: 0935.444.945</p>
                        <p className="text-sm mt-2">✉️ Email: xuongindanang09@gmail.com</p>
                    </div>

                    {/* Links Section 1 */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">CHÍNH SÁCH ĐỔI TRẢ</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a 
                                    href="/?page=policies" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/?page=policies';
                                    }}
                                    className="hover:text-primary-blue"
                                >
                                    Chính sách mua hàng
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/?page=return" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/?page=return';
                                    }}
                                    className="hover:text-primary-blue"
                                >
                                    Chính sách đổi trả
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/?page=shipping" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/?page=shipping';
                                    }}
                                    className="hover:text-primary-blue"
                                >
                                    Giao hàng
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/?page=payment" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/?page=payment';
                                    }}
                                    className="hover:text-primary-blue"
                                >
                                    Thanh toán
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/?page=account" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/?page=account';
                                    }}
                                    className="hover:text-primary-blue"
                                >
                                    Tài khoản
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/?page=about" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/?page=about';
                                    }}
                                    className="hover:text-primary-blue"
                                >
                                    Giới thiệu
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Links Section 2 */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">SẢN PHẨM</h4>
                         <ul className="space-y-2 text-sm">
                            <li><a href="/?category=ly-thuy-tinh" className="hover:text-primary-blue">Ly Thủy Tinh In Logo</a></li>
                            <li><a href="/?category=binh-giu-nhiet" className="hover:text-primary-blue">Bình Giữ Nhiệt</a></li>
                            <li><a href="/?category=coc-su" className="hover:text-primary-blue">Cốc Sứ & Ấm Chén</a></li>
                            <li><a href="/?category=ao-mua" className="hover:text-primary-blue">Áo Mưa In Thương Hiệu</a></li>
                            <li><a href="/?category=mu-bao-hiem" className="hover:text-primary-blue">Mũ Bảo Hiểm</a></li>
                             <li><a href="/?category=o-du" className="hover:text-primary-blue">Ô Dù Cầm Tay</a></li>
                             <li><a href="/?category=binh-nuoc" className="hover:text-primary-blue">Bộ Bình Nước</a></li>
                        </ul>
                    </div>

                    {/* New Products Section */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">SẢN PHẨM MỚI</h4>
                        {newProducts.length === 0 ? (
                            <p className="text-sm text-gray-500">Chưa có sản phẩm mới</p>
                        ) : (
                            <ul className="space-y-3 text-sm">
                                {newProducts.map((product) => {
                                    const productUrl = product.id 
                                        ? `/?product=${product.id}` 
                                        : product.slug 
                                        ? `/?slug=${product.slug}`
                                        : '#';
                                    
                                    const handleClick = (e: React.MouseEvent) => {
                                        if (onNavigate && productUrl !== '#') {
                                            e.preventDefault();
                                            window.location.href = productUrl;
                                        }
                                    };

                                    return (
                                        <li key={product.id || product.name} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded transition">
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                className="w-14 h-14 object-cover rounded flex-shrink-0"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/56x56/cccccc/808080?text=No+Image';
                                                }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <a 
                                                    href={productUrl}
                                                    onClick={handleClick}
                                                    className="font-semibold hover:text-primary-blue block truncate"
                                                    title={product.name}
                                                >
                                                    {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
                                                </a>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {product.oldPrice && (
                                                        <span className="line-through text-gray-400 text-xs">{product.oldPrice}</span>
                                                    )}
                                                    <p className="text-primary-orange font-bold text-sm">
                                                        {product.newPrice}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
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
