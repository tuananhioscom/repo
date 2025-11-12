import React, { useState, useEffect } from 'react';
import CategoryMenu from '../components/CategoryMenu';
import Hero from '../components/Hero';
import InfoBar from '../components/InfoBar';
import ProductSection from '../components/ProductSection';
import PromoBanners from '../components/PromoBanners';
import NewsSection from '../components/NewsSection';
import MarqueeBanner from '../components/MarqueeBanner';
import type { Product } from '../types';
import { loadProducts } from '../utils/productLoader';


const HomePage: React.FC = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [glassProducts, setGlassProducts] = useState<Product[]>([]);
  const [giftProducts, setGiftProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products from localStorage or JSON
    const products = loadProducts();
    setNewProducts(products.newProducts);
    setGlassProducts(products.glassProducts);
    setGiftProducts(products.giftProducts);

    // Listen for products update event (when admin saves)
    const handleProductsUpdate = () => {
      const updatedProducts = loadProducts();
      setNewProducts(updatedProducts.newProducts);
      setGlassProducts(updatedProducts.glassProducts);
      setGiftProducts(updatedProducts.giftProducts);
    };

    window.addEventListener('productsUpdated', handleProductsUpdate);
    window.addEventListener('storage', handleProductsUpdate);

    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
      window.removeEventListener('storage', handleProductsUpdate);
    };
  }, []);

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Xưởng In Đà Nẵng TGP",
    "alternateName": "Công ty TNHH Tam Giang Phát",
    "description": "Chuyên dịch vụ in ấn, in logo lên sản phẩm quà tặng doanh nghiệp. Ly thủy tinh in logo, bình giữ nhiệt, cốc sứ, áo mưa, mũ bảo hiểm. Quà tặng quảng bá thương hiệu chất lượng cao.",
    "url": "https://xuongindanang.com",
    "telephone": "0935444945",
    "email": "xuongindanang09@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "126-128 Quách Xân",
      "addressLocality": "Phường Hòa Khánh",
      "addressRegion": "Đà Nẵng",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "16.0412197",
      "longitude": "108.1677978"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": "Đà Nẵng"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dịch vụ in ấn và quà tặng quảng cáo",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "In logo lên sản phẩm",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Ly thủy tinh in logo"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Bình giữ nhiệt in logo"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Cốc sứ in logo"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Mũ bảo hiểm quảng cáo"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Áo mưa quà tặng"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Quà tặng doanh nghiệp",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Quà tặng khách hàng"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Quà tặng nhân viên"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Quà tặng đối tác"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Quà tặng đại hội"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Quà tặng văn phòng"
              }
            }
          ]
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "makesOffer": {
      "@type": "Offer",
      "name": "Dịch vụ in logo theo yêu cầu",
      "description": "Thiết kế miễn phí, in logo chuyên nghiệp, freeship toàn quốc"
    }
  };

    return (
        <>
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData)
                }}
            />

            {/* Marquee Banner - Chạy ngang quảng cáo */}
            <div className="w-full mb-4">
                <MarqueeBanner />
            </div>

            <div className="lg:flex lg:space-x-6 mt-2">
                <div className="hidden lg:block lg:w-1/4">
                    <CategoryMenu />
                </div>
                <div className="lg:w-3/4">
                    <Hero />
                </div>
            </div>
            <InfoBar />
            
            {/* SEO Content Section - Hidden visually but accessible to search engines */}
            <div className="sr-only">
                <h1>Xưởng In Đà Nẵng TGP - Chuyên Dịch Vụ In Ấn, In Logo & Quà Tặng Quảng Cáo</h1>
                <p>
                    <strong>Xưởng In Đà Nẵng TGP</strong> là đơn vị chuyên nghiệp hàng đầu tại Đà Nẵng trong lĩnh vực <strong>in ấn</strong>, <strong>in logo</strong> và cung ứng <strong>quà tặng quảng cáo</strong>, <strong>quà tặng doanh nghiệp</strong>. 
                    Với nhiều năm kinh nghiệm, chúng tôi cung cấp dịch vụ <strong>in logo theo yêu cầu</strong> chất lượng cao trên nhiều loại sản phẩm như <strong>ly thủy tinh in logo</strong>, <strong>bình giữ nhiệt in logo</strong>, <strong>mũ bảo hiểm quảng cáo</strong>, <strong>áo mưa quà tặng</strong>, cốc sứ và nhiều sản phẩm quà tặng khác.
                </p>
                
                <h2>Dịch Vụ Quà Tặng Chuyên Nghiệp Cho Mọi Đối Tượng</h2>
                <p>
                    Chúng tôi chuyên cung cấp các loại <strong>quà tặng</strong> phù hợp với từng đối tượng:
                </p>
                <ul>
                    <li><strong>Quà tặng khách hàng</strong> - Tăng cường mối quan hệ, xây dựng lòng trung thành</li>
                    <li><strong>Quà tặng nhân viên</strong> - Ghi nhận đóng góp, tạo động lực làm việc</li>
                    <li><strong>Quà tặng đối tác</strong> - Thắt chặt quan hệ hợp tác, thể hiện sự trân trọng</li>
                    <li><strong>Quà tặng văn phòng</strong> - Tạo môi trường làm việc chuyên nghiệp</li>
                    <li><strong>Quà tặng đại hội</strong> - Kỷ niệm sự kiện quan trọng, để lại ấn tượng sâu sắc</li>
                    <li><strong>Quà tặng doanh nghiệp</strong> - Quảng bá thương hiệu hiệu quả</li>
                </ul>

                <h2>Sản Phẩm Quà Tặng Quảng Cáo Đa Dạng</h2>
                <p>
                    Chúng tôi cung cấp đầy đủ các sản phẩm <strong>quà tặng quảng cáo</strong> phổ biến:
                </p>
                <ul>
                    <li><strong>Mũ bảo hiểm quảng cáo</strong> - In logo theo yêu cầu, chất lượng cao</li>
                    <li><strong>Bình giữ nhiệt in logo</strong> - Giữ nhiệt tốt, in logo bền màu</li>
                    <li><strong>Áo mưa quà tặng</strong> - Tiện dụng, in thông tin quảng cáo</li>
                    <li><strong>Ly thủy tinh in logo</strong> - Sang trọng, phù hợp quà tặng doanh nghiệp</li>
                    <li><strong>Ô dù quà tặng</strong> - Bền đẹp, in logo nổi bật</li>
                    <li><strong>Túi vải quà tặng</strong> - Thân thiện môi trường, in logo theo yêu cầu</li>
                    <li><strong>Cốc sứ in logo</strong> - Chất lượng cao, in logo chuyên nghiệp</li>
                    <li><strong>Bút bi quà tặng</strong> - Tiện dụng, in logo theo yêu cầu</li>
                    <li><strong>Móc khóa quà tặng</strong> - Nhỏ gọn, in logo bền màu</li>
                </ul>

                <h2>Tại Sao Chọn Dịch Vụ In Ấn & Quà Tặng Của Chúng Tôi?</h2>
                <p>
                    Dịch vụ <strong>in logo</strong> chuyên nghiệp, độ bền màu cao. Đa dạng sản phẩm <strong>quà tặng doanh nghiệp</strong>: ly thủy tinh, bình giữ nhiệt, cốc sứ, áo mưa, mũ bảo hiểm. 
                    Giá cả cạnh tranh cho dịch vụ <strong>in ấn</strong> và sản xuất quà tặng. Thiết kế và <strong>in logo</strong> theo yêu cầu riêng của doanh nghiệp. 
                    Giao hàng nhanh chóng, đúng hẹn. Miễn phí thiết kế mẫu <strong>in logo</strong> theo yêu cầu. Freeship toàn quốc. 
                    Mỗi sản phẩm đều có nguồn gốc rõ ràng, full VAT. Dịch vụ <strong>in logo</strong> chuyên nghiệp, độ bền màu cao, đảm bảo chất lượng.
                </p>

                <h2>Dịch Vụ In Logo Theo Yêu Cầu Chuyên Nghiệp</h2>
                <p>
                    Chúng tôi nhận <strong>in logo theo yêu cầu</strong> trên mọi loại sản phẩm. Từ hình ảnh, chữ, logo đều có thể in được với công nghệ hiện đại. 
                    Dịch vụ <strong>in ấn</strong> của chúng tôi đảm bảo độ bền màu cao, không phai màu theo thời gian. 
                    Tất cả sản phẩm <strong>quà tặng quảng cáo</strong> đều được <strong>in logo</strong> với công nghệ hiện đại, giúp doanh nghiệp quảng bá thương hiệu một cách hiệu quả. 
                    Chúng tôi cam kết mang đến cho khách hàng những sản phẩm <strong>quà tặng doanh nghiệp</strong> tốt nhất với giá cả cạnh tranh nhất thị trường.
                </p>
                
                <p>
                    <strong>Xưởng in đà nẵng</strong>, <strong>in logo đà nẵng</strong>, <strong>in ấn đà nẵng</strong>, <strong>quà tặng quảng bá thương hiệu</strong>, 
                    <strong>in thương hiệu</strong>, <strong>in logo lên sản phẩm</strong>, <strong>dịch vụ in ấn</strong>, <strong>thiết kế quà tặng miễn phí</strong>.
                </p>
            </div>
            
            <div className="mt-6">
                <ProductSection 
                    title="SẢN PHẨM MỚI" 
                    products={newProducts}
                    showNewOnly={true}
                />
                <ProductSection 
                    title="LY THỦY TINH IN LOGO" 
                    products={glassProducts}
                    categorySlug="ly-thuy-tinh"
                />
                <PromoBanners />
                <ProductSection 
                    title="QUÀ TẶNG DOANH NGHIỆP" 
                    products={giftProducts}
                    // No specific category - could be multiple categories
                />
                <NewsSection />
            </div>
        </>
    );
}

export default HomePage;