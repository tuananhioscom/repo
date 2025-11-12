import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('TRANG CHỦ');

  const renderPage = () => {
    switch (currentPage) {
      case 'GIỚI THIỆU':
        return <StaticPage title="Giới thiệu">
          <p>Đây là Giới thiệu — toàn soạn có thể thay đổi, rút gọn giản dị một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho các ấn phẩm. Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để tạo thành một bản mẫu văn bản.</p>
          <br/>
          <p>Đoạn văn bản này không những đã tồn tại năm thế kỉ, mà còn được dùng khi các văn bản A-Z được thiết kế trình bày, nội dung của nó vẫn không hề thay đổi. Nó đã được phổ biến trong những năm 1960 với việc bán những bản giấy Letraset in những đoạn Lorem Ipsum, và gần đây hơn, được sử dụng trong các ứng dụng dàn trang, như Aldus PageMaker.</p>
        </StaticPage>;
      case 'SẢN PHẨM':
        return <ProductsPage />;
      case 'KHUYẾN MÃI':
        return <PromotionsPage />;
      case 'TIN TỨC':
        return <NewsListPage />;
      case 'LIÊN HỆ':
        return <ContactPage />;
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

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header onNavigate={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4">
        {renderPage()}
      </main>
      {currentPage === 'TRANG CHỦ' && <PartnerLogos />}
      <Footer />
    </div>
  );
};

export default App;