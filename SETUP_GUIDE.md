# PrintPro - Hướng dẫn Cài đặt Hệ thống Hoàn chỉnh

## 📚 Tổng quan Hệ thống

PrintPro là website in ấn chuyên nghiệp bao gồm:
- ✅ Backend API (Node.js + Express + MySQL)
- ✅ Frontend Website (HTML/CSS/JavaScript)
- ✅ Authentication System (JWT)
- ✅ Role-based Authorization (Member/Admin)
- ✅ Admin Dashboard
- ✅ Shopping Cart & Checkout
- ✅ Order Management

## 🏗️ Kiến trúc Hệ thống

```
PrintPro/
├── frontend/           # Website chính
│   ├── index.html
│   ├── login.html     # TODO: Sẽ tạo
│   ├── register.html  # TODO: Sẽ tạo
│   ├── cart.html      # TODO: Sẽ tạo
│   ├── admin/         # TODO: Dashboard admin
│   └── assets/
│       ├── styles.css
│       ├── main.js
│       └── products.js
├── backend/           # API Server
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
└── database/          # SQL Schema
    └── schema.sql
```

## 🚀 Cài đặt Từng Bước

### BƯỚC 1: Cài đặt Database

#### 1.1. Cài đặt MySQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Windows:**
Download và cài đặt từ [MySQL Official Site](https://dev.mysql.com/downloads/installer/)

#### 1.2. Tạo Database

```bash
# Đăng nhập MySQL
mysql -u root -p

# Trong MySQL console
CREATE DATABASE printpro_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

#### 1.3. Import Schema

```bash
cd /path/to/repo
mysql -u root -p printpro_db < database/schema.sql
```

#### 1.4. Tạo Admin Password Hash

```bash
cd backend
npm install bcryptjs
node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"
```

Copy hash và update vào database:
```sql
UPDATE users SET password = 'YOUR_HASH_HERE' WHERE email = 'admin@printpro.vn';
```

### BƯỚC 2: Cài đặt Backend API

#### 2.1. Install Dependencies

```bash
cd backend
npm install
```

#### 2.2. Cấu hình Environment

```bash
cp .env.example .env
```

Chỉnh sửa `.env`:
```env
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=printpro_db
DB_PORT=3306

# JWT
JWT_SECRET=change_this_to_random_string_in_production
JWT_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=http://localhost:8080
```

#### 2.3. Khởi động Backend

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Backend chạy tại: `http://localhost:3000`

Test API:
```bash
curl http://localhost:3000/api/health
```

### BƯỚC 3: Frontend Integration (TODO)

Frontend cần được tích hợp với Backend API. Các file cần tạo:

#### 3.1. Login Page (`login.html`)
- Form đăng nhập
- Gọi API `/api/auth/login`
- Lưu JWT token vào localStorage
- Redirect based on role (admin -> dashboard, member -> home)

#### 3.2. Register Page (`register.html`)
- Form đăng ký
- Gọi API `/api/auth/register`
- Auto login sau khi đăng ký thành công

#### 3.3. Cart & Checkout
- `cart.html` - Hiển thị giỏ hàng
- `checkout.html` - Form đặt hàng
- Tích hợp API cart và orders

#### 3.4. Admin Dashboard
- `admin/index.html` - Tổng quan
- `admin/products.html` - Quản lý sản phẩm
- `admin/orders.html` - Quản lý đơn hàng
- `admin/users.html` - Quản lý users

#### 3.5. API Client Utility

Tạo file `assets/api.js`:
```javascript
const API_BASE = 'http://localhost:3000/api';

const api = {
    // Get auth token
    getToken() {
        return localStorage.getItem('token');
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

        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers
        });

        return response.json();
    },

    // Auth endpoints
    auth: {
        login: (data) => api.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        register: (data) => api.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        getProfile: () => api.request('/auth/profile')
    },

    // Product endpoints
    products: {
        getAll: (params) => api.request(`/products?${new URLSearchParams(params)}`),
        getOne: (id) => api.request(`/products/${id}`),
        create: (data) => api.request('/products', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        update: (id, data) => api.request(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
        delete: (id) => api.request(`/products/${id}`, {
            method: 'DELETE'
        })
    },

    // Cart endpoints
    cart: {
        get: () => api.request('/cart'),
        add: (data) => api.request('/cart/add', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        update: (id, data) => api.request(`/cart/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
        remove: (id) => api.request(`/cart/${id}`, {
            method: 'DELETE'
        }),
        clear: () => api.request('/cart', {
            method: 'DELETE'
        })
    },

    // Order endpoints
    orders: {
        create: (data) => api.request('/orders', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        getMyOrders: (params) => api.request(`/orders/my-orders?${new URLSearchParams(params)}`),
        getOne: (id) => api.request(`/orders/${id}`),
        cancel: (id) => api.request(`/orders/${id}/cancel`, {
            method: 'PUT'
        })
    }
};
```

## 🔐 Tài khoản Mặc định

**Admin Account:**
- Email: `admin@printpro.vn`
- Password: `admin123`

**⚠️ QUAN TRỌNG:** Đổi password admin ngay sau khi setup!

## 🧪 Test Hệ thống

### Test Backend API

```bash
# Health check
curl http://localhost:3000/api/health

