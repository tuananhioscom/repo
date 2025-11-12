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

  const handleLogout = () => {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
      logout();
      onLogout();
    }
  };

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

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsAdding(false);
    if (activeTab === 'products') {
      setFormTab('basic'); // Reset to basic tab when editing
    } else if (activeTab === 'news') {
      setNewsFormTab('basic'); // Reset to basic tab when editing news
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
      let newNews: NewsItem[];
      if (isAdding) {
        newNews = [...news, editingItem];
      } else {
        newNews = news.map(n => n.id === editingItem.id ? editingItem : n);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên sản phẩm *</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug (URL-friendly)</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.slug || ''}
                  onChange={(e) => setEditingItem({...editingItem, slug: e.target.value})}
                  placeholder="ly-thuy-tinh-in-logo"
                />
                <p className="text-xs text-gray-500 mt-1">Để trống sẽ tự động tạo từ tên sản phẩm</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL hình ảnh chính *</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.image || ''}
                  onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Giá cũ (optional)</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.oldPrice || ''}
                  onChange={(e) => setEditingItem({...editingItem, oldPrice: e.target.value})}
                  placeholder="45,000đ"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Giá mới *</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.newPrice || ''}
                  onChange={(e) => setEditingItem({...editingItem, newPrice: e.target.value})}
                  placeholder="35,000đ"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Giảm giá (%)</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.discount || ''}
                  onChange={(e) => setEditingItem({...editingItem, discount: parseInt(e.target.value) || undefined})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Danh mục</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.category || ''}
                  onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isNew"
                  checked={editingItem.isNew || false}
                  onChange={(e) => setEditingItem({...editingItem, isNew: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="isNew" className="text-sm font-medium">Sản phẩm mới</label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Mô tả ngắn</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                  placeholder="Mô tả ngắn gọn về sản phẩm..."
                />
              </div>
            </div>
          )}

          {/* Detail & Images Tab */}
          {formTab === 'detail' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nội dung chi tiết (HTML)</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={10}
                  value={editingItem.content || ''}
                  onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                  placeholder="<p>Mô tả chi tiết sản phẩm...</p>"
                />
                <p className="text-xs text-gray-500 mt-1">Có thể sử dụng HTML để định dạng</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Hình ảnh bổ sung (mỗi URL một dòng)</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={4}
                  value={imagesList.join('\n')}
                  onChange={(e) => {
                    const imageUrls = e.target.value.split('\n').filter(url => url.trim());
                    setEditingItem({
                      ...editingItem,
                      images: imageUrls.length > 0 ? imageUrls : undefined
                    });
                  }}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">Mỗi URL một dòng. Hình đầu tiên sẽ là hình chính.</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Thông số kỹ thuật (JSON format)</label>
                <textarea
                  className="w-full border rounded px-3 py-2 font-mono text-sm"
                  rows={6}
                  value={editingItem.specifications ? JSON.stringify(editingItem.specifications, null, 2) : '{\n  "Chất liệu": "",\n  "Kích thước": "",\n  "Trọng lượng": ""\n}'}
                  onChange={(e) => {
                    try {
                      const specs = JSON.parse(e.target.value);
                      setEditingItem({...editingItem, specifications: specs});
                    } catch (e) {
                      // Invalid JSON, keep as is
                    }
                  }}
                  placeholder='{"Chất liệu": "Thủy tinh", "Kích thước": "350ml"}'
                />
                <p className="text-xs text-gray-500 mt-1">Định dạng JSON: {`{"key": "value"}`}</p>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {formTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Meta Title</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.metaTitle || ''}
                  onChange={(e) => setEditingItem({...editingItem, metaTitle: e.target.value})}
                  placeholder="Tên sản phẩm - Xưởng In Đà Nẵng TGP"
                />
                <p className="text-xs text-gray-500 mt-1">Tiêu đề hiển thị trên Google (50-60 ký tự)</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meta Description</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  value={editingItem.metaDescription || ''}
                  onChange={(e) => setEditingItem({...editingItem, metaDescription: e.target.value})}
                  placeholder="Mô tả ngắn gọn về sản phẩm cho SEO..."
                />
                <p className="text-xs text-gray-500 mt-1">Mô tả hiển thị trên Google (150-160 ký tự)</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Keywords (phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.keywords || ''}
                  onChange={(e) => setEditingItem({...editingItem, keywords: e.target.value})}
                  placeholder="ly thủy tinh, in logo, quà tặng doanh nghiệp"
                />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Tiêu đề *</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug (URL-friendly)</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.slug || ''}
                  onChange={(e) => setEditingItem({...editingItem, slug: e.target.value})}
                  placeholder="ten-bai-viet"
                />
                <p className="text-xs text-gray-500 mt-1">Để trống sẽ tự động tạo từ tiêu đề</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL hình ảnh *</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.image || ''}
                  onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Danh mục</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.category || ''}
                  onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                  placeholder="Tin tức"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ngày</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.date || ''}
                  onChange={(e) => setEditingItem({...editingItem, date: e.target.value})}
                  placeholder="15/01/2024"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Mô tả ngắn (Excerpt)</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  value={editingItem.excerpt || ''}
                  onChange={(e) => setEditingItem({...editingItem, excerpt: e.target.value})}
                  placeholder="Mô tả ngắn gọn về bài viết..."
                />
              </div>
            </div>
          )}

          {/* Content Tab */}
          {newsFormTab === 'content' && (
            <div>
              <label className="block text-sm font-medium mb-1">Nội dung chi tiết (HTML)</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                rows={15}
                value={editingItem.content || ''}
                onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                placeholder="<p>Nội dung bài viết...</p>"
              />
              <p className="text-xs text-gray-500 mt-1">Có thể sử dụng HTML để định dạng</p>
            </div>
          )}

          {/* SEO Tab */}
          {newsFormTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Meta Title</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.metaTitle || ''}
                  onChange={(e) => setEditingItem({...editingItem, metaTitle: e.target.value})}
                  placeholder="Tiêu đề bài viết - Xưởng In Đà Nẵng TGP"
                />
                <p className="text-xs text-gray-500 mt-1">Tiêu đề hiển thị trên Google (50-60 ký tự)</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meta Description</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  value={editingItem.metaDescription || ''}
                  onChange={(e) => setEditingItem({...editingItem, metaDescription: e.target.value})}
                  placeholder="Mô tả ngắn gọn về bài viết cho SEO..."
                />
                <p className="text-xs text-gray-500 mt-1">Mô tả hiển thị trên Google (150-160 ký tự)</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Keywords (phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.keywords || ''}
                  onChange={(e) => setEditingItem({...editingItem, keywords: e.target.value})}
                  placeholder="tin tức, xưởng in, quà tặng doanh nghiệp"
                />
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
