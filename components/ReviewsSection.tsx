import React, { useState, useEffect } from 'react';

interface Review {
  id: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  product?: string;
  verified?: boolean;
}

const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Load from localStorage
    const savedReviews = localStorage.getItem('customer_reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        // Default reviews
        setReviews(getDefaultReviews());
      }
    } else {
      setReviews(getDefaultReviews());
    }

    // Listen for updates
    const handleReviewsUpdate = () => {
      const updatedReviews = localStorage.getItem('customer_reviews');
      if (updatedReviews) {
        try {
          setReviews(JSON.parse(updatedReviews));
        } catch (e) {
          // Keep current reviews on error
        }
      }
    };

    window.addEventListener('reviewsUpdated', handleReviewsUpdate);
    window.addEventListener('storage', handleReviewsUpdate);

    return () => {
      window.removeEventListener('reviewsUpdated', handleReviewsUpdate);
      window.removeEventListener('storage', handleReviewsUpdate);
    };
  }, []);

  const getDefaultReviews = (): Review[] => {
    return [
      {
        id: 'r1',
        customerName: 'Nguyễn Văn A',
        rating: 5,
        comment: 'Sản phẩm chất lượng cao, in logo rất đẹp và bền màu. Dịch vụ tư vấn nhiệt tình, giao hàng nhanh. Rất hài lòng!',
        date: '15/12/2024',
        product: 'Ly thủy tinh in logo',
        verified: true
      },
      {
        id: 'r2',
        customerName: 'Trần Thị B',
        rating: 5,
        comment: 'Đặt làm quà tặng cho nhân viên, sản phẩm đẹp, giá cả hợp lý. Logo in rõ nét, không bị phai màu sau nhiều lần sử dụng.',
        date: '10/12/2024',
        product: 'Bình giữ nhiệt in logo',
        verified: true
      },
      {
        id: 'r3',
        customerName: 'Lê Văn C',
        rating: 5,
        comment: 'Xưởng in chuyên nghiệp, thiết kế miễn phí đẹp. Sản phẩm đúng như mô tả, giao hàng đúng hẹn. Sẽ quay lại đặt tiếp!',
        date: '05/12/2024',
        product: 'Mũ bảo hiểm quảng cáo',
        verified: true
      },
      {
        id: 'r4',
        customerName: 'Phạm Thị D',
        rating: 4,
        comment: 'Chất lượng tốt, giá cả hợp lý. Logo in đẹp nhưng có thể cải thiện thêm về độ bền. Nhìn chung rất hài lòng.',
        date: '01/12/2024',
        product: 'Áo mưa quà tặng',
        verified: true
      },
      {
        id: 'r5',
        customerName: 'Hoàng Văn E',
        rating: 5,
        comment: 'Dịch vụ in logo theo yêu cầu rất chuyên nghiệp. Tư vấn tận tâm, sản phẩm chất lượng cao. Đặc biệt là freeship toàn quốc rất tiện!',
        date: '28/11/2024',
        verified: true
      },
      {
        id: 'r6',
        customerName: 'Võ Thị F',
        rating: 5,
        comment: 'Đặt quà tặng đại hội, số lượng lớn nhưng vẫn giao đúng hẹn. Sản phẩm đẹp, đóng gói cẩn thận. Rất recommend!',
        date: '25/11/2024',
        product: 'Set quà tặng doanh nghiệp',
        verified: true
      }
    ];
  };

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 my-8 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Đánh Giá Từ Khách Hàng
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-2xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-600">
                ({reviews.length} đánh giá)
              </span>
            </div>
          </div>
          <p className="text-gray-600">
            Hàng nghìn khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng tôi
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{review.customerName}</h4>
                    {review.verified && (
                      <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">
                        ✓ Đã xác thực
                      </span>
                    )}
                  </div>
                  {review.product && (
                    <p className="text-xs text-gray-500 mb-2">{review.product}</p>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-3">
                {renderStars(review.rating)}
              </div>

              {/* Comment */}
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                "{review.comment}"
              </p>

              {/* Date */}
              <p className="text-xs text-gray-500">
                📅 {review.date}
              </p>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {reviews.length > 6 && (
          <div className="text-center mt-8">
            <button className="bg-primary-blue text-white px-6 py-3 rounded-lg hover:bg-primary-blue-dark transition font-semibold">
              Xem Tất Cả Đánh Giá ({reviews.length})
            </button>
          </div>
        )}

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'Xưởng In Đà Nẵng TGP',
              'aggregateRating': {
                '@type': 'AggregateRating',
                'ratingValue': averageRating.toFixed(1),
                'reviewCount': reviews.length,
                'bestRating': '5',
                'worstRating': '1'
              },
              'review': reviews.slice(0, 5).map(review => ({
                '@type': 'Review',
                'author': {
                  '@type': 'Person',
                  'name': review.customerName
                },
                'datePublished': review.date,
                'reviewBody': review.comment,
                'reviewRating': {
                  '@type': 'Rating',
                  'ratingValue': review.rating,
                  'bestRating': '5',
                  'worstRating': '1'
                }
              }))
            })
          }}
        />
      </div>
    </div>
  );
};

export default ReviewsSection;

