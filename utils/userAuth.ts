export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  createdAt: string;
}

// Register new user
export const register = (userData: {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  address: string;
}): { success: boolean; message: string } => {
  // Get existing users
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if username or email already exists
  const existingUser = users.find((u: User & { password: string }) => 
    u.username === userData.username || u.email === userData.email
  );
  
  if (existingUser) {
    return { success: false, message: 'Tên đăng nhập hoặc email đã tồn tại!' };
  }
  
  // Create new user
  const newUser: User & { password: string } = {
    id: `user_${Date.now()}`,
    username: userData.username,
    email: userData.email,
    password: userData.password, // In production, this should be hashed
    fullName: userData.fullName,
    phone: userData.phone,
    address: userData.address,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  return { success: true, message: 'Đăng ký thành công!' };
};

// Login user
export const login = (username: string, password: string): { success: boolean; message: string; user?: User } => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  const user = users.find((u: User & { password: string }) => 
    u.username === username && u.password === password
  );
  
  if (!user) {
    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng!' };
  }
  
  // Store session
  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem('current_user', JSON.stringify(userWithoutPassword));
  localStorage.setItem('user_login_time', new Date().toISOString());
  
  window.dispatchEvent(new CustomEvent('userLoggedIn'));
  
  return { success: true, message: 'Đăng nhập thành công!', user: userWithoutPassword };
};

// Logout user
export const logout = (): void => {
  localStorage.removeItem('current_user');
  localStorage.removeItem('user_login_time');
  window.dispatchEvent(new CustomEvent('userLoggedOut'));
};

// Check if user is logged in
export const isUserLoggedIn = (): boolean => {
  const user = localStorage.getItem('current_user');
  if (!user) return false;
  
  // Check if session is still valid (24 hours)
  const loginTime = localStorage.getItem('user_login_time');
  if (loginTime) {
    const loginDate = new Date(loginTime);
    const now = new Date();
    const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
      logout();
      return false;
    }
  }
  
  return true;
};

// Get current user
export const getCurrentUser = (): User | null => {
  if (!isUserLoggedIn()) return null;
  
  const userData = localStorage.getItem('current_user');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (e) {
      return null;
    }
  }
  return null;
};

