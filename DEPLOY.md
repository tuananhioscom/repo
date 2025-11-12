# 🚀 Hướng dẫn Deploy SSR App

Có nhiều cách để deploy ứng dụng SSR này. Dưới đây là hướng dẫn chi tiết.

---

## ✅ OPTION 1: Vercel (Khuyến nghị - MIỄN PHÍ)

### Bước 1: Tạo tài khoản Vercel
1. Vào https://vercel.com
2. Sign up bằng GitHub account
3. Authorize Vercel truy cập GitHub repos

### Bước 2: Import Project
1. Click **"Add New Project"**
2. Chọn repository: `tuananhioscom/repo`
3. Chọn thư mục: `newtjsx`
4. Framework Preset: **Vite**
5. Root Directory: `newtjsx`

### Bước 3: Configure Build Settings
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Bước 4: Environment Variables (nếu cần)
```
NODE_ENV=production
PORT=3000
```

### Bước 5: Deploy
1. Click **"Deploy"**
2. Chờ 2-3 phút
3. Nhận link: `https://your-app.vercel.app`

### ⚠️ Lưu ý với Vercel:
Vercel sử dụng **Serverless Functions**, không phải Node.js server truyền thống. Cần chỉnh sửa một chút:

**File mới cần tạo:** `api/index.js`
```javascript
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from '../App';

export default function handler(req, res) {
  const html = renderToString(<App />);
  res.send(`<!DOCTYPE html>
    <html>
      <body>
        <div id="root">${html}</div>
        <script src="/assets/index.js"></script>
      </body>
    </html>
  `);
}
```

---

## ✅ OPTION 2: Render.com (MIỄN PHÍ - Dễ nhất)

### Bước 1: Tạo tài khoản
1. Vào https://render.com
2. Sign up bằng GitHub

### Bước 2: Tạo Web Service
1. Dashboard → **"New +"** → **"Web Service"**
2. Connect repository: `tuananhioscom/repo`
3. Name: `c5shop-ssr`
4. Root Directory: `newtjsx`
5. Environment: **Node**
6. Region: **Singapore** (gần VN nhất)

### Bước 3: Build & Start Commands
```
Build Command: npm install && npm run build
Start Command: npm run start:ssr
```

### Bước 4: Deploy
1. Click **"Create Web Service"**
2. Chờ 3-5 phút
3. Nhận link: `https://c5shop-ssr.onrender.com`

### ⚡ Ưu điểm Render.com:
- ✅ Chạy Node.js server thật (không cần chỉnh code)
- ✅ HTTPS miễn phí
- ✅ Auto deploy khi push GitHub
- ✅ Free tier 750 giờ/tháng
- ⚠️ Sleep sau 15 phút không dùng (free tier)

---

## ✅ OPTION 3: Railway.app (MIỄN PHÍ $5 credit)

### Bước 1: Tạo tài khoản
1. Vào https://railway.app
2. Sign up bằng GitHub

### Bước 2: Deploy
1. **"New Project"** → **"Deploy from GitHub repo"**
2. Chọn `tuananhioscom/repo`
3. Root Directory: `/newtjsx`
4. Auto detect và deploy

### Bước 3: Configure
```
Build Command: npm run build
Start Command: npm run start:ssr
```

Railway tự động generate domain: `https://your-app.railway.app`

---

## ✅ OPTION 4: Chạy trên PC/Local (Development)

### Windows:

#### Bước 1: Cài Node.js
1. Download: https://nodejs.org (LTS version)
2. Install và restart PC

#### Bước 2: Clone repo
```bash
git clone https://github.com/tuananhioscom/repo.git
cd repo/newtjsx
```

#### Bước 3: Install & Build
```bash
npm install
npm run build
```

#### Bước 4: Chạy server
```bash
npm run start:ssr
```

Mở browser: **http://localhost:3000**

---

### macOS / Linux:

```bash
# Install Node.js (nếu chưa có)
# macOS: brew install node
# Ubuntu: sudo apt install nodejs npm

# Clone và setup
git clone https://github.com/tuananhioscom/repo.git
cd repo/newtjsx
npm install
npm run build
npm run start:ssr
```

---

## ✅ OPTION 5: VPS/Cloud Server (Production)

### Yêu cầu:
- VPS Ubuntu 20.04+
- Node.js 18+
- PM2 (process manager)

### Bước 1: Setup VPS
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2
```

### Bước 2: Deploy code
```bash
# Clone repo
git clone https://github.com/tuananhioscom/repo.git
cd repo/newtjsx

# Install & build
npm install
npm run build
```

### Bước 3: Chạy với PM2
```bash
# Start app
pm2 start dist-server/server.js --name c5shop-ssr

# Enable auto-start on reboot
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs c5shop-ssr
```

### Bước 4: Setup Nginx (Optional - cho domain)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📊 So sánh các options:

| Platform | Miễn phí | Setup | Node.js | Auto Deploy | Speed |
|----------|----------|-------|---------|-------------|-------|
| **Vercel** | ✅ | Dễ | ⚠️ Serverless | ✅ | ⚡⚡⚡ |
| **Render** | ✅ | Dễ nhất | ✅ Full | ✅ | ⚡⚡ |
| **Railway** | ⚠️ $5 | Dễ | ✅ Full | ✅ | ⚡⚡⚡ |
| **Local PC** | ✅ | Trung bình | ✅ | ❌ | ⚡ |
| **VPS** | ❌ | Khó | ✅ | ⚠️ | ⚡⚡⚡ |

---

## 🎯 Khuyến nghị:

### Cho Testing nhanh:
→ **Render.com** (không cần chỉnh code, chạy luôn)

### Cho Production:
→ **VPS** (control tối đa, không limit)

### Cho Demo/Portfolio:
→ **Vercel** hoặc **Railway** (đẹp, nhanh)

### Cho Development:
→ **Chạy Local** (test nhanh)

---

## 🐛 Troubleshooting

### Lỗi: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Lỗi: Port đã được sử dụng
```bash
# Đổi port
PORT=4000 npm run start:ssr
```

### Lỗi: Build failed
```bash
# Check Node version (cần 18+)
node --version

# Clear cache
rm -rf dist dist-server
npm run build
```

---

## 📞 Cần hỗ trợ?

Nếu gặp vấn đề khi deploy, hãy:
1. Check logs của platform
2. Verify build commands
3. Test local trước

---

**Created by Claude AI** 🤖
