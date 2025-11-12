import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import newsData from '../data/news.json';

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

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'news'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(categoriesData.categories);
  const [news, setNews] = useState<NewsItem[]>(newsData.news);

  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Combine all product arrays
    const allProducts = [
      ...productsData.newProducts,
      ...productsData.glassProducts,
      ...productsData.giftProducts
    ];
    setProducts(allProducts);
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa?')) return;

    if (activeTab === 'products') {
      setProducts(products.filter(p => p.id !== id));
    } else if (activeTab === 'categories') {
      setCategories(categories.filter(c => c.id !== id));
    } else if (activeTab === 'news') {
      setNews(news.filter(n => n.id !== id));
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsAdding(false);
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
      if (isAdding) {
        setProducts([...products, editingItem]);
      } else {
        setProducts(products.map(p => p.id === editingItem.id ? editingItem : p));
      }
    } else if (activeTab === 'categories') {
      if (isAdding) {
        setCategories([...categories, editingItem]);
      } else {
        setCategories(categories.map(c => c.id === editingItem.id ? editingItem : c));
      }
    } else if (activeTab === 'news') {
      if (isAdding) {
        setNews([...news, editingItem]);
      } else {
        setNews(news.map(n => n.id === editingItem.id ? editingItem : n));
      }
    }

    setEditingItem(null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
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
      return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4 text-primary-blue">
            {isAdding ? 'Thêm Sản Phẩm' : 'Sửa Sản Phẩm'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={editingItem.name}
                onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL hình ảnh</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={editingItem.image}
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
              <label className="block text-sm font-medium mb-1">Giá mới</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={editingItem.newPrice}
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
                value={editingItem.category}
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
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tiêu đề</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={editingItem.title}
                onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.slug}
                  onChange={(e) => setEditingItem({...editingItem, slug: e.target.value})}
                  placeholder="ten-bai-viet"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL hình ảnh</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Danh mục</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                  placeholder="Tin tức"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ngày</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingItem.date}
                  onChange={(e) => setEditingItem({...editingItem, date: e.target.value})}
                  placeholder="15/01/2024"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mô tả ngắn</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                rows={2}
                value={editingItem.excerpt}
                onChange={(e) => setEditingItem({...editingItem, excerpt: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nội dung</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                rows={6}
                value={editingItem.content}
                onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
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
                  <td className="px-4 py-3">{product.isNew ? '✓' : ''}</td>
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
          <h1 className="text-3xl font-bold text-primary-blue mb-4">Quản Trị Nội Dung</h1>
          <p className="text-gray-600 mb-4">
            Trang quản lý sản phẩm, danh mục và tin tức. Sau khi chỉnh sửa, nhấn "Tải JSON" để lưu file và thay thế vào thư mục /data.
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
          </div>
        </div>

        {renderForm()}
        {renderTable()}
      </div>
    </div>
  );
};

export default AdminPage;
