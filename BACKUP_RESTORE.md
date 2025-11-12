# Hướng Dẫn Backup & Restore Dữ Liệu

## ⚠️ Vấn Đề: LocalStorage Không Đi Theo Git

**LocalStorage** chỉ lưu trữ trên trình duyệt của bạn, **KHÔNG tự động đi theo Git** khi bạn commit code. Điều này có nghĩa là:

- ✅ Code (React components, logic) → Đi theo Git
- ❌ Dữ liệu trong localStorage (sản phẩm, tin tức, hình ảnh) → **KHÔNG đi theo Git**

## 💾 Giải Pháp: Export/Import Dữ Liệu

### Cách 1: Export Tất Cả Dữ Liệu (Khuyên Dùng)

1. Vào trang **Admin** (`/?page=ADMIN`)
2. Click nút **"💾 Export Tất Cả Dữ Liệu"**
3. File JSON sẽ được tải xuống với tên: `backup_all_data_YYYY-MM-DD.json`
4. File này bao gồm:
   - ✅ Tất cả sản phẩm (kèm hình ảnh Base64)
   - ✅ Tất cả danh mục
   - ✅ Tất cả tin tức (kèm hình ảnh Base64)
   - ✅ Tất cả đánh giá
   - ✅ Logo đối tác (kèm hình ảnh Base64)
   - ✅ Marquee banner text
   - ✅ Email đăng ký
   - ✅ Tin nhắn liên hệ

5. **Commit file JSON vào Git:**
   ```bash
   git add backup_all_data_2024-12-15.json
   git commit -m "Backup dữ liệu website"
   git push
   ```

### Cách 2: Import Dữ Liệu Đã Export

1. Vào trang **Admin**
2. Click nút **"📤 Import Dữ Liệu"**
3. Chọn file JSON đã export trước đó
4. Xác nhận import
5. Trang sẽ tự động reload và hiển thị dữ liệu mới

## 📋 Quy Trình Làm Việc Khuyên Dùng

### Khi Làm Việc Ở Local:

1. **Cập nhật dữ liệu** trong Admin (thêm sản phẩm, tin tức, upload hình ảnh...)
2. **Export dữ liệu** định kỳ (mỗi ngày hoặc sau mỗi lần cập nhật lớn)
3. **Commit file backup** vào Git để đồng bộ với team/server

### Khi Deploy Lên Server:

1. **Pull code mới nhất** từ Git
2. **Import file backup** mới nhất vào Admin
3. Dữ liệu sẽ được restore đầy đủ

## 🔄 Tự Động Hóa (Tùy Chọn)

Bạn có thể tạo script tự động export dữ liệu:

```bash
# Script tự động export (ví dụ)
# Có thể chạy định kỳ bằng cron job
```

## 📝 Lưu Ý Quan Trọng

1. **Hình ảnh Base64**: File backup có thể rất lớn vì chứa hình ảnh dưới dạng Base64
   - Giải pháp: Nên upload hình ảnh lên CDN/Cloud Storage và lưu URL thay vì Base64

2. **Bảo mật**: File backup chứa dữ liệu nhạy cảm
   - Không commit file backup vào Git public
   - Hoặc sử dụng `.gitignore` để loại trừ file backup

3. **Version Control**: 
   - Đặt tên file backup có ngày tháng: `backup_all_data_2024-12-15.json`
   - Giữ nhiều bản backup để có thể rollback nếu cần

## 🚀 Cải Tiến Tương Lai (Đề Xuất)

1. **Upload hình ảnh lên Cloud Storage** (Cloudinary, AWS S3, Imgur...)
   - Lưu URL thay vì Base64
   - Giảm kích thước file backup
   - Tăng tốc độ load

2. **Backend API** để lưu dữ liệu vào database
   - Dữ liệu tự động sync với Git qua CI/CD
   - Không cần export/import thủ công

3. **Auto-backup** định kỳ
   - Tự động export mỗi ngày
   - Tự động commit vào Git

