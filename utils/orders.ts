export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  discount?: number;
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Create new order
export const createOrder = (orderData: {
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  notes?: string;
}): Order => {
  const order: Order = {
    id: `order_${Date.now()}`,
    userId: orderData.userId,
    customerName: orderData.customerName,
    customerEmail: orderData.customerEmail,
    customerPhone: orderData.customerPhone,
    customerAddress: orderData.customerAddress,
    items: orderData.items,
    total: orderData.total,
    status: 'pending',
    notes: orderData.notes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Save to localStorage
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  
  window.dispatchEvent(new CustomEvent('orderCreated'));
  
  return order;
};

// Get all orders
export const getAllOrders = (): Order[] => {
  const orders = localStorage.getItem('orders');
  if (orders) {
    try {
      return JSON.parse(orders);
    } catch (e) {
      return [];
    }
  }
  return [];
};

// Get orders by user ID
export const getOrdersByUserId = (userId: string): Order[] => {
  const orders = getAllOrders();
  return orders.filter(order => order.userId === userId);
};

// Update order status
export const updateOrderStatus = (orderId: string, status: Order['status']): boolean => {
  const orders = getAllOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex >= 0) {
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    localStorage.setItem('orders', JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('orderUpdated'));
    return true;
  }
  
  return false;
};

// Delete order
export const deleteOrder = (orderId: string): boolean => {
  const orders = getAllOrders();
  const filteredOrders = orders.filter(order => order.id !== orderId);
  
  if (filteredOrders.length !== orders.length) {
    localStorage.setItem('orders', JSON.stringify(filteredOrders));
    window.dispatchEvent(new CustomEvent('orderUpdated'));
    return true;
  }
  
  return false;
};

