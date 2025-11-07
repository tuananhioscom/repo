// API Client Utility for PrintPro
// Handles all API requests with authentication

const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://your-api-domain.com/api';

const api = {
    // Get auth token from localStorage
    getToken() {
        return localStorage.getItem('token');
    },

    // Get current user from localStorage
    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Set auth data
    setAuth(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    // Clear auth data
    clearAuth() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Check if user is logged in
    isAuthenticated() {
        return !!this.getToken();
    },

    // Check if user is admin
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    },

    // Make authenticated request
    async request(endpoint, options = {}) {
        const token = this.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_BASE}${endpoint}`, {
                ...options,
                headers
            });

            const data = await response.json();

            // Handle unauthorized
            if (response.status === 401 || response.status === 403) {
                if (data.message.includes('Token') || data.message.includes('đăng nhập')) {
                    this.clearAuth();
                    window.location.href = '/login.html';
                }
            }

            return {
                success: response.ok,
                status: response.status,
                data: data
            };
        } catch (error) {
            console.error('API Request Error:', error);
            return {
                success: false,
                status: 0,
                data: {
                    success: false,
                    message: 'Lỗi kết nối. Vui lòng kiểm tra kết nối mạng.'
                }
            };
        }
    },

    // Upload file with form data
    async uploadRequest(endpoint, formData, options = {}) {
        const token = this.getToken();
        const headers = {
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_BASE}${endpoint}`, {
                method: 'POST',
                body: formData,
                headers,
                ...options
            });

            const data = await response.json();

            return {
                success: response.ok,
                status: response.status,
                data: data
            };
        } catch (error) {
            console.error('Upload Error:', error);
            return {
                success: false,
                status: 0,
                data: {
                    success: false,
                    message: 'Lỗi upload file'
                }
            };
        }
    },

    // Auth endpoints
    auth: {
        async login(email, password) {
            const result = await api.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (result.success && result.data.success) {
                api.setAuth(result.data.data.token, result.data.data.user);
            }

            return result;
        },

        async register(userData) {
            const result = await api.request('/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });

            if (result.success && result.data.success) {
                api.setAuth(result.data.data.token, result.data.data.user);
            }

            return result;
        },

        async getProfile() {
            return await api.request('/auth/profile');
        },

        async updateProfile(userData) {
            return await api.request('/auth/profile', {
                method: 'PUT',
                body: JSON.stringify(userData)
            });
        },

        logout() {
            api.clearAuth();
            window.location.href = '/index.html';
        }
    },

    // Product endpoints
    products: {
        async getAll(params = {}) {
            const queryString = new URLSearchParams(params).toString();
            return await api.request(`/products${queryString ? '?' + queryString : ''}`);
        },

        async getOne(id) {
            return await api.request(`/products/${id}`);
        },

        async getCategories() {
            return await api.request('/products/categories');
        },

        async create(productData) {
            return await api.request('/products', {
                method: 'POST',
                body: JSON.stringify(productData)
            });
        },

        async createWithImage(formData) {
            return await api.uploadRequest('/products', formData, {
                method: 'POST'
            });
        },

        async update(id, productData) {
            return await api.request(`/products/${id}`, {
                method: 'PUT',
                body: JSON.stringify(productData)
            });
        },

        async updateWithImage(id, formData) {
            return await api.uploadRequest(`/products/${id}`, formData, {
                method: 'PUT'
            });
        },

        async delete(id) {
            return await api.request(`/products/${id}`, {
                method: 'DELETE'
            });
        }
    },

    // Cart endpoints
    cart: {
        async get() {
            return await api.request('/cart');
        },

        async add(product_id, quantity = 1, selected_options = {}) {
            return await api.request('/cart/add', {
                method: 'POST',
                body: JSON.stringify({ product_id, quantity, selected_options })
            });
        },

        async update(id, quantity) {
            return await api.request(`/cart/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ quantity })
            });
        },

        async remove(id) {
            return await api.request(`/cart/${id}`, {
                method: 'DELETE'
            });
        },

        async clear() {
            return await api.request('/cart', {
                method: 'DELETE'
            });
        }
    },

    // Order endpoints
    orders: {
        async create(orderData) {
            return await api.request('/orders', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });
        },

        async getMyOrders(params = {}) {
            const queryString = new URLSearchParams(params).toString();
            return await api.request(`/orders/my-orders${queryString ? '?' + queryString : ''}`);
        },

        async getOne(id) {
            return await api.request(`/orders/${id}`);
        },

        async cancel(id) {
            return await api.request(`/orders/${id}/cancel`, {
                method: 'PUT'
            });
        },

        // Admin endpoints
        async getAllOrders(params = {}) {
            const queryString = new URLSearchParams(params).toString();
            return await api.request(`/orders/admin/all${queryString ? '?' + queryString : ''}`);
        },

        async updateStatus(id, status, payment_status) {
            return await api.request(`/orders/admin/${id}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status, payment_status })
            });
        }
    }
};

// Export for use in other files
window.api = api;
