import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import newsData from '../data/news.json';
import { logout, getCurrentUser } from '../utils/auth';

type Product = {
  id: string;
  name: string;
  image: string;
  oldPrice?: string;
  newPrice: string;
  discount?: number;
  isNew?: boolean;
  category: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  parent: string | null;
  order: number;
  icon: string;
};

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
};

interface AdminPageProps {
  onLogout: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'news'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(categoriesData.categories);
  const [news, setNews] = useState<NewsItem[]>(newsData.news);

  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formTab, setFormTab] = useState<'basic' | 'detail' | 'seo'>('basic');
  const [newsFormTab, setNewsFormTab] = useState<'basic' | 'content' | 'seo'>('basic');
  
  // Marquee Banner state
  const [marqueeText, setMarqueeText] = useState<string>('');
  const [isEditingMarquee, setIsEditingMarquee] = useState(false);
  
  // Content builder state for news
  const [contentBlocks, setContentBlocks] = useState<Array<{
    id: string;
    type: 'paragraph' | 'heading' | 'list' | 'image' | 'quote';
    content: string;
    listItems?: string[];
    level?: number; // for heading (2 or 3)
  }>>([]);

  const handleLogout = () => {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
      logout();
      onLogout();
    }
  };

  // Load Marquee Banner text
  useEffect(() => {
    const savedMarquee = localStorage.getItem('marquee_banner_text');
    if (savedMarquee) {
      setMarqueeText(savedMarquee);
    } else {
      // Default text
      setMarqueeText('🎉 Chào mừng đến với Xưởng In Đà Nẵng TGP - Chuyên dịch vụ in ấn, in logo & quà tặng doanh nghiệp | Thiết kế miễn phí | Freeship toàn quốc | Hotline: 0935.444.945');
    }
  }, []);

  // Load data from localStorage or use default
  useEffect(() => {
    // Try to load from localStorage first
    const savedProducts = localStorage.getItem('admin_products');
    const savedCategories = localStorage.getItem('admin_categories');
    const savedNews = localStorage.getItem('admin_news');

    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        // If parse fails, use default
        const allProducts = [
          ...productsData.newProducts,
          ...productsData.glassProducts,
          ...productsData.giftProducts
        ];
        setProducts(allProducts);
      }
    } else {
      // Combine all product arrays
      const allProducts = [
        ...productsData.newProducts,
        ...productsData.glassProducts,
        ...productsData.giftProducts
      ];
      setProducts(allProducts);
    }

    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (e) {
        setCategories(categoriesData.categories);
      }
    }

    if (savedNews) {
      try {
        setNews(JSON.parse(savedNews));
      } catch (e) {
        setNews(newsData.news);
      }
    }
  }, []);

  // Save to localStorage helper
  const saveToLocalStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('productsUpdated'));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa?')) return;

    if (activeTab === 'products') {
      const newProducts = products.filter(p => p.id !== id);
      setProducts(newProducts);
      saveToLocalStorage('admin_products', newProducts);
      alert('Đã xóa và lưu thành công!');
    } else if (activeTab === 'categories') {
      const newCategories = categories.filter(c => c.id !== id);
      setCategories(newCategories);
      saveToLocalStorage('admin_categories', newCategories);
      window.dispatchEvent(new CustomEvent('categoriesUpdated'));
      alert('Đã xóa và lưu thành công!');
    } else if (activeTab === 'news') {
      const newNews = news.filter(n => n.id !== id);
      setNews(newNews);
      saveToLocalStorage('admin_news', newNews);
      window.dispatchEvent(new CustomEvent('newsUpdated'));
      alert('Đã xóa và lưu thành công!');
    }
  };

  // Convert contentBlocks to HTML
  const convertBlocksToHTML = (blocks: typeof contentBlocks): string => {
    return blocks.map(block => {
      if (block.type === 'paragraph') {
        return `<p>${block.content}</p>`;
      } else if (block.type === 'heading') {
        return `<h${block.level || 2}>${block.content}</h${block.level || 2}>`;
      } else if (block.type === 'list') {
        const items = (block.listItems || []).map(item => `<li>${item}</li>`).join('');
        return `<ul>${items}</ul>`;
      } else if (block.type === 'image') {
        return `<img src="${block.content}" alt="" />`;
      }
      return '';
    }).join('\n');
  };

  // Parse HTML to contentBlocks (simple parser)
  const parseHTMLToBlocks = (html: string): typeof contentBlocks => {
    if (!html) return [];
    
    const blocks: typeof contentBlocks = [];
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    Array.from(tempDiv.children).forEach((el: any) => {
      if (el.tagName === 'P') {
        blocks.push({ id: Date.now().toString() + Math.random(), type: 'paragraph', content: el.textContent || '' });
      } else if (el.tagName === 'H2' || el.tagName === 'H3') {
        blocks.push({ id: Date.now().toString() + Math.random(), type: 'heading', content: el.textContent || '', level: parseInt(el.tagName[1]) });
      } else if (el.tagName === 'UL') {
        const items = Array.from(el.querySelectorAll('li')).map((li: any) => li.textContent || '');
        blocks.push({ id: Date.now().toString() + Math.random(), type: 'list', content: '', listItems: items });
      } else if (el.tagName === 'IMG') {
        blocks.push({ id: Date.now().toString() + Math.random(), type: 'image', content: el.src || '' });
      }
    });
    
    return blocks.length > 0 ? blocks : [{ id: Date.now().toString(), type: 'paragraph', content: html }];
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsAdding(false);
    if (activeTab === 'products') {
      setFormTab('basic'); // Reset to basic tab when editing
    } else if (activeTab === 'news') {
      setNewsFormTab('basic'); // Reset to basic tab when editing news
      // Parse existing content to blocks
      if (item.content) {
        setContentBlocks(parseHTMLToBlocks(item.content));
      } else {
        setContentBlocks([]);
      }
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    if (activeTab === 'products') {
      setEditingItem({
        id: `p${Date.now()}`,
        name: '',
        image: '',
        newPrice: '',
        category: categories[0]?.slug || ''
      });
    } else if (activeTab === 'categories') {
      setEditingItem({
        id: `cat${Date.now()}`,
        name: '',
        slug: '',
        parent: null,
        order: categories.length + 1,
        icon: '📦'
      });
    } else if (activeTab === 'news') {
      setEditingItem({
        id: `n${Date.now()}`,
        title: '',
        slug: '',
        image: '',
        category: 'Tin tức',
        date: new Date().toLocaleDateString('vi-VN'),
        excerpt: '',
        content: ''
      });
      setContentBlocks([]); // Reset content blocks when adding new
    }
  };

  const handleSave = () => {
    if (!editingItem) return;

    if (activeTab === 'products') {
      let newProducts: Product[];
      if (isAdding) {
        newProducts = [...products, editingItem];
      } else {
        newProducts = products.map(p => p.id === editingItem.id ? editingItem : p);
      }
      setProducts(newProducts);
      saveToLocalStorage('admin_products', newProducts);
      alert('Đã lưu thành công! Dữ liệu sẽ được giữ lại khi refresh trang.');
    } else if (activeTab === 'categories') {
      let newCategories: Category[];
      if (isAdding) {
        newCategories = [...categories, editingItem];
      } else {
        newCategories = categories.map(c => c.id === editingItem.id ? editingItem : c);
      }
      setCategories(newCategories);
      saveToLocalStorage('admin_categories', newCategories);
      window.dispatchEvent(new CustomEvent('categoriesUpdated'));
      alert('Đã lưu thành công! Dữ liệu sẽ được giữ lại khi refresh trang.');
    } else if (activeTab === 'news') {
      // Convert contentBlocks to HTML before saving
      const htmlContent = convertBlocksToHTML(contentBlocks);
      const itemToSave = { ...editingItem, content: htmlContent };
      
      let newNews: NewsItem[];
      if (isAdding) {
        newNews = [...news, itemToSave];
      } else {
        newNews = news.map(n => n.id === editingItem.id ? itemToSave : n);
      }
      setNews(newNews);
      saveToLocalStorage('admin_news', newNews);
      window.dispatchEvent(new CustomEvent('newsUpdated'));
      alert('Đã lưu thành công! Dữ liệu sẽ được giữ lại khi refresh trang.');
    }

    setEditingItem(null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
    setContentBlocks([]); // Reset content blocks when canceling
  };

  const handleReset = () => {
    if (!confirm('Bạn có chắc muốn reset về dữ liệu gốc? Tất cả thay đổi sẽ bị mất!')) return;

    // Reset products
    const allProducts = [
      ...productsData.newProducts,
      ...productsData.glassProducts,
      ...productsData.giftProducts
    ];
    setProducts(allProducts);
    localStorage.removeItem('admin_products');

    // Reset categories
    setCategories(categoriesData.categories);
    localStorage.removeItem('admin_categories');

    // Reset news
    setNews(newsData.news);
    localStorage.removeItem('admin_news');

    alert('Đã reset về dữ liệu gốc!');
  };

  const handleDownloadJSON = () => {
    let data: any;
    let filename: string;

    if (activeTab === 'products') {
      // Organize products back into their sections
      data = {
        newProducts: products.filter(p => p.isNew).slice(0, 6),
        glassProducts: products.filter(p => p.category === 'ly-thuy-tinh'),
        giftProducts: products.filter(p => !p.category.includes('thuy-tinh') && !p.category.includes('su'))
      };
      filename = 'products.json';
    } else if (activeTab === 'categories') {
      data = { categories };
      filename = 'categories.json';
    } else {
      data = { news };
      filename = 'news.json';
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderForm = () => {
    if (!editingItem) return null;

    if (activeTab === 'products') {
      const imagesList = editingItem.images ? (Array.isArray(editingItem.images) ? editingItem.images : [editingItem.images]) : [editingItem.image || ''];
      
      return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4 text-primary-blue">
            {isAdding ? 'Thêm Sản Phẩm' : 'Sửa Sản Phẩm'}
          </h3>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => setFormTab('basic')}
              className={`px-4 py-2 font-medium ${formTab === 'basic' ? 'border-b-2 border-primary-blue text-primary-blue' : 'text-gray-600'}`}
            >
              Thông tin cơ bản
            </button>
            <button
              onClick={() => setFormTab('detail')}
              className={`px-4 py-2 font-medium ${formTab === 'detail' ? 'border-b-2 border-primary-blue text-primary-blue' : 'text-gray-600'}`}
            >
              Chi tiết & Hình ảnh
            </button>
            <button
              onClick={() => setFormTab('seo')}
              className={`px-4 py-2 font-medium ${formTab === 'seo' ? 'border-b-2 border-primary-blue text-primary-blue' : 'text-gray-600'}`}
            >
              SEO
            </button>
          </div>

          {/* Basic Info Tab */}
          {formTab === 'basic' && (
            <div className="space-y-6">
              {/* Section 1: Thông tin cơ bản */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📦</span> Thông tin cơ bản sản phẩm
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Tên sản phẩm <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      value={editingItem.name || ''}
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                      placeholder="Ví dụ: Ly Thủy Tinh In Logo 350ml"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Tên sản phẩm sẽ hiển thị trên website</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Slug (Đường dẫn URL)
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      value={editingItem.slug || ''}
                      onChange={(e) => setEditingItem({...editingItem, slug: e.target.value})}
                      placeholder="ly-thuy-tinh-in-logo-350ml"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Để trống sẽ tự động tạo từ tên sản phẩm. Dùng dấu gạch ngang (-) thay khoảng trắng</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      URL hình ảnh chính <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      value={editingItem.image || ''}
                      onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Dán link hình ảnh từ internet hoặc upload lên hosting</p>
                  </div>
                </div>
              </div>

              {/* Section 2: Giá cả */}
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💰</span> Thông tin giá cả
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Giá cũ (không bắt buộc)
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                      value={editingItem.oldPrice || ''}
                      onChange={(e) => setEditingItem({...editingItem, oldPrice: e.target.value})}
                      placeholder="45,000đ"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Giá gốc trước khi giảm (để hiển thị gạch ngang)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Giá mới <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                      value={editingItem.newPrice || ''}
                      onChange={(e) => setEditingItem({...editingItem, newPrice: e.target.value})}
                      placeholder="35,000đ"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Giá bán hiện tại của sản phẩm</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Phần trăm giảm giá (%)
                    </label>
                    <input
                      type="number"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                      value={editingItem.discount || ''}
                      onChange={(e) => setEditingItem({...editingItem, discount: parseInt(e.target.value) || undefined})}
                      placeholder="22"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Ví dụ: 22 = giảm 22%</p>
                  </div>
                </div>
              </div>

              {/* Section 3: Phân loại */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏷️</span> Phân loại sản phẩm
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Danh mục sản phẩm
                    </label>
                    <select
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                      value={editingItem.category || ''}
                      onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                    >
                      <option value="">-- Chọn danh mục --</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1.5">Chọn danh mục để sản phẩm hiển thị đúng vị trí</p>
                  </div>
                  <div className="flex items-center justify-center border-2 border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isNew"
                        checked={editingItem.isNew || false}
                        onChange={(e) => setEditingItem({...editingItem, isNew: e.target.checked})}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="isNew" className="text-sm font-semibold text-gray-700 cursor-pointer">
                        🆕 Đánh dấu là sản phẩm mới
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 ml-2">Sản phẩm mới sẽ hiển thị ở section "Sản phẩm mới"</p>
                  </div>
                </div>
              </div>

              {/* Section 4: Mô tả */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📝</span> Mô tả ngắn
                </h4>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Mô tả sản phẩm (tùy chọn)
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    rows={4}
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    placeholder="Mô tả ngắn gọn về sản phẩm, đặc điểm nổi bật..."
                  />
                  <p className="text-xs text-gray-500 mt-1.5">Mô tả này sẽ hiển thị ở trang danh sách và trang chi tiết sản phẩm</p>
                </div>
              </div>
            </div>
          )}

          {/* Detail & Images Tab */}
          {formTab === 'detail' && (
            <div className="space-y-6">
              {/* Section 1: Nội dung chi tiết */}
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📄</span> Nội dung chi tiết sản phẩm
                </h4>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Mô tả chi tiết (có thể dùng HTML)
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition font-mono text-sm"
                    rows={12}
                    value={editingItem.content || ''}
                    onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                    placeholder="<p>Mô tả chi tiết về sản phẩm...</p>&#10;<h2>Đặc điểm nổi bật</h2>&#10;<ul>&#10;  <li>Chất liệu cao cấp</li>&#10;  <li>Bền đẹp</li>&#10;</ul>"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    💡 <strong>Gợi ý:</strong> Có thể sử dụng HTML để định dạng (p, h2, h3, ul, li, strong, em, a, img...)
                  </p>
                </div>
              </div>
              
              {/* Section 2: Hình ảnh bổ sung */}
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🖼️</span> Hình ảnh bổ sung
                </h4>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Danh sách hình ảnh (mỗi URL một dòng)
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition font-mono text-sm"
                    rows={6}
                    value={imagesList.join('\n')}
                    onChange={(e) => {
                      const imageUrls = e.target.value.split('\n').filter(url => url.trim());
                      setEditingItem({
                        ...editingItem,
                        images: imageUrls.length > 0 ? imageUrls : undefined
                      });
                    }}
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    💡 <strong>Lưu ý:</strong> Mỗi URL một dòng. Hình ảnh sẽ hiển thị trong gallery ở trang chi tiết sản phẩm
                  </p>
                </div>
              </div>

              {/* Section 3: Thông số kỹ thuật */}
              <div className="border-l-4 border-teal-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>⚙️</span> Thông số kỹ thuật
                </h4>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Thông số (định dạng JSON)
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition font-mono text-xs"
                    rows={8}
                    value={editingItem.specifications ? JSON.stringify(editingItem.specifications, null, 2) : '{\n  "Chất liệu": "",\n  "Kích thước": "",\n  "Trọng lượng": ""\n}'}
                    onChange={(e) => {
                      try {
                        const specs = JSON.parse(e.target.value);
                        setEditingItem({...editingItem, specifications: specs});
                      } catch (e) {
                        // Invalid JSON, keep as is
                      }
                    }}
                    placeholder='{\n  "Chất liệu": "Thủy tinh",\n  "Kích thước": "350ml",\n  "Trọng lượng": "200g"\n}'
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    💡 <strong>Ví dụ:</strong> {`{"Chất liệu": "Thủy tinh", "Kích thước": "350ml", "Màu sắc": "Trong suốt"}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {formTab === 'seo' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>💡 Lưu ý về SEO:</strong> Các thông tin này giúp sản phẩm của bạn xuất hiện tốt hơn trên Google. Nếu để trống, hệ thống sẽ tự động tạo từ thông tin sản phẩm.
                </p>
              </div>

              {/* Section 1: Meta Title */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🔍</span> Meta Title (Tiêu đề SEO)
                </h4>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Tiêu đề hiển thị trên Google
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition"
                    value={editingItem.metaTitle || ''}
                    onChange={(e) => setEditingItem({...editingItem, metaTitle: e.target.value})}
                    placeholder="Ly Thủy Tinh In Logo 350ml - Xưởng In Đà Nẵng TGP"
                    maxLength={60}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-xs text-gray-500">
                      💡 Độ dài tối ưu: 50-60 ký tự. Tiêu đề này sẽ hiển thị trên kết quả tìm kiếm Google
                    </p>
                    <span className="text-xs font-medium text-gray-600">
                      {(editingItem.metaTitle || '').length}/60
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Meta Description */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📋</span> Meta Description (Mô tả SEO)
                </h4>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Mô tả hiển thị trên Google
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition"
                    rows={4}
                    value={editingItem.metaDescription || ''}
                    onChange={(e) => setEditingItem({...editingItem, metaDescription: e.target.value})}
                    placeholder="Sản phẩm ly thủy tinh in logo cao cấp, chất lượng tốt, giá cả hợp lý. Phù hợp làm quà tặng doanh nghiệp..."
                    maxLength={160}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-xs text-gray-500">
                      💡 Độ dài tối ưu: 150-160 ký tự. Mô tả này sẽ hiển thị dưới tiêu đề trên Google
                    </p>
                    <span className="text-xs font-medium text-gray-600">
                      {(editingItem.metaDescription || '').length}/160
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 3: Keywords */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏷️</span> Keywords (Từ khóa)
                </h4>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Từ khóa tìm kiếm (phân cách bằng dấu phẩy)
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition"
                    value={editingItem.keywords || ''}
                    onChange={(e) => setEditingItem({...editingItem, keywords: e.target.value})}
                    placeholder="ly thủy tinh, in logo, quà tặng doanh nghiệp, xưởng in đà nẵng"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    💡 Nhập các từ khóa liên quan đến sản phẩm, phân cách bằng dấu phẩy. Ví dụ: "ly thủy tinh, in logo, quà tặng"
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-2">
            <button onClick={handleSave} className="bg-primary-blue text-white px-6 py-2 rounded hover:bg-primary-blue-dark">
              Lưu
            </button>
            <button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">
              Hủy
            </button>
          </div>
        </div>
      );
    } else if (activeTab === 'categories') {
      return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4 text-primary-blue">
            {isAdding ? 'Thêm Danh Mục' : 'Sửa Danh Mục'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tên danh mục</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={editingItem.name}
                onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={editingItem.slug}
                onChange={(e) => setEditingItem({...editingItem, slug: e.target.value})}
                placeholder="ly-thuy-tinh"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Danh mục cha</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={editingItem.parent || ''}
                onChange={(e) => setEditingItem({...editingItem, parent: e.target.value || null})}
              >
                <option value="">-- Không có (danh mục gốc) --</option>
                {categories.filter(c => c.id !== editingItem.id).map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Thứ tự</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                value={editingItem.order}
                onChange={(e) => setEditingItem({...editingItem, order: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Icon (emoji)</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={editingItem.icon}
                onChange={(e) => setEditingItem({...editingItem, icon: e.target.value})}
                placeholder="🥃"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={handleSave} className="bg-primary-blue text-white px-6 py-2 rounded hover:bg-primary-blue-dark">
              Lưu
            </button>
            <button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">
              Hủy
            </button>
          </div>
        </div>
      );
    } else if (activeTab === 'news') {
      return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4 text-primary-blue">
            {isAdding ? 'Thêm Tin Tức' : 'Sửa Tin Tức'}
          </h3>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => setNewsFormTab('basic')}
              className={`px-4 py-2 font-medium ${newsFormTab === 'basic' ? 'border-b-2 border-primary-blue text-primary-blue' : 'text-gray-600'}`}
            >
              Thông tin cơ bản
            </button>
            <button
              onClick={() => setNewsFormTab('content')}
              className={`px-4 py-2 font-medium ${newsFormTab === 'content' ? 'border-b-2 border-primary-blue text-primary-blue' : 'text-gray-600'}`}
            >
              Nội dung
            </button>
            <button
              onClick={() => setNewsFormTab('seo')}
              className={`px-4 py-2 font-medium ${newsFormTab === 'seo' ? 'border-b-2 border-primary-blue text-primary-blue' : 'text-gray-600'}`}
            >
              SEO
            </button>
          </div>

          {/* Basic Info Tab */}
          {newsFormTab === 'basic' && (
            <div className="space-y-6">
              {/* Section 1: Thông tin cơ bản */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📰</span> Thông tin cơ bản bài viết
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Tiêu đề bài viết <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                      placeholder="Ví dụ: Top 10 Mẫu Ly Thủy Tinh In Logo Đẹp Nhất 2024"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Tiêu đề sẽ hiển thị lớn ở đầu bài viết</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Slug (Đường dẫn URL)
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      value={editingItem.slug || ''}
                      onChange={(e) => setEditingItem({...editingItem, slug: e.target.value})}
                      placeholder="top-10-ly-thuy-tinh-in-logo-2024"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Để trống sẽ tự động tạo từ tiêu đề. Dùng dấu gạch ngang (-) thay khoảng trắng</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      URL hình ảnh đại diện <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      value={editingItem.image || ''}
                      onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Hình ảnh sẽ hiển thị ở đầu bài viết và trong danh sách tin tức</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Danh mục bài viết
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      value={editingItem.category || ''}
                      onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                      placeholder="Tin tức, Sản phẩm, Xu hướng..."
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Ví dụ: "Tin tức", "Sản phẩm", "Xu hướng"</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Ngày đăng bài
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      value={editingItem.date || ''}
                      onChange={(e) => setEditingItem({...editingItem, date: e.target.value})}
                      placeholder="15/01/2024"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Định dạng: DD/MM/YYYY (ví dụ: 15/01/2024)</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Mô tả ngắn (Excerpt)
                    </label>
                    <textarea
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      rows={4}
                      value={editingItem.excerpt || ''}
                      onChange={(e) => setEditingItem({...editingItem, excerpt: e.target.value})}
                      placeholder="Mô tả ngắn gọn về bài viết, tóm tắt nội dung chính..."
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Mô tả này sẽ hiển thị ở trang danh sách tin tức và đầu bài viết</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {newsFormTab === 'content' && (
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>📝</span> Nội dung chi tiết bài viết
                  </h4>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newBlock = { id: Date.now().toString(), type: 'paragraph' as const, content: '' };
                        setContentBlocks([...contentBlocks, newBlock]);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
                    >
                      + Đoạn văn
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const newBlock = { id: Date.now().toString(), type: 'heading' as const, content: '', level: 2 };
                        setContentBlocks([...contentBlocks, newBlock]);
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition"
                    >
                      + Tiêu đề
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const newBlock = { id: Date.now().toString(), type: 'list' as const, content: '', listItems: [''] };
                        setContentBlocks([...contentBlocks, newBlock]);
                      }}
                      className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600 transition"
                    >
                      + Danh sách
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const newBlock = { id: Date.now().toString(), type: 'image' as const, content: '' };
                        setContentBlocks([...contentBlocks, newBlock]);
                      }}
                      className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-600 transition"
                    >
                      + Hình ảnh
                    </button>
                  </div>
                </div>

                {contentBlocks.length === 0 ? (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-gray-500 mb-2">Chưa có nội dung nào</p>
                    <p className="text-sm text-gray-400">Nhấn các nút phía trên để thêm phần tử nội dung</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contentBlocks.map((block, index) => (
                      <div key={block.id} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-gray-600 bg-white px-2 py-1 rounded">
                            {block.type === 'paragraph' && '📄 Đoạn văn'}
                            {block.type === 'heading' && `📌 Tiêu đề ${block.level === 2 ? 'lớn' : 'nhỏ'}`}
                            {block.type === 'list' && '📋 Danh sách'}
                            {block.type === 'image' && '🖼️ Hình ảnh'}
                            {block.type === 'quote' && '💬 Trích dẫn'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const newBlocks = contentBlocks.filter(b => b.id !== block.id);
                              setContentBlocks(newBlocks);
                            }}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            ✕ Xóa
                          </button>
                        </div>

                        {block.type === 'paragraph' && (
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              Nội dung đoạn văn
                            </label>
                            <textarea
                              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                              rows={4}
                              value={block.content}
                              onChange={(e) => {
                                const newBlocks = [...contentBlocks];
                                newBlocks[index].content = e.target.value;
                                setContentBlocks(newBlocks);
                              }}
                              placeholder="Nhập nội dung đoạn văn..."
                            />
                          </div>
                        )}

                        {block.type === 'heading' && (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-700">
                                Cấp độ tiêu đề
                              </label>
                              <select
                                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                                value={block.level || 2}
                                onChange={(e) => {
                                  const newBlocks = [...contentBlocks];
                                  newBlocks[index].level = parseInt(e.target.value);
                                  setContentBlocks(newBlocks);
                                }}
                              >
                                <option value={2}>Tiêu đề lớn (H2)</option>
                                <option value={3}>Tiêu đề nhỏ (H3)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-700">
                                Nội dung tiêu đề
                              </label>
                              <input
                                type="text"
                                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                                value={block.content}
                                onChange={(e) => {
                                  const newBlocks = [...contentBlocks];
                                  newBlocks[index].content = e.target.value;
                                  setContentBlocks(newBlocks);
                                }}
                                placeholder="Nhập tiêu đề..."
                              />
                            </div>
                          </div>
                        )}

                        {block.type === 'list' && (
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              Các mục trong danh sách (mỗi dòng một mục)
                            </label>
                            <textarea
                              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                              rows={6}
                              value={(block.listItems || []).join('\n')}
                              onChange={(e) => {
                                const newBlocks = [...contentBlocks];
                                newBlocks[index].listItems = e.target.value.split('\n').filter(item => item.trim());
                                setContentBlocks(newBlocks);
                              }}
                              placeholder="Mục 1&#10;Mục 2&#10;Mục 3"
                            />
                            <p className="text-xs text-gray-500 mt-1.5">Mỗi dòng là một mục trong danh sách</p>
                          </div>
                        )}

                        {block.type === 'image' && (
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              URL hình ảnh
                            </label>
                            <input
                              type="text"
                              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
                              value={block.content}
                              onChange={(e) => {
                                const newBlocks = [...contentBlocks];
                                newBlocks[index].content = e.target.value;
                                setContentBlocks(newBlocks);
                              }}
                              placeholder="https://example.com/image.jpg"
                            />
                            {block.content && (
                              <div className="mt-3">
                                <img src={block.content} alt="Preview" className="max-w-full h-auto rounded-lg border border-gray-300" onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }} />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Hướng dẫn:</strong> Thêm các phần tử nội dung bằng các nút phía trên. Bạn có thể sắp xếp lại thứ tự bằng cách xóa và thêm lại.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {newsFormTab === 'seo' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>💡 Lưu ý về SEO:</strong> Các thông tin này giúp bài viết của bạn xuất hiện tốt hơn trên Google. Nếu để trống, hệ thống sẽ tự động tạo từ thông tin bài viết.
                </p>
              </div>

              {/* Section 1: Meta Title */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🔍</span> Meta Title (Tiêu đề SEO)
                </h4>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Tiêu đề hiển thị trên Google
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition"
                    value={editingItem.metaTitle || ''}
                    onChange={(e) => setEditingItem({...editingItem, metaTitle: e.target.value})}
                    placeholder="Top 10 Mẫu Ly Thủy Tinh In Logo 2024 - Xưởng In Đà Nẵng TGP"
                    maxLength={60}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-xs text-gray-500">
                      💡 Độ dài tối ưu: 50-60 ký tự. Tiêu đề này sẽ hiển thị trên kết quả tìm kiếm Google
                    </p>
                    <span className="text-xs font-medium text-gray-600">
                      {(editingItem.metaTitle || '').length}/60
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Meta Description */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📋</span> Meta Description (Mô tả SEO)
                </h4>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Mô tả hiển thị trên Google
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition"
                    rows={4}
                    value={editingItem.metaDescription || ''}
                    onChange={(e) => setEditingItem({...editingItem, metaDescription: e.target.value})}
                    placeholder="Khám phá 10 mẫu ly thủy tinh in logo được yêu thích nhất năm 2024. Chất lượng cao, giá cả hợp lý, phù hợp làm quà tặng doanh nghiệp..."
                    maxLength={160}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-xs text-gray-500">
                      💡 Độ dài tối ưu: 150-160 ký tự. Mô tả này sẽ hiển thị dưới tiêu đề trên Google
                    </p>
                    <span className="text-xs font-medium text-gray-600">
                      {(editingItem.metaDescription || '').length}/160
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 3: Keywords */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏷️</span> Keywords (Từ khóa)
                </h4>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Từ khóa tìm kiếm (phân cách bằng dấu phẩy)
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition"
                    value={editingItem.keywords || ''}
                    onChange={(e) => setEditingItem({...editingItem, keywords: e.target.value})}
                    placeholder="ly thủy tinh, in logo, quà tặng doanh nghiệp, tin tức"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    💡 Nhập các từ khóa liên quan đến bài viết, phân cách bằng dấu phẩy. Ví dụ: "ly thủy tinh, in logo, tin tức"
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-2">
            <button onClick={handleSave} className="bg-primary-blue text-white px-6 py-2 rounded hover:bg-primary-blue-dark">
              Lưu
            </button>
            <button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">
              Hủy
            </button>
          </div>
        </div>
      );
    }
  };

  const renderTable = () => {
    if (activeTab === 'products') {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Tên</th>
                <th className="px-4 py-3 text-left">Hình ảnh</th>
                <th className="px-4 py-3 text-left">Giá</th>
                <th className="px-4 py-3 text-left">Danh mục</th>
                <th className="px-4 py-3 text-left">Mới</th>
                <th className="px-4 py-3 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{product.id}</td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">
                    <img src={product.image} alt="" className="h-10 w-10 object-cover rounded" />
                  </td>
                  <td className="px-4 py-3">
                    {product.oldPrice && <span className="line-through text-gray-400 mr-2">{product.oldPrice}</span>}
                    <span className="font-bold text-primary-orange">{product.newPrice}</span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">
                    {product.isNew ? (
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Mới
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'categories') {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Icon</th>
                <th className="px-4 py-3 text-left">Tên</th>
                <th className="px-4 py-3 text-left">Slug</th>
                <th className="px-4 py-3 text-left">Danh mục cha</th>
                <th className="px-4 py-3 text-left">Thứ tự</th>
                <th className="px-4 py-3 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {categories.sort((a, b) => a.order - b.order).map((category) => {
                const parentCat = categories.find(c => c.id === category.parent);
                return (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{category.id}</td>
                    <td className="px-4 py-3 text-2xl">{category.icon}</td>
                    <td className="px-4 py-3">{category.name}</td>
                    <td className="px-4 py-3">{category.slug}</td>
                    <td className="px-4 py-3">{parentCat ? parentCat.name : '-'}</td>
                    <td className="px-4 py-3">{category.order}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:underline mr-3"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:underline"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'news') {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Tiêu đề</th>
                <th className="px-4 py-3 text-left">Hình ảnh</th>
                <th className="px-4 py-3 text-left">Danh mục</th>
                <th className="px-4 py-3 text-left">Ngày</th>
                <th className="px-4 py-3 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">
                    <img src={item.image} alt="" className="h-10 w-16 object-cover rounded" />
                  </td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-blue mb-2">Quản Trị Nội Dung</h1>
              <p className="text-sm text-gray-500">
                Đăng nhập bởi: <strong>{getCurrentUser() || 'Admin'}</strong>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
            >
              🚪 Đăng Xuất
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            Trang quản lý sản phẩm, danh mục và tin tức. <strong className="text-green-600">Dữ liệu được tự động lưu vào trình duyệt</strong> và sẽ giữ lại khi refresh trang. Nhấn "Tải JSON" để xuất file và thay thế vào thư mục /data nếu cần.
          </p>

          {/* Marquee Banner Management */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-primary-blue p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <span className="mr-2">📢</span> Quản Lý Dòng Chạy Quảng Cáo (Marquee Banner)
              </h3>
              <button
                onClick={() => setIsEditingMarquee(!isEditingMarquee)}
                className={`px-4 py-2 rounded text-sm font-semibold ${
                  isEditingMarquee 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'bg-primary-blue text-white hover:bg-primary-blue-dark'
                }`}
              >
                {isEditingMarquee ? '✕ Hủy' : '✏️ Chỉnh Sửa'}
              </button>
            </div>
            
            {isEditingMarquee ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nội dung dòng chạy quảng cáo:
                  </label>
                  <textarea
                    value={marqueeText}
                    onChange={(e) => setMarqueeText(e.target.value)}
                    placeholder="Nhập nội dung quảng cáo sẽ chạy ngang trên trang chủ..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-y min-h-[100px]"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Mẹo: Sử dụng emoji (🎉, 🔥, ⭐) và ký tự "|" hoặc "•" để phân cách các thông tin. Ví dụ: "🎉 Khuyến mãi | Freeship | Hotline: 0935.444.945"
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      localStorage.setItem('marquee_banner_text', marqueeText);
                      window.dispatchEvent(new Event('marqueeUpdated'));
                      setIsEditingMarquee(false);
                      alert('✅ Đã lưu dòng chạy quảng cáo thành công!');
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold"
                  >
                    💾 Lưu
                  </button>
                  <button
                    onClick={() => {
                      setMarqueeText('🎉 Chào mừng đến với Xưởng In Đà Nẵng TGP - Chuyên dịch vụ in ấn, in logo & quà tặng doanh nghiệp | Thiết kế miễn phí | Freeship toàn quốc | Hotline: 0935.444.945');
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-semibold"
                  >
                    🔄 Đặt lại mặc định
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Nội dung hiện tại:</p>
                <p className="text-base font-medium text-gray-800 bg-blue-50 p-2 rounded">
                  {marqueeText || '(Chưa có nội dung)'}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-2 rounded ${activeTab === 'products' ? 'bg-primary-blue text-white' : 'bg-gray-200'}`}
            >
              Sản Phẩm ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-2 rounded ${activeTab === 'categories' ? 'bg-primary-blue text-white' : 'bg-gray-200'}`}
            >
              Danh Mục ({categories.length})
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-2 rounded ${activeTab === 'news' ? 'bg-primary-blue text-white' : 'bg-gray-200'}`}
            >
              Tin Tức ({news.length})
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-primary-orange text-white px-6 py-2 rounded hover:bg-primary-orange-dark"
            >
              + Thêm Mới
            </button>
            <button
              onClick={handleDownloadJSON}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              📥 Tải JSON
            </button>
            <button
              onClick={handleReset}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              🔄 Reset về dữ liệu gốc
            </button>
          </div>
        </div>

        {renderForm()}
        {renderTable()}
      </div>
    </div>
  );
};

export default AdminPage;
