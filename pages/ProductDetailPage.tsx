import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { getAllProducts } from '../utils/productLoader';
import { addToCart } from '../utils/cart';
import type { Product } from '../types';

interface ProductDetailPageProps {
  productId?: string;
  productSlug?: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, productSlug }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = () => {
      const allProducts = getAllProducts();
      let foundProduct: Product | undefined;

      if (productId) {
        foundProduct = allProducts.find(p => p.id === productId || 
          p.name.toLowerCase().replace(/\s+/g, '-') === productId);
      } else if (productSlug) {
        foundProduct = allProducts.find(p => p.slug === productSlug || 
          p.name.toLowerCase().replace(/\s+/g, '-') === productSlug);
      }
      
      // Auto-generate slug if not exists
      if (foundProduct && !foundProduct.slug) {
        foundProduct.slug = foundProduct.name.toLowerCase().replace(/\s+/g, '-');
      }

      if (foundProduct) {
        // Ensure images array exists
        if (!foundProduct.images) {
          foundProduct.images = [foundProduct.image];
        }
        setProduct(foundProduct);
      }
      setLoading(false);
    };

    loadProduct();
  }, [productId, productSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-600">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const currentImage = images[selectedImageIndex] || product.image;

  // Generate breadcrumb
  const breadcrumbItems = [
    { label: 'Trang chủ', onClick: () => window.location.href = '/' },
    { label: 'Sản phẩm', onClick: () => window.location.href = '/#products' },
    { label: product.name }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>{product.metaTitle || `${product.name} - Xưởng In Đà Nẵng TGP`}</title>
        <meta name="description" content={product.metaDescription || product.description || `Mua ${product.name} tại Xưởng In Đà Nẵng TGP. ${product.newPrice}. Chất lượng cao, giá tốt.`} />
        <meta name="keywords" content={product.keywords || `${product.name}, quà tặng doanh nghiệp, in logo`} />
        <meta property="og:title" content={product.metaTitle || product.name} />
        <meta property="og:description" content={product.metaDescription || product.description || ''} />
        <meta property="og:image" content={currentImage} />
        <meta property="og:type" content="product" />
      </head>

      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Product Detail */}
          <div className="bg-white rounded-lg shadow-sm mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Product Images */}
              <div>
                {/* Main Image */}
                <div className="mb-4">
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-auto rounded-lg object-cover border border-gray-200"
                  />
                </div>

                {/* Thumbnail Images */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`border-2 rounded-lg overflow-hidden ${
                          selectedImageIndex === index
                            ? 'border-primary-blue'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} - Hình ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline space-x-3 mb-2">
                    <span className="text-4xl font-bold text-primary-blue">
                      {product.newPrice}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xl text-gray-500 line-through">
                        {product.oldPrice}
                      </span>
                    )}
                    {product.discount && (
                      <span className="bg-primary-orange text-white text-sm font-bold px-3 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  {product.isNew && (
                    <span className="inline-block bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      Sản phẩm mới
                    </span>
                  )}
                </div>

                {/* Short Description */}
                {product.description && (
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className="mb-6 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông số kỹ thuật</h3>
                    <dl className="space-y-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex">
                          <dt className="text-gray-600 font-medium w-1/3">{key}:</dt>
                          <dd className="text-gray-900 flex-1">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    className="w-full bg-primary-orange text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-orange-dark transition-colors"
                    onClick={() => {
                      addToCart({
                        id: product.id || product.name.toLowerCase().replace(/\s+/g, '-'),
                        name: product.name,
                        image: product.images?.[0] || product.image,
                        newPrice: product.newPrice,
                        oldPrice: product.oldPrice,
                        discount: product.discount
                      });
                      alert('✅ Đã thêm vào giỏ hàng!');
                    }}
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    className="w-full bg-primary-blue text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-blue-dark transition-colors"
                    onClick={() => alert('Liên hệ ngay!')}
                  >
                    Liên hệ đặt hàng
                  </button>
                </div>
              </div>
            </div>

            {/* Product Content */}
            {product.content && (
              <div className="border-t pt-8 px-6 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Mô tả chi tiết sản phẩm</h2>
                <div
                  className="prose max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.content }}
                />
              </div>
            )}

            {/* Structured Data for SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org/',
                  '@type': 'Product',
                  name: product.name,
                  image: images,
                  description: product.description || product.content || '',
                  offers: {
                    '@type': 'Offer',
                    price: product.newPrice.replace(/[^\d]/g, ''),
                    priceCurrency: 'VND',
                    availability: 'https://schema.org/InStock'
                  },
                  brand: {
                    '@type': 'Brand',
                    name: 'Xưởng In Đà Nẵng TGP'
                  }
                })
              }}
            />
          </div>

          {/* Related Products Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* This would show related products - can be implemented later */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;

