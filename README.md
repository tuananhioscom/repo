# C5Shop E-commerce - Server-Side Rendering (SSR)

React + TypeScript e-commerce application với **Node.js Server-Side Rendering** để tối ưu SEO và performance.

---

## 🚀 Features

- ⚡ **Server-Side Rendering** với Express.js
- 🎨 **React 19** + TypeScript
- 💅 **TailwindCSS** styling
- 📦 **Vite** build tool
- 🔍 **SEO-friendly** - HTML được render trên server
- 📱 **Responsive** design

---

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** hoặc **yarn**

---

## 🏗️ Installation

```bash
# Clone repository
git clone https://github.com/tuananhioscom/repo.git
cd repo

# Install dependencies
npm install
```

---

## ⚙️ Development

### Development server (CSR - Client-Side Rendering)
```bash
npm run dev
```

Mở: http://localhost:5173

### Production build + SSR server
```bash
# Build client & server
npm run build

# Start SSR server
npm run start:ssr
```

Mở: http://localhost:3000

---

## 📦 Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (CSR) |
| `npm run build` | Build cả client và server |
| `npm run build:client` | Build client bundle only |
| `npm run build:server` | Build SSR server only |
| `npm run start:ssr` | Start production SSR server |
| `npm run preview` | Preview client build |

---

## 🌐 Deployment

### Deploy lên Render.com (Free)

1. Đăng ký: https://render.com
2. New Web Service → Connect GitHub repo
3. Configure:
   ```
   Build Command: npm install && npm run build
   Start Command: npm run start:ssr
   ```
4. Deploy!

Chi tiết xem: [DEPLOY.md](./DEPLOY.md)

### Các platform khác:
- ✅ **Vercel** - Serverless functions
- ✅ **Railway** - Easy deployment
- ✅ **VPS** - Full control

---

## 📂 Project Structure

```
repo/
├── components/          # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ...
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── ProductsPage.tsx
│   └── ...
├── dist/               # Client build output
├── dist-server/        # Server build output
├── server.tsx          # Express SSR server
├── App.tsx             # Main React app
├── index.tsx           # Client entry point
├── index.html          # HTML template
├── package.json        # Dependencies & scripts
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite config (client)
└── vite.config.server.ts  # Vite config (server)
```

---

## 🎯 How SSR Works

1. **Client request** → Express server
2. **Server renders** React app to HTML string
3. **Server sends** complete HTML
4. **Client hydrates** React app
5. **App becomes** fully interactive

### Benefits:
- 🚀 Faster First Contentful Paint
- 📈 Better SEO (Google crawls full HTML)
- 📊 Improved Core Web Vitals
- 🔍 Search engine friendly

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, TailwindCSS
- **Build**: Vite
- **SSR**: Express.js, react-dom/server
- **Deployment**: Render, Vercel, Railway

---

## 📖 Documentation

- [README.SSR.md](./README.SSR.md) - Hướng dẫn SSR chi tiết
- [DEPLOY.md](./DEPLOY.md) - Deployment guides
- [Components](./components/) - Component documentation

---

## 🐛 Troubleshooting

### Port already in use
```bash
PORT=4000 npm run start:ssr
```

### Build errors
```bash
rm -rf node_modules dist dist-server
npm install
npm run build
```

### Module not found
```bash
npm install
```

---

## 📞 Support

Nếu gặp vấn đề:
1. Check [DEPLOY.md](./DEPLOY.md)
2. Verify Node.js version: `node --version` (cần >= 18)
3. Clear cache: `rm -rf node_modules dist dist-server && npm install`

---

## 📄 License

MIT License

---

## 🎉 Credits

Built with React, TypeScript, and Express.js
Converted from TSX to SSR by Claude AI

---

**Ready to deploy!** 🚀

Xem [DEPLOY.md](./DEPLOY.md) để deploy lên production.
