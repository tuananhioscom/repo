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
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('TRANG CHỦ');

  const renderPage = () => {
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
        return <AdminPage />;
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
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;