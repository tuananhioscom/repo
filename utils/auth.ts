// Simple authentication utility
const AUTH_KEY = 'admin_auth';
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin123'; // Có thể thay đổi password này

export const login = (username: string, password: string): boolean => {
  // Simple authentication - có thể mở rộng sau
  if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
    const authData = {
      username,
      loggedIn: true,
      timestamp: Date.now()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return false;
  
  try {
    const auth = JSON.parse(authData);
    // Check if logged in and session is valid (24 hours)
    const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
    if (auth.loggedIn && (Date.now() - auth.timestamp < sessionTimeout)) {
      return true;
    }
    // Session expired
    logout();
    return false;
  } catch (e) {
    return false;
  }
};

export const getCurrentUser = (): string | null => {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return null;
  
  try {
    const auth = JSON.parse(authData);
    return auth.username || null;
  } catch (e) {
    return null;
  }
};

