# Hướng Dẫn Cấu Hình EmailJS

EmailJS cho phép gửi email trực tiếp từ frontend mà không cần backend server.

## Bước 1: Đăng Ký Tài Khoản EmailJS

1. Truy cập https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí (200 email/tháng)
3. Xác thực email của bạn

## Bước 2: Tạo Email Service

1. Vào **Email Services** trong dashboard
2. Click **Add New Service**
3. Chọn email provider của bạn (Gmail, Outlook, etc.)
4. Làm theo hướng dẫn để kết nối email của bạn
5. Copy **Service ID** (ví dụ: `service_abc123`)

## Bước 3: Tạo Email Templates

### Template 1: Đăng Ký Email Newsletter

1. Vào **Email Templates** > **Create New Template**
2. Đặt tên: `Newsletter Subscription`
3. Cấu hình template:

**Subject:**
```
Đăng Ký Nhận Email Mới - {{subscriber_email}}
```

**Content:**
```
Xin chào,

Bạn có một đăng ký email mới từ website:

Email: {{subscriber_email}}
Ngày đăng ký: {{date}}

Trân trọng,
Website Xưởng In Đà Nẵng TGP
```

4. Copy **Template ID** (ví dụ: `template_xyz789`)

### Template 2: Form Liên Hệ

1. Tạo template mới: `Contact Form`
2. Cấu hình template:

**Subject:**
```
Liên Hệ Từ Website - {{subject}}
```

**Content:**
```
Bạn có tin nhắn mới từ form liên hệ:

Tên: {{from_name}}
Email: {{from_email}}
Tiêu đề: {{subject}}
Ngày gửi: {{date}}

Nội dung:
{{message}}

---
Trân trọng,
Website Xưởng In Đà Nẵng TGP
```

4. Copy **Template ID**

## Bước 4: Lấy Public Key

1. Vào **Account** > **General**
2. Copy **Public Key** (ví dụ: `abcdefghijklmnop`)

## Bước 5: Cấu Hình Trong Code

1. Mở file `index.html`
2. Tìm dòng: `emailjs.init("YOUR_PUBLIC_KEY");`
3. Thay `YOUR_PUBLIC_KEY` bằng Public Key của bạn

4. Mở file `utils/emailConfig.ts`
5. Điền các thông tin:

```typescript
export const emailConfig = {
  publicKey: 'YOUR_PUBLIC_KEY', // Thay bằng Public Key
  serviceId: 'YOUR_SERVICE_ID', // Thay bằng Service ID
  templates: {
    subscribe: 'YOUR_TEMPLATE_ID_SUBSCRIBE', // Template ID cho đăng ký
    contact: 'YOUR_TEMPLATE_ID_CONTACT' // Template ID cho liên hệ
  }
};
```

## Bước 6: Kiểm Tra

1. Chạy website: `npm run dev`
2. Thử đăng ký email ở footer
3. Thử gửi form liên hệ
4. Kiểm tra email inbox của bạn (có thể trong spam folder)

## Lưu Ý

- **Miễn phí**: 200 email/tháng
- **Gói trả phí**: Từ $15/tháng cho 1,000 email
- **Bảo mật**: EmailJS sử dụng Public Key, an toàn cho frontend
- **Rate Limit**: Không spam, giới hạn hợp lý

## Troubleshooting

### Email không gửi được?

1. Kiểm tra Public Key đã đúng chưa
2. Kiểm tra Service ID và Template ID
3. Kiểm tra email service đã kết nối chưa
4. Xem Console (F12) để kiểm tra lỗi
5. Kiểm tra spam folder

### Cần hỗ trợ?

- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

