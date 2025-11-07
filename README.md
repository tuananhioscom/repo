# 🖨️ PrintPro - Website In Ấn Chuyên Nghiệp

Website in ấn chuyên nghiệp với hệ thống quản lý đầy đủ, authentication, shopping cart, và admin dashboard.

## ✨ Tính năng Hoàn chỉnh

### 🎨 Frontend
- ✅ Trang chủ với catalog sản phẩm
- ✅ Đăng nhập / Đăng ký
- ✅ Giỏ hàng (thêm, sửa, xóa)
- ✅ Thanh toán và đặt hàng
- ✅ Quản lý đơn hàng cá nhân
- ✅ Admin Dashboard
- ✅ Responsive design
- ✅ Vietnamese language

### 🔐 Authentication
- ✅ JWT-based authentication
- ✅ Role-based access (Member/Admin)
- ✅ Protected routes
- ✅ Auto login after register
- ✅ Persistent login (localStorage)

### 🛒 Shopping Features
- ✅ Add to cart
- ✅ Update quantities
- ✅ Cart summary
- ✅ Checkout flow
- ✅ Order tracking
- ✅ Order cancellation

### 👨‍💼 Admin Features
- ✅ Dashboard với statistics
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý đơn hàng
- ✅ Cập nhật trạng thái đơn
- ✅ Admin-only access

### 🔧 Backend API
- ✅ Node.js + Express
- ✅ MySQL database
- ✅ RESTful API
- ✅ JWT authentication
- ✅ File upload (Multer)
- ✅ CORS enabled

## 🚀 Quick Start

### 1. Setup Database
```bash
mysql -u root -p -e "CREATE DATABASE printpro_db;"
mysql -u root -p printpro_db < database/schema.sql
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env file
npm run dev  # Runs on http://localhost:3000
```

### 3. Open Frontend
Open `index.html` in browser or use live server on port 8080

## 👤 Default Admin Account

- Email: `admin@printpro.vn`
- Password: `admin123`

## 📱 Pages

- `/index.html` - Trang chủ
- `/login.html` - Đăng nhập
- `/register.html` - Đăng ký
- `/cart.html` - Giỏ hàng
- `/checkout.html` - Thanh toán
- `/orders.html` - Đơn hàng
- `/admin/index.html` - Admin Dashboard

## 📖 Documentation

- `SETUP_GUIDE.md` - Chi tiết setup
- `backend/README.md` - API docs

## 💻 Tech Stack

**Frontend:** HTML5, CSS3, Vanilla JavaScript
**Backend:** Node.js, Express, MySQL
**Auth:** JWT, bcrypt

---

**PrintPro Team © 2024**
