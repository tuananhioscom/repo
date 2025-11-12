import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PartnerLogos from './components/PartnerLogos';
import ReviewsSection from './components/ReviewsSection';
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
    } else if (page === 'policies') {
      setCurrentPage('CHÍNH SÁCH MUA HÀNG');
    } else if (page === 'return') {
      setCurrentPage('CHÍNH SÁCH ĐỔI TRẢ');
    } else if (page === 'shipping') {
      setCurrentPage('GIAO HÀNG');
    } else if (page === 'payment') {
      setCurrentPage('THANH TOÁN');
    } else if (page === 'account') {
      setCurrentPage('TÀI KHOẢN');
    } else if (page === 'about') {
      setCurrentPage('GIỚI THIỆU');
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
        return <StaticPage 
          title="Giới thiệu"
          metaTitle="Giới Thiệu - Xưởng In Đà Nẵng TGP | Chuyên Dịch Vụ In Ấn, In Logo & Quà Tặng Doanh Nghiệp"
          metaDescription="Xưởng In Đà Nẵng TGP - Công ty TNHH Tam Giang Phát chuyên dịch vụ in ấn, in logo theo yêu cầu và cung ứng quà tặng quảng cáo, quà tặng doanh nghiệp. Thiết kế miễn phí, freeship toàn quốc."
          keywords="giới thiệu xưởng in đà nẵng, công ty in ấn đà nẵng, dịch vụ in logo đà nẵng, quà tặng doanh nghiệp đà nẵng, in ấn chuyên nghiệp"
        >
          <p className="mb-4 text-lg">
            Chúng tôi là đơn vị chuyên nghiệp trong lĩnh vực <strong>in ấn</strong>, <strong>in logo</strong> và cung ứng <strong>quà tặng doanh nghiệp</strong> tại Đà Nẵng. 
            Với nhiều năm kinh nghiệm trong dịch vụ in ấn và sản xuất quà tặng, chúng tôi tự hào mang đến cho khách hàng những sản phẩm chất lượng cao, giá cả cạnh tranh.
          </p>
          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">Dịch vụ in ấn và quà tặng quảng cáo của chúng tôi:</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>In logo theo yêu cầu</strong> lên ly thủy tinh, cốc sứ, bình giữ nhiệt với công nghệ hiện đại</li>
            <li>Sản xuất <strong>quà tặng quảng cáo</strong>, <strong>quà tặng doanh nghiệp</strong>: <strong>mũ bảo hiểm quảng cáo</strong>, <strong>áo mưa quà tặng</strong>, ô dù, túi canvas</li>
            <li>Cung cấp <strong>quà tặng khách hàng</strong>, <strong>quà tặng nhân viên</strong>, <strong>quà tặng đối tác</strong>, <strong>quà tặng đại hội</strong>, <strong>quà tặng văn phòng</strong></li>
            <li>Thiết kế miễn phí và <strong>in ấn</strong> theo yêu cầu riêng của doanh nghiệp</li>
            <li>Tư vấn giải pháp quà tặng phù hợp với ngân sách và mục tiêu marketing</li>
            <li>Dịch vụ <strong>in logo</strong> chuyên nghiệp, độ bền màu cao, đảm bảo chất lượng</li>
            <li>Freeship toàn quốc, giá tận xưởng, không qua trung gian</li>
          </ul>
          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">Tại sao chọn dịch vụ in ấn của chúng tôi?</h2>
          <p className="mb-4">
            Chúng tôi hiểu rằng <strong>quà tặng doanh nghiệp</strong> không chỉ là món quà, mà còn là <strong>"sứ giả"</strong> truyền đạt giá trị thương hiệu của bạn. 
            Với dịch vụ <strong>in logo</strong> chuyên nghiệp, chúng tôi giúp <strong>thương hiệu in sâu vào tâm trí khách hàng</strong> một cách tinh tế và hiệu quả.
          </p>
          <p className="mb-4">
            Tất cả sản phẩm của chúng tôi đều được <strong>in ấn</strong> với công nghệ hiện đại, đảm bảo độ bền màu và chất lượng cao. 
            Chúng tôi cam kết mang đến cho khách hàng những sản phẩm <strong>quà tặng doanh nghiệp</strong> tốt nhất với giá cả cạnh tranh nhất thị trường.
          </p>
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
      case 'CHÍNH SÁCH MUA HÀNG':
        return <StaticPage 
          title="Chính sách mua hàng"
          metaTitle="Chính Sách Mua Hàng - Xưởng In Đà Nẵng TGP"
          metaDescription="Chính sách mua hàng tại Xưởng In Đà Nẵng TGP. Quy định về đặt hàng, thanh toán, giao hàng và bảo hành sản phẩm in ấn, quà tặng doanh nghiệp."
          keywords="chính sách mua hàng, quy định đặt hàng in ấn, bảo hành in logo, chính sách quà tặng doanh nghiệp"
        >
          <h2 className="text-xl font-bold mb-3 mt-4 text-gray-900">1. Quy Định Đặt Hàng</h2>
          <p className="mb-3">
            Khách hàng có thể đặt hàng <strong>quà tặng doanh nghiệp</strong>, <strong>in logo</strong> thông qua các kênh:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Website: Đặt hàng trực tuyến 24/7</li>
            <li>Hotline: <strong>0935.444.945</strong> (8:00 - 17:00 hàng ngày)</li>
            <li>Email: <strong>xuongindanang09@gmail.com</strong></li>
            <li>Trực tiếp tại cửa hàng: <strong>126-128 Quách Xân, Phường Hòa Khánh, TP Đà Nẵng</strong></li>
          </ul>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">2. Xác Nhận Đơn Hàng</h2>
          <p className="mb-3">
            Sau khi nhận được đơn hàng, chúng tôi sẽ liên hệ xác nhận trong vòng <strong>24 giờ</strong> (trong giờ hành chính). 
            Đơn hàng chỉ được xử lý sau khi khách hàng xác nhận và thanh toán.
          </p>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">3. Thanh Toán</h2>
          <p className="mb-3">Chúng tôi chấp nhận các hình thức thanh toán:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Chuyển khoản ngân hàng (ưu tiên)</li>
            <li>Tiền mặt khi nhận hàng (COD) - Áp dụng cho đơn hàng trong nội thành Đà Nẵng</li>
            <li>Thanh toán trước 50% khi đặt hàng, 50% còn lại khi nhận hàng (cho đơn hàng lớn)</li>
          </ul>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">4. Thời Gian Sản Xuất</h2>
          <p className="mb-3">
            Thời gian sản xuất <strong>in logo</strong> và <strong>quà tặng doanh nghiệp</strong> phụ thuộc vào:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Số lượng sản phẩm</li>
            <li>Độ phức tạp của thiết kế <strong>in logo</strong></li>
            <li>Loại sản phẩm và công nghệ in</li>
          </ul>
          <p className="mb-3">
            Thông thường: <strong>3-7 ngày</strong> làm việc (không tính thứ 7, chủ nhật và ngày lễ).
          </p>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">5. Bảo Hành Sản Phẩm</h2>
          <p className="mb-3">
            Chúng tôi cam kết bảo hành chất lượng <strong>in logo</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Logo không bị phai màu trong vòng <strong>6 tháng</strong> sử dụng bình thường</li>
            <li>Đổi mới sản phẩm nếu lỗi do sản xuất trong vòng <strong>7 ngày</strong> kể từ ngày nhận hàng</li>
            <li>Hỗ trợ sửa chữa hoặc thay thế nếu sản phẩm bị lỗi kỹ thuật</li>
          </ul>
        </StaticPage>;
      case 'CHÍNH SÁCH ĐỔI TRẢ':
        return <StaticPage 
          title="Chính sách đổi trả"
          metaTitle="Chính Sách Đổi Trả - Xưởng In Đà Nẵng TGP"
          metaDescription="Chính sách đổi trả sản phẩm tại Xưởng In Đà Nẵng TGP. Quy định về đổi trả, hoàn tiền cho sản phẩm in ấn, quà tặng doanh nghiệp không đúng yêu cầu."
          keywords="chính sách đổi trả, hoàn tiền in ấn, đổi trả quà tặng doanh nghiệp, bảo hành sản phẩm in logo"
        >
          <h2 className="text-xl font-bold mb-3 mt-4 text-gray-900">1. Điều Kiện Đổi Trả</h2>
          <p className="mb-3">
            Khách hàng có quyền yêu cầu đổi trả sản phẩm <strong>in logo</strong>, <strong>quà tặng doanh nghiệp</strong> trong các trường hợp:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Sản phẩm không đúng với đơn hàng đã đặt</li>
            <li>Sản phẩm bị lỗi kỹ thuật, lỗi sản xuất (logo in sai, bị lệch, không rõ nét)</li>
            <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển</li>
            <li>Kích thước, màu sắc không đúng với yêu cầu đã thống nhất</li>
          </ul>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">2. Thời Gian Đổi Trả</h2>
          <p className="mb-3">
            Yêu cầu đổi trả phải được thông báo trong vòng <strong>7 ngày</strong> kể từ ngày nhận hàng. 
            Sau thời hạn này, chúng tôi không chấp nhận đổi trả (trừ trường hợp lỗi do sản xuất).
          </p>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">3. Quy Trình Đổi Trả</h2>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Liên hệ hotline <strong>0935.444.945</strong> hoặc email <strong>xuongindanang09@gmail.com</strong> để thông báo</li>
            <li>Gửi hình ảnh sản phẩm lỗi để chúng tôi xác nhận</li>
            <li>Chúng tôi sẽ xác nhận và hướng dẫn gửi hàng về (chi phí vận chuyển do chúng tôi chịu nếu lỗi do sản xuất)</li>
            <li>Sau khi nhận được hàng và xác nhận lỗi, chúng tôi sẽ sản xuất lại hoặc hoàn tiền</li>
          </ol>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">4. Trường Hợp Không Được Đổi Trả</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Sản phẩm đã qua sử dụng, có dấu hiệu hư hỏng do người dùng</li>
            <li>Khách hàng thay đổi ý định sau khi đã xác nhận đơn hàng</li>
            <li>Sản phẩm đã được tùy chỉnh theo yêu cầu riêng của khách hàng</li>
            <li>Quá thời hạn 7 ngày kể từ ngày nhận hàng</li>
          </ul>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">5. Hoàn Tiền</h2>
          <p className="mb-3">
            Trong trường hợp hoàn tiền, chúng tôi sẽ hoàn lại <strong>100%</strong> giá trị đơn hàng trong vòng <strong>3-5 ngày</strong> làm việc 
            (không tính thứ 7, chủ nhật và ngày lễ) sau khi xác nhận đổi trả.
          </p>
        </StaticPage>;
      case 'GIAO HÀNG':
        return <StaticPage 
          title="Chính sách giao hàng"
          metaTitle="Chính Sách Giao Hàng - Xưởng In Đà Nẵng TGP | Freeship Toàn Quốc"
          metaDescription="Chính sách giao hàng sản phẩm in ấn, quà tặng doanh nghiệp tại Xưởng In Đà Nẵng TGP. Freeship toàn quốc, giao hàng nhanh, đóng gói cẩn thận."
          keywords="chính sách giao hàng, freeship toàn quốc, giao hàng in ấn đà nẵng, vận chuyển quà tặng doanh nghiệp"
        >
          <h2 className="text-xl font-bold mb-3 mt-4 text-gray-900">1. Phạm Vi Giao Hàng</h2>
          <p className="mb-3">
            Chúng tôi giao hàng <strong>toàn quốc</strong> cho tất cả sản phẩm <strong>in logo</strong>, <strong>quà tặng doanh nghiệp</strong>.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Nội thành Đà Nẵng:</strong> Giao hàng miễn phí trong vòng 24-48 giờ</li>
            <li><strong>Toàn quốc:</strong> Freeship cho đơn hàng từ 500,000đ trở lên</li>
            <li><strong>Đơn hàng dưới 500,000đ:</strong> Phí ship 30,000đ - 50,000đ tùy khu vực</li>
          </ul>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">2. Thời Gian Giao Hàng</h2>
          <p className="mb-3">Thời gian giao hàng được tính từ khi đơn hàng được xác nhận và thanh toán:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Đà Nẵng:</strong> 1-2 ngày làm việc</li>
            <li><strong>Miền Trung:</strong> 2-3 ngày làm việc</li>
            <li><strong>Miền Bắc:</strong> 3-5 ngày làm việc</li>
            <li><strong>Miền Nam:</strong> 3-5 ngày làm việc</li>
            <li><strong>Vùng sâu, vùng xa:</strong> 5-7 ngày làm việc</li>
          </ul>
          <p className="mb-3 text-sm text-gray-600">
            * Lưu ý: Thời gian trên không bao gồm thời gian sản xuất <strong>in logo</strong>. 
            Vui lòng cộng thêm thời gian sản xuất (3-7 ngày) vào thời gian giao hàng.
          </p>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">3. Đóng Gói & Vận Chuyển</h2>
          <p className="mb-3">
            Tất cả sản phẩm <strong>quà tặng doanh nghiệp</strong> được đóng gói cẩn thận:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Bọc bong bóng, xốp chống sốc</li>
            <li>Hộp carton chắc chắn, phù hợp với kích thước sản phẩm</li>
            <li>Dán băng keo chắc chắn, có dán nhãn "Dễ vỡ - Xử lý cẩn thận"</li>
            <li>Đảm bảo sản phẩm không bị hư hỏng trong quá trình vận chuyển</li>
          </ul>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">4. Kiểm Tra Hàng Khi Nhận</h2>
          <p className="mb-3">
            Khi nhận hàng, vui lòng kiểm tra kỹ:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Số lượng sản phẩm có đúng với đơn hàng</li>
            <li>Chất lượng <strong>in logo</strong> có đúng yêu cầu</li>
            <li>Sản phẩm có bị hư hỏng, vỡ, trầy xước không</li>
            <li>Nếu có vấn đề, vui lòng từ chối nhận hàng và liên hệ ngay với chúng tôi</li>
          </ul>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">5. Đối Tác Vận Chuyển</h2>
          <p className="mb-3">
            Chúng tôi hợp tác với các đơn vị vận chuyển uy tín:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Viettel Post</li>
            <li>Giao hàng nhanh (GHN)</li>
            <li>Giao hàng tiết kiệm (GHTK)</li>
            <li>J&T Express</li>
          </ul>
        </StaticPage>;
      case 'THANH TOÁN':
        return <StaticPage 
          title="Chính sách thanh toán"
          metaTitle="Chính Sách Thanh Toán - Xưởng In Đà Nẵng TGP"
          metaDescription="Các phương thức thanh toán khi mua sản phẩm in ấn, quà tặng doanh nghiệp tại Xưởng In Đà Nẵng TGP. Chuyển khoản, COD, thanh toán trả góp."
          keywords="chính sách thanh toán, phương thức thanh toán in ấn, thanh toán quà tặng doanh nghiệp, chuyển khoản, COD"
        >
          <h2 className="text-xl font-bold mb-3 mt-4 text-gray-900">1. Phương Thức Thanh Toán</h2>
          <p className="mb-3">
            Chúng tôi chấp nhận các hình thức thanh toán sau cho đơn hàng <strong>in logo</strong>, <strong>quà tặng doanh nghiệp</strong>:
          </p>

          <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-800">1.1. Chuyển Khoản Ngân Hàng</h3>
          <p className="mb-3">Thông tin tài khoản:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Ngân hàng:</strong> [Tên ngân hàng]</li>
            <li><strong>Số tài khoản:</strong> [Số TK]</li>
            <li><strong>Chủ tài khoản:</strong> Công ty TNHH Tam Giang Phát</li>
            <li><strong>Nội dung chuyển khoản:</strong> [Mã đơn hàng] - [Tên khách hàng]</li>
          </ul>
          <p className="mb-3 text-sm text-gray-600">
            * Ưu đãi: Giảm thêm <strong>2%</strong> cho đơn hàng thanh toán chuyển khoản trước.
          </p>

          <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-800">1.2. Thanh Toán Khi Nhận Hàng (COD)</h3>
          <p className="mb-3">
            Áp dụng cho đơn hàng trong nội thành Đà Nẵng và một số khu vực lân cận.
            Phí COD: <strong>20,000đ - 30,000đ</strong> tùy giá trị đơn hàng.
          </p>

          <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-800">1.3. Thanh Toán Trả Góp</h3>
          <p className="mb-3">
            Áp dụng cho đơn hàng từ <strong>5,000,000đ</strong> trở lên:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Thanh toán <strong>50%</strong> khi đặt hàng</li>
            <li>Thanh toán <strong>50%</strong> còn lại khi nhận hàng</li>
            <li>Hoặc chia thành 2-3 lần thanh toán (liên hệ để thỏa thuận)</li>
          </ul>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">2. Quy Trình Thanh Toán</h2>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Khách hàng đặt hàng và nhận báo giá chi tiết</li>
            <li>Xác nhận đơn hàng và chọn phương thức thanh toán</li>
            <li>Thanh toán theo phương thức đã chọn</li>
            <li>Chúng tôi xác nhận thanh toán và bắt đầu sản xuất</li>
            <li>Giao hàng và hoàn tất thanh toán (nếu còn lại)</li>
          </ol>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">3. Xác Nhận Thanh Toán</h2>
          <p className="mb-3">
            Sau khi chuyển khoản, vui lòng gửi ảnh chụp màn hình hoặc biên lai đến:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Email: <strong>xuongindanang09@gmail.com</strong></li>
            <li>Hotline: <strong>0935.444.945</strong> (Zalo/Viber)</li>
          </ul>
          <p className="mb-3">
            Chúng tôi sẽ xác nhận trong vòng <strong>2 giờ</strong> (trong giờ hành chính) và bắt đầu sản xuất ngay.
          </p>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">4. Hoàn Tiền</h2>
          <p className="mb-3">
            Trong trường hợp hủy đơn hàng hoặc đổi trả, chúng tôi sẽ hoàn tiền trong vòng <strong>3-5 ngày</strong> làm việc 
            (không tính thứ 7, chủ nhật và ngày lễ) qua tài khoản ngân hàng của khách hàng.
          </p>
        </StaticPage>;
      case 'TÀI KHOẢN':
        return <StaticPage 
          title="Tài khoản"
          metaTitle="Quản Lý Tài Khoản - Xưởng In Đà Nẵng TGP"
          metaDescription="Hướng dẫn đăng ký, đăng nhập và quản lý tài khoản tại Xưởng In Đà Nẵng TGP. Theo dõi đơn hàng, lịch sử mua hàng in ấn, quà tặng doanh nghiệp."
          keywords="quản lý tài khoản, đăng ký tài khoản, theo dõi đơn hàng in ấn, lịch sử mua hàng quà tặng doanh nghiệp"
        >
          <h2 className="text-xl font-bold mb-3 mt-4 text-gray-900">1. Đăng Ký Tài Khoản</h2>
          <p className="mb-3">
            Đăng ký tài khoản để được hưởng nhiều ưu đãi khi mua <strong>quà tặng doanh nghiệp</strong>, <strong>in logo</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Nhận thông báo về sản phẩm mới, khuyến mãi</li>
            <li>Theo dõi đơn hàng dễ dàng</li>
            <li>Lưu địa chỉ giao hàng, thanh toán nhanh</li>
            <li>Tích điểm thưởng cho mỗi đơn hàng</li>
            <li>Ưu tiên hỗ trợ khách hàng VIP</li>
          </ul>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">2. Quản Lý Đơn Hàng</h2>
          <p className="mb-3">
            Với tài khoản, bạn có thể:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Xem lịch sử đơn hàng đã đặt</li>
            <li>Theo dõi trạng thái đơn hàng (Đang xử lý, Đang sản xuất, Đang giao hàng, Đã giao)</li>
            <li>In hóa đơn, phiếu giao hàng</li>
            <li>Đánh giá sản phẩm sau khi nhận hàng</li>
          </ul>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">3. Thông Tin Cá Nhân</h2>
          <p className="mb-3">
            Quản lý thông tin cá nhân:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Cập nhật họ tên, số điện thoại, email</li>
            <li>Thay đổi mật khẩu</li>
            <li>Quản lý địa chỉ giao hàng (thêm, sửa, xóa)</li>
            <li>Lưu phương thức thanh toán yêu thích</li>
          </ul>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">4. Bảo Mật Tài Khoản</h2>
          <p className="mb-3">
            Chúng tôi cam kết bảo mật thông tin khách hàng:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Mã hóa thông tin cá nhân</li>
            <li>Không chia sẻ thông tin cho bên thứ ba</li>
            <li>Tuân thủ Luật Bảo vệ Dữ liệu Cá nhân</li>
            <li>Khuyến khích khách hàng đặt mật khẩu mạnh</li>
          </ul>

          <h2 className="text-xl font-bold mb-3 mt-6 text-gray-900">5. Liên Hệ Hỗ Trợ</h2>
          <p className="mb-3">
            Nếu gặp vấn đề với tài khoản, vui lòng liên hệ:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Hotline: <strong>0935.444.945</strong></li>
            <li>Email: <strong>xuongindanang09@gmail.com</strong></li>
            <li>Thời gian hỗ trợ: 8:00 - 17:00 (Thứ 2 - Thứ 6)</li>
          </ul>
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
      {!isLoginPage && currentPage === 'TRANG CHỦ' && (
        <>
          <PartnerLogos />
          <ReviewsSection />
        </>
      )}
      {!isLoginPage && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;