# Login as admin
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@printpro.vn","password":"admin123"}'

# Get products (public)
curl http://localhost:3000/api/products

# Get categories
curl http://localhost:3000/api/products/categories
```

### Test với Postman

Import collection với các endpoints từ `backend/README.md`

## 📋 Checklist Hoàn thiện

### Backend ✅
- [x] Database schema
- [x] Authentication (login/register)
- [x] Authorization (member/admin)
- [x] Product CRUD
- [x] Cart management
- [x] Order management
- [x] File upload (product images)
- [x] API documentation

### Frontend 🚧 (TODO)
- [ ] Login page
- [ ] Register page
- [ ] Cart page
- [ ] Checkout page
- [ ] Admin dashboard
- [ ] Product management UI
- [ ] Order management UI
- [ ] User profile page
- [ ] API integration
- [ ] LocalStorage for auth token

## 🛠️ Công nghệ Sử dụng

**Backend:**
- Node.js + Express.js
- MySQL (với mysql2)
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- Multer (file uploads)
- CORS

**Frontend:**
- HTML5 + CSS3
- Vanilla JavaScript
- Fetch API
- LocalStorage

## 📱 Features Roadmap

### Phase 1 (Current) ✅
- Authentication & Authorization
- Product management (Backend)
- Cart & Orders (Backend API)

### Phase 2 (TODO)
- Frontend integration
- Admin dashboard UI
- Shopping cart UI
- Checkout flow

### Phase 3 (Future)
- Payment gateway integration
- Email notifications
- Product reviews & ratings
- Search optimization
- Mobile responsive improvements

## 🔧 Development Workflow

1. **Backend Development:**
   ```bash
   cd backend
   npm run dev  # Auto reload with nodemon
   ```

2. **Frontend Development:**
   ```bash
   # Serve frontend with any static server
   npx http-server . -p 8080

   # Or use VS Code Live Server extension
   ```

3. **Test End-to-end:**
   - Backend: `http://localhost:3000`
   - Frontend: `http://localhost:8080`

## 🚨 Troubleshooting

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 PID
```

### Database connection error
- Verify MySQL is running
- Check credentials in `.env`
- Test connection: `mysql -u root -p`

### CORS errors
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL
- Check browser console for specific CORS errors

## 📞 Next Steps

1. ✅ Backend đã hoàn thiện
2. ⏳ Cần tạo frontend pages:
   - Login/Register
   - Cart & Checkout
   - Admin Dashboard
3. ⏳ Tích hợp API vào frontend
4. ⏳ Testing end-to-end
5. ⏳ Deploy production

## 💡 Tips

- Sử dụng Postman/Insomnia để test API
- Check backend logs khi có lỗi
- Inspect Network tab trong browser DevTools
- JWT token hết hạn sau 7 ngày - cần login lại

---

**Tạo bởi PrintPro Team**
Nếu cần hỗ trợ, vui lòng tạo issue trên GitHub.
