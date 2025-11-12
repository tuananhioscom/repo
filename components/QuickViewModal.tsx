import React, { useEffect } from 'react';
import type { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
          aria-label="Đóng"
        >
          ×
        </button>

        <div className="p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pr-8">
            {product.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg object-cover"
              />
              {product.discount && (
                <span className="absolute top-2 left-2 bg-primary-orange text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Mới
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              {/* Pricing */}
              <div className="mb-4">
                <div className="flex items-baseline space-x-3 mb-2">
                  <span className="text-3xl font-bold text-primary-blue">
                    {product.newPrice}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Mô tả sản phẩm</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p className="text-gray-500 text-xs mt-2 italic">
                  (Description placeholder)
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3">
                <button
                  className="w-full bg-primary-orange text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-orange-dark transition-colors"
                  onClick={() => {
                    alert('Đã thêm vào giỏ hàng!');
                    onClose();
                  }}
                >
                  Thêm vào giỏ hàng
                </button>
                <a
                  href={`/?product=${product.id || product.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="w-full text-primary-blue py-2 px-6 font-semibold hover:underline text-center block"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/?product=${product.id || product.name.toLowerCase().replace(/\s+/g, '-')}`;
                    onClose();
                  }}
                >
                  Xem chi tiết sản phẩm
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

