import React, { useRef, useState } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  helpText?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  value, 
  onChange, 
  label = "Hình ảnh",
  placeholder = "Nhập URL hình ảnh hoặc upload từ máy tính",
  helpText
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const addWatermark = (imageSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Không thể tạo canvas context'));
          return;
        }

        // Set canvas size to image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image
        ctx.drawImage(img, 0, 0);

        // Add watermark text
        const watermarkText = 'xuongindanang.com';
        const fontSize = Math.max(14, Math.min(img.width, img.height) * 0.025); // Responsive font size (2.5% of smaller dimension)
        ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        
        // Measure text width for background
        const textMetrics = ctx.measureText(watermarkText);
        const textWidth = textMetrics.width;
        const textHeight = fontSize;
        
        // Calculate position (bottom center with padding)
        const padding = fontSize * 0.8;
        const x = canvas.width / 2;
        const y = canvas.height - padding;
        
        // Draw semi-transparent background rectangle for better visibility
        const bgPadding = fontSize * 0.3;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(
          x - textWidth / 2 - bgPadding,
          y - textHeight - bgPadding,
          textWidth + bgPadding * 2,
          textHeight + bgPadding * 2
        );
        
        // Draw text with white color and shadow
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        
        // Draw text with stroke for better visibility
        ctx.strokeText(watermarkText, x, y);
        ctx.fillText(watermarkText, x, y);

        // Convert to base64
        try {
          const watermarkedImage = canvas.toDataURL('image/jpeg', 0.9);
          resolve(watermarkedImage);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error('Lỗi khi tải hình ảnh'));
      };

      img.src = imageSrc;
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file hình ảnh!');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước file không được vượt quá 5MB!');
      return;
    }

    setIsUploading(true);

    try {
      // Convert to base64 first
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;
          // Add watermark
          const watermarkedImage = await addWatermark(base64String);
          onChange(watermarkedImage);
          setIsUploading(false);
        } catch (error) {
          console.error('Lỗi khi thêm watermark:', error);
          // Fallback: use original image if watermark fails
          const base64String = reader.result as string;
          onChange(base64String);
          setIsUploading(false);
        }
      };
      reader.onerror = () => {
        alert('Lỗi khi đọc file!');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('Lỗi khi xử lý file!');
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          {label}
        </label>
      )}
      
      <div className="space-y-3">
        {/* URL Input */}
        <input
          type="text"
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />

        {/* Upload Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={isUploading}
            className="flex items-center gap-2 bg-primary-blue text-white px-4 py-2.5 rounded-lg hover:bg-primary-blue-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <span className="animate-spin">⏳</span> Đang tải...
              </>
            ) : (
              <>
                <span>📤</span> Upload từ máy tính
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              ✕ Xóa ảnh
            </button>
          )}
        </div>

        {/* Image Preview */}
        {value && (
          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-2">Xem trước:</p>
            <div className="border-2 border-gray-200 rounded-lg p-2 bg-gray-50">
              <img
                src={value}
                alt="Preview"
                className="max-w-full h-auto max-h-48 rounded object-contain mx-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {helpText && (
          <p className="text-xs text-gray-500 mt-1.5">{helpText}</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

