import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PartnerLogos from './components/PartnerLogos';
import Footer from './components/Footer';

// Page Components
import HomePage from './pages/HomePage';
import StaticPage from './pages/StaticPage';
import ProductsPage from './pages/ProductsPage';
import PromotionsPage from './pages/PromotionsPage';
import NewsListPage from './pages/NewsListPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NewsDetailPage from './pages/NewsDetailPage';
import { isAuthenticated } from './utils/auth';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('TRANG CHỦ');
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [selectedNewsSlug, setSelectedNewsSlug] = useState<string | null>(null);

  // Check authentication on mount and when page changes
  useEffect(() => {
    if (currentPage === 'ADMIN') {
      setIsLoggedIn(isAuthenticated());
    }
  }, [currentPage]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('TRANG CHỦ');
  };

  // Handle navigation - clear URL params and reset detail page states
  const handleNavigate = (page: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    // If navigating to products page and category exists, keep it
    if (page === 'SẢN PHẨM' && category) {
      // Keep category param
      window.history.pushState({}, '', `${window.location.pathname}?category=${category}`);
    } else {
      // Clear URL params for other pages
      window.history.pushState({}, '', window.location.pathname);
    }
    
    // Reset detail page states
    setSelectedProductId(null);
    setSelectedProductSlug(null);
    setSelectedNewsId(null);
    setSelectedNewsSlug(null);
    
    // Set new page
    setCurrentPage(page);
  };

  // Handle product and news detail navigation from URL (only on mount and URL changes)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    const productSlug = urlParams.get('slug');
    const newsId = urlParams.get('news');
    const newsSlug = urlParams.get('newsSlug');
    const category = urlParams.get('category');
    const page = urlParams.get('page');
    const newFilter = urlParams.get('new');
    
    // If category is selected, go to products page
    if (category) {
      setCurrentPage('SẢN PHẨM');
      // Don't reset detail states, just set page
    } else if (page === 'products' || newFilter === 'true') {
      setCurrentPage('SẢN PHẨM');
    } else if (page === 'news') {
      setCurrentPage('TIN TỨC');
    } else if (productId || productSlug) {
      setCurrentPage('PRODUCT_DETAIL');
      setSelectedProductId(productId);
      setSelectedProductSlug(productSlug);
    } else if (newsId || newsSlug) {
      setCurrentPage('NEWS_DETAIL');
      setSelectedNewsId(newsId);
      setSelectedNewsSlug(newsSlug);
    }
    // If no params, don't change anything - let handleNavigate handle it
  }, []); // Only run on mount

  const renderPage = () => {
    // Product Detail Page
    if (currentPage === 'PRODUCT_DETAIL' || selectedProductId || selectedProductSlug) {
      return (
        <ProductDetailPage
          productId={selectedProductId || undefined}
          productSlug={selectedProductSlug || undefined}
        />
      );
    }

    // News Detail Page
    if (currentPage === 'NEWS_DETAIL' || selectedNewsId || selectedNewsSlug) {
      return (
        <NewsDetailPage
          newsId={selectedNewsId || undefined}
          newsSlug={selectedNewsSlug || undefined}
        />
      );
    }

    switch (currentPage) {
      case 'GIỚI THIỆU':
        return <StaticPage title="Giới thiệu">
          <h3 className="text-xl font-bold mb-4 text-primary-blue">Xưởng In Đà Nẵng TGP - Công ty TNHH Tam Giang Phát</h3>
          <p className="mb-4">Chúng tôi chuyên <strong>thiết kế, sản xuất và cung ứng quà tặng quảng bá thương hiệu</strong> cho doanh nghiệp. Với nhiều năm kinh nghiệm trong lĩnh vực in ấn và sản xuất quà tặng, chúng tôi tự hào mang đến cho khách hàng những sản phẩm chất lượng cao, giá cả cạnh tranh.</p>
          <br/>
          <h4 className="text-lg font-semibold mb-3">Dịch vụ của chúng tôi:</h4>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>In logo lên ly thủy tinh, cốc sứ, bình giữ nhiệt</li>
            <li>Sản xuất quà tặng doanh nghiệp: áo mưa, mũ bảo hiểm, ô dù</li>
            <li>Thiết kế và in ấn theo yêu cầu</li>
            <li>Tư vấn giải pháp quà tặng phù hợp với ngân sách</li>
          </ul>
          <p>Quà tặng không chỉ là món quà, mà còn là <strong>"sứ giả"</strong> truyền đạt giá trị thương hiệu của bạn, giúp <strong>thương hiệu in sâu vào tâm trí khách hàng</strong> một cách tinh tế và hiệu quả.</p>
        </StaticPage>;
      case 'SẢN PHẨM':
        return <ProductsPage />;
      case 'IN THƯƠNG HIỆU':
        return <PromotionsPage />;
      case 'TIN TỨC':
        return <NewsListPage />;
      case 'LIÊN HỆ':
        return <ContactPage />;
      case 'ADMIN':
        // Check authentication before showing admin page
        if (!isLoggedIn) {
          return <LoginPage onLoginSuccess={handleLoginSuccess} />;
        }
        return <AdminPage onLogout={handleLogout} />;
      case 'Chính sách mua hàng':
        return <StaticPage title="Chính sách mua hàng">
          <p>Đây là Chính sách mua hàng — toàn soạn có thể thay đổi, rút gọn giản dị một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho các ấn phẩm. Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để tạo thành một bản mẫu văn bản.</p>
          <br/>
          <p>Đoạn văn bản này không những đã tồn tại năm thế kỉ, mà còn được dùng khi các văn bản A-Z được thiết kế trình bày, nội dung của nó vẫn không hề thay đổi. Nó đã được phổ biến trong những năm 1960 với việc bán những bản giấy Letraset in những đoạn Lorem Ipsum, và gần đây hơn, được sử dụng trong các ứng dụng dàn trang, như Aldus PageMaker.</p>
        </StaticPage>;
      case 'Đổi trả':
        return <StaticPage title="Đổi trả">
          <p>Đây là Đổi trả — toàn soạn có thể thay đổi, rút gọn giản dị một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho các ấn phẩm. Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để tạo thành một bản mẫu văn bản.</p>
          <br/>
          <p>Đoạn văn bản này không những đã tồn tại năm thế kỉ, mà còn được dùng khi các văn bản A-Z được thiết kế trình bày, nội dung của nó vẫn không hề thay đổi. Nó đã được phổ biến trong những năm 1960 với việc bán những bản giấy Letraset in những đoạn Lorem Ipsum, và gần đây hơn, được sử dụng trong các ứng dụng dàn trang, như Aldus PageMaker.</p>
        </StaticPage>;
      case 'TRANG CHỦ':
      default:
        return <HomePage />;
    }
  };

  // Don't show header/footer on login page
  const isLoginPage = currentPage === 'ADMIN' && !isLoggedIn;

  return (
    <div className="bg-gray-100 min-h-screen">
      {!isLoginPage && <Header onNavigate={handleNavigate} />}
      <main className={isLoginPage ? "" : "max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4"}>
        {renderPage()}
      </main>
      {!isLoginPage && currentPage === 'TRANG CHỦ' && <PartnerLogos />}
      {!isLoginPage && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;