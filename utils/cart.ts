export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  discount?: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Get cart from localStorage
export const getCart = (): Cart => {
  const cartData = localStorage.getItem('user_cart');
  if (cartData) {
    try {
      return JSON.parse(cartData);
    } catch (e) {
      return { items: [], total: 0, itemCount: 0 };
    }
  }
  return { items: [], total: 0, itemCount: 0 };
};

// Save cart to localStorage
export const saveCart = (cart: Cart): void => {
  localStorage.setItem('user_cart', JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

// Calculate cart totals
const calculateTotals = (items: CartItem[]): { total: number; itemCount: number } => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => {
    let itemPrice = item.price;
    if (item.discount) {
      // Calculate discounted price and round to nearest integer (VND has no decimals)
      itemPrice = Math.round(item.price * (1 - item.discount / 100));
    }
    return sum + (itemPrice * item.quantity);
  }, 0);
  return { total, itemCount };
};

// Add item to cart
export const addToCart = (product: {
  id: string;
  name: string;
  image: string;
  newPrice: string;
  oldPrice?: string;
  discount?: number;
}, quantity: number = 1): void => {
  const cart = getCart();
  
  // Parse price (remove currency symbols and convert to number)
  // VND format: "150,000đ" or "150.000đ" -> remove all non-digits, then parse as integer
  const priceString = product.newPrice.replace(/[^\d]/g, ''); // Remove all non-digits
  const price = parseInt(priceString, 10) || 0; // Parse as integer (VND has no decimals)
  
  // Check if product already exists in cart
  const existingItemIndex = cart.items.findIndex(item => item.productId === product.id);
  
  if (existingItemIndex >= 0) {
    // Update quantity
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      price: price,
      quantity: quantity,
      discount: product.discount
    });
  }
  
  // Recalculate totals
  const { total, itemCount } = calculateTotals(cart.items);
  cart.total = total;
  cart.itemCount = itemCount;
  
  saveCart(cart);
};

// Remove item from cart
export const removeFromCart = (productId: string): void => {
  const cart = getCart();
  cart.items = cart.items.filter(item => item.productId !== productId);
  
  // Recalculate totals
  const { total, itemCount } = calculateTotals(cart.items);
  cart.total = total;
  cart.itemCount = itemCount;
  
  saveCart(cart);
};

// Update item quantity in cart
export const updateCartItemQuantity = (productId: string, quantity: number): void => {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  const cart = getCart();
  const item = cart.items.find(item => item.productId === productId);
  
  if (item) {
    item.quantity = quantity;
    
    // Recalculate totals
    const { total, itemCount } = calculateTotals(cart.items);
    cart.total = total;
    cart.itemCount = itemCount;
    
    saveCart(cart);
  }
};

// Clear cart
export const clearCart = (): void => {
  saveCart({ items: [], total: 0, itemCount: 0 });
};

