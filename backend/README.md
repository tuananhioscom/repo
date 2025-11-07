# PrintPro Backend API

Backend API cho website in ấn PrintPro với đầy đủ chức năng authentication, quản lý sản phẩm, giỏ hàng và đơn hàng.

## 🚀 Tính năng

- ✅ Đăng ký/Đăng nhập với JWT Authentication
- ✅ Phân quyền: Member và Admin
- ✅ CRUD sản phẩm (Admin)
- ✅ Upload ảnh sản phẩm
- ✅ Quản lý danh mục
- ✅ Giỏ hàng
- ✅ Đặt hàng
- ✅ Quản lý đơn hàng (Admin)
- ✅ RESTful API

## 📋 Yêu cầu

- Node.js >= 14.x
- MySQL >= 5.7 hoặc MariaDB >= 10.2
- npm hoặc yarn

## 🔧 Cài đặt

### 1. Clone repository và cài đặt dependencies

```bash
cd backend
npm install
```

### 2. Cấu hình Database

Tạo database MySQL:

```sql
CREATE DATABASE printpro_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Import schema:

```bash
mysql -u root -p printpro_db < ../database/schema.sql
```

### 3. Cấu hình Environment

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Chỉnh sửa file `.env` với thông tin của bạn:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=printpro_db
DB_PORT=3306

JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:8080
```

### 4. Tạo Admin User

Tạo password hash cho admin:

```bash
node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"
```

Cập nhật password hash vào file `../database/schema.sql` hoặc chạy SQL:

```sql
UPDATE users SET password = 'HASH_VỪA_TẠO' WHERE email = 'admin@printpro.vn';
```

### 5. Khởi chạy server

Development mode (with nodemon):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server sẽ chạy tại: `http://localhost:3000`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Đăng ký tài khoản mới | No |
| POST | `/api/auth/login` | Đăng nhập | No |
| GET | `/api/auth/profile` | Lấy thông tin profile | Yes |
| PUT | `/api/auth/profile` | Cập nhật profile | Yes |

### Products

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Lấy danh sách sản phẩm | No |
| GET | `/api/products/:id` | Lấy chi tiết sản phẩm | No |
| GET | `/api/products/categories` | Lấy danh sách danh mục | No |
| POST | `/api/products` | Tạo sản phẩm mới | Admin |
| PUT | `/api/products/:id` | Cập nhật sản phẩm | Admin |
| DELETE | `/api/products/:id` | Xóa sản phẩm | Admin |

### Cart

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/cart` | Lấy giỏ hàng | Member |
| POST | `/api/cart/add` | Thêm sản phẩm vào giỏ | Member |
| PUT | `/api/cart/:id` | Cập nhật số lượng | Member |
| DELETE | `/api/cart/:id` | Xóa sản phẩm khỏi giỏ | Member |
| DELETE | `/api/cart` | Xóa toàn bộ giỏ hàng | Member |

### Orders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/orders` | Tạo đơn hàng từ giỏ | Member |
| GET | `/api/orders/my-orders` | Lấy đơn hàng của user | Member |
| GET | `/api/orders/:id` | Chi tiết đơn hàng | Member |
| PUT | `/api/orders/:id/cancel` | Hủy đơn hàng | Member |
| GET | `/api/orders/admin/all` | Lấy tất cả đơn hàng | Admin |
| PUT | `/api/orders/admin/:id/status` | Cập nhật trạng thái đơn | Admin |

## 🔐 Authentication

API sử dụng JWT Bearer Token. Sau khi login/register, sử dụng token trong header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📝 Request Examples

### Register
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "Nguyễn Văn A",
  "phone": "0123456789",
  "address": "123 Đường ABC, TP.HCM"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Create Product (Admin with file upload)
```bash
POST /api/products
Content-Type: multipart/form-data
Authorization: Bearer TOKEN

FormData:
- category_id: 1
- name: "Name Card Cao Cấp"
- slug: "name-card-cao-cap"
- short_description: "Name card chuyên nghiệp"
- description: "Mô tả chi tiết..."
- price: 1000000
- specifications: ["Spec 1", "Spec 2"]
- options: ["Option 1", "Option 2"]
- stock_quantity: 100
- image: [FILE]
```

### Add to Cart
```json
POST /api/cart/add
Authorization: Bearer TOKEN
{
  "product_id": 1,
  "quantity": 2,
  "selected_options": {
    "finish": "matte",
    "size": "standard"
  }
}
```

### Create Order
```json
POST /api/orders
Authorization: Bearer TOKEN
{
  "shipping_name": "Nguyễn Văn A",
  "shipping_phone": "0123456789",
  "shipping_address": "123 Đường ABC, TP.HCM",
  "payment_method": "cod",
  "notes": "Giao giờ hành chính"
}
```

## 🛡️ Security

- Passwords được hash với bcrypt (salt rounds: 10)
- JWT token expires sau 7 ngày (configurable)
- Role-based access control (RBAC)
- SQL Injection protection với prepared statements
- File upload validation (only images, max 5MB)

## 📁 Cấu trúc thư mục

```
backend/
├── config/
│   ├── database.js      # Database configuration
│   └── upload.js        # Multer upload configuration
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
├── middleware/
│   └── auth.js          # Authentication & Authorization
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
├── uploads/
│   └── products/        # Uploaded product images
├── .env.example
├── package.json
├── server.js            # Main application file
└── README.md
```

## 🧪 Testing

Test API với curl:

```bash
# Health check
curl http://localhost:3000/api/health

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@printpro.vn","password":"admin123"}'

# Get products
curl http://localhost:3000/api/products
```

## 🐛 Troubleshooting

**Database connection failed:**
- Kiểm tra MySQL service đã chạy chưa
- Verify thông tin trong file `.env`
- Test connection: `mysql -u root -p -e "SELECT 1"`

**JWT token invalid:**
- Token có thể đã hết hạn (7 ngày)
- Đăng nhập lại để lấy token mới

**File upload error:**
- Kiểm tra thư mục `uploads/products` đã được tạo chưa
- Verify file size < 5MB
- Chỉ chấp nhận: JPEG, PNG, GIF, WebP

## 👥 Default Accounts

**Admin:**
- Email: `admin@printpro.vn`
- Password: `admin123` (đổi sau khi setup!)

## 📞 Support

Nếu có vấn đề, vui lòng tạo issue trên GitHub repository.

## 📄 License

ISC License - PrintPro Team
