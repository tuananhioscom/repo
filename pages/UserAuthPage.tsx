import React, { useState, useEffect } from 'react';
import { register, login, getCurrentUser, logout, isUserLoggedIn } from '../utils/userAuth';
import Breadcrumb from '../components/Breadcrumb';

const UserAuthPage: React.FC<{ mode?: 'login' | 'register' }> = ({ mode: initialMode }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode || 'login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const handleUserLogin = () => {
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('userLoggedOut', handleUserLogin);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('userLoggedOut', handleUserLogin);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (!formData.username || !formData.password) {
      setError('Vui lòng điền đầy đủ thông tin!');
      setIsSubmitting(false);
      return;
    }

    const result = login(formData.username, formData.password);
    
    if (result.success) {
      setSuccess('Đăng nhập thành công! Đang chuyển hướng...');
      setCurrentUser(result.user || null);
      setTimeout(() => {
        window.location.href = '/?page=TRANG CHỦ';
      }, 1500);
    } else {
      setError(result.message);
    }
    
    setIsSubmitting(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.fullName || !formData.phone || !formData.address) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setIsSubmitting(true);

    const result = register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address
    });

    if (result.success) {
      setSuccess('Đăng ký thành công! Đang chuyển đến trang đăng nhập...');
      setTimeout(() => {
        setMode('login');
        setFormData({
          username: formData.username,
          email: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          phone: '',
          address: ''
        });
        setSuccess('');
      }, 2000);
    } else {
      setError(result.message);
    }

    setIsSubmitting(false);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setSuccess('Đã đăng xuất thành công!');
  };

  if (currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Trang chủ', href: '/?page=TRANG CHỦ' },
            { label: 'Tài khoản', href: '/?page=USER_AUTH' }
          ]} />

          <div className="bg-white rounded-lg shadow-md p-8 mt-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Tài khoản của tôi</h1>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-semibold text-gray-600">Tên đăng nhập:</label>
                <p className="text-lg text-gray-800">{currentUser.username}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Họ và tên:</label>
                <p className="text-lg text-gray-800">{currentUser.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Email:</label>
                <p className="text-lg text-gray-800">{currentUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Số điện thoại:</label>
                <p className="text-lg text-gray-800">{currentUser.phone}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Địa chỉ:</label>
                <p className="text-lg text-gray-800">{currentUser.address}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: 'Trang chủ', href: '/?page=TRANG CHỦ' },
          { label: mode === 'login' ? 'Đăng nhập' : 'Đăng ký', href: '/?page=USER_AUTH' }
        ]} />

        <div className="bg-white rounded-lg shadow-md p-8 mt-6">
          <div className="flex gap-4 mb-6 border-b">
            <button
              onClick={() => {
                setMode('login');
                setError('');
                setSuccess('');
              }}
              className={`px-6 py-2 font-semibold ${mode === 'login' ? 'border-b-2 border-primary-blue text-primary-blue' : 'text-gray-600'}`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => {
                setMode('register');
                setError('');
                setSuccess('');
              }}
              className={`px-6 py-2 font-semibold ${mode === 'register' ? 'border-b-2 border-primary-blue text-primary-blue' : 'text-gray-600'}`}
            >
              Đăng ký
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
              {success}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tên đăng nhập *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mật khẩu *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-orange text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-orange-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tên đăng nhập *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Địa chỉ *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mật khẩu * (tối thiểu 6 ký tự)
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Xác nhận mật khẩu *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-orange text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-orange-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAuthPage;

