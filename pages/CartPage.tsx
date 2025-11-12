import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateCartItemQuantity, clearCart } from '../utils/cart';
import { createOrder } from '../utils/orders';
import { getCurrentUser } from '../utils/userAuth';
import type { CartItem } from '../utils/cart';
import Breadcrumb from '../components/Breadcrumb';

const CartPage: React.FC = () => {
  const [cart, setCart] = useState(getCart());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    notes: ''
  });

  const currentUser = getCurrentUser();

  // Load user data if logged in
  useEffect(() => {
    if (currentUser) {
      setFormData({
        customerName: currentUser.fullName,
        customerEmail: currentUser.email,
        customerPhone: currentUser.phone,
        customerAddress: currentUser.address,
        notes: ''
      });
    }
  }, [currentUser]);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      setCart(getCart());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
    setCart(getCart());
  };

  const handleRemoveItem = (productId: string) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      removeFromCart(productId);
      setCart(getCart());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.customerAddress) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (cart.items.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order
      const order = createOrder({
        userId: currentUser?.id,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        items: cart.items,
        total: cart.total,
        notes: formData.notes
      });

      // Clear cart
      clearCart();
      setCart(getCart());

      alert(`✅ Đặt hàng thành công!\n\nMã đơn hàng: ${order.id}\nTổng tiền: ${cart.total.toLocaleString('vi-VN')}đ\n\nChúng tôi sẽ liên hệ với bạn sớm nhất!`);
      
      // Reset form
      setFormData({
        customerName: currentUser?.fullName || '',
        customerEmail: currentUser?.email || '',
        customerPhone: currentUser?.phone || '',
        customerAddress: currentUser?.address || '',
        notes: ''
      });
      setShowOrderForm(false);
      
      // Redirect to home
      setTimeout(() => {
        window.location.href = '/?page=TRANG CHỦ';
      }, 2000);
    } catch (error) {
      alert('❌ Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
      console.error('Order error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Trang chủ', href: '/?page=TRANG CHỦ' },
            { label: 'Giỏ hàng', href: '/?page=CART' }
          ]} />
          
          <div className="bg-white rounded-lg shadow-md p-12 text-center mt-6">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
            <a
              href="/?page=SẢN PHẨM"
              className="inline-block bg-primary-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-orange-dark transition-colors"
            >
              Tiếp tục mua sắm
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: 'Trang chủ', href: '/?page=TRANG CHỦ' },
          { label: 'Giỏ hàng', href: '/?page=CART' }
        ]} />

        <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6">Giỏ hàng của bạn</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item: CartItem) => {
              // Calculate price with discount, round to nearest integer (VND has no decimals)
              let itemPrice = item.price;
              if (item.discount) {
                itemPrice = Math.round(item.price * (1 - item.discount / 100));
              }
              const itemTotal = itemPrice * item.quantity;

              return (
                <div key={item.productId} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{item.productName}</h3>
                    <p className="text-primary-orange font-bold mb-2">{formatPrice(itemPrice)}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value, 10) || 1;
                            if (newQuantity > 0) {
                              handleQuantityChange(item.productId, newQuantity);
                            }
                          }}
                          onBlur={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!value || value < 1) {
                              handleQuantityChange(item.productId, 1);
                            }
                          }}
                          className="w-16 px-2 py-1 text-center border-x focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-gray-700 font-semibold">
                        Tổng: {formatPrice(itemTotal)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-600 hover:text-red-700 text-xl font-bold"
                    title="Xóa sản phẩm"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Số lượng sản phẩm:</span>
                  <span className="font-semibold">{cart.itemCount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính:</span>
                  <span className="font-semibold">{formatPrice(cart.total)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-xl font-bold text-primary-orange">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                </div>
              </div>

              {!showOrderForm ? (
                <button
                  onClick={() => setShowOrderForm(true)}
                  className="w-full bg-primary-orange text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-orange-dark transition-colors"
                >
                  Đặt hàng
                </button>
              ) : (
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
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
                      name="customerEmail"
                      value={formData.customerEmail}
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
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Địa chỉ giao hàng *
                    </label>
                    <textarea
                      name="customerAddress"
                      value={formData.customerAddress}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Ghi chú (tùy chọn)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                      placeholder="Ghi chú về đơn hàng..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowOrderForm(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary-orange text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-orange-dark transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

