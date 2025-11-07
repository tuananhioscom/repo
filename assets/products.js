// Cơ sở dữ liệu sản phẩm với danh mục
const productsData = [
    // Danh mục Name Card
    {
        id: 1,
        name: "Name Card Cao Cấp",
        category: "business-cards",
        categoryName: "Name Card",
        price: "1.000.000đ",
        priceValue: 49.99,
        shortDescription: "Name card chuyên nghiệp với bề mặt hoàn thiện cao cấp",
        description: "Tạo ấn tượng lâu dài với name card cao cấp của chúng tôi. In trên giấy couche chất lượng cao với lựa chọn bề mặt mờ hoặc bóng. Hoàn hảo cho các sự kiện networking và gặp gỡ chuyên nghiệp.",
        image: "📇",
        specs: [
            "Kích thước: 9cm x 5.4cm (Chuẩn)",
            "Chất liệu: Giấy Couche 350gsm",
            "Hoàn thiện: Mờ hoặc Bóng",
            "In ấn: Màu đầy đủ 2 mặt",
            "Số lượng tối thiểu: 100 card"
        ],
        options: [
            "Bề mặt mờ",
            "Bề mặt bóng",
            "Bo góc tròn",
            "Phủ UV cục bộ",
            "Tráng kim loại"
        ]
    },
    {
        id: 2,
        name: "Name Card Đẳng Cấp",
        category: "business-cards",
        categoryName: "Name Card",
        price: "1.800.000đ",
        priceValue: 89.99,
        shortDescription: "Name card siêu dày với lớp hoàn thiện đặc biệt",
        description: "Nổi bật với name card đẳng cấp của chúng tôi với giấy siêu dày và các tùy chọn hoàn thiện cao cấp bao gồm tráng kim loại, dập nổi và phủ lụa.",
        image: "💳",
        specs: [
            "Kích thước: 9cm x 5.4cm (Chuẩn)",
            "Chất liệu: Giấy Couche 600gsm siêu dày",
            "Hoàn thiện: Lụa, Mềm mại hoặc Kim loại",
            "In ấn: Màu đầy đủ 2 mặt",
            "Số lượng tối thiểu: 100 card"
        ],
        options: [
            "Phủ lụa",
            "Bề mặt mềm mại",
            "Tráng vàng/bạc",
            "Dập nổi/Dập lõm",
            "Sơn viền màu"
        ]
    },

    // Danh mục Tờ Rơi
    {
        id: 3,
        name: "Tờ Rơi A5",
        category: "flyers",
        categoryName: "Tờ rơi",
        price: "1.600.000đ",
        priceValue: 79.99,
        shortDescription: "Tờ rơi khuyến mại A5 bắt mắt",
        description: "Hoàn hảo cho khuyến mại, sự kiện và quảng cáo. Tờ rơi A5 của chúng tôi được in trên giấy chất lượng cao với màu sắc sống động thu hút sự chú ý.",
        image: "📄",
        specs: [
            "Kích thước: A5 (148mm x 210mm)",
            "Chất liệu: Giấy Couche 150gsm",
            "In ấn: Màu đầy đủ 1 mặt/2 mặt",
            "Hoàn thiện: Bóng hoặc Mờ",
            "Số lượng tối thiểu: 250 tờ"
        ],
        options: [
            "In 1 mặt",
            "In 2 mặt",
            "Bề mặt bóng",
            "Bề mặt mờ",
            "Giấy 200gsm cao cấp"
        ]
    },
    {
        id: 4,
        name: "Tờ Gấp DL",
        category: "flyers",
        categoryName: "Tờ rơi",
        price: "1.200.000đ",
        priceValue: 59.99,
        shortDescription: "Tờ gấp kích thước DL nhỏ gọn cho gửi thư trực tiếp",
        description: "Lý tưởng cho các chiến dịch gửi thư trực tiếp và tài liệu phát tay. Tờ gấp DL vừa vặn trong phong bì tiêu chuẩn và dễ dàng phân phối.",
        image: "📃",
        specs: [
            "Kích thước: DL (99mm x 210mm)",
            "Chất liệu: Giấy Couche 150gsm",
            "In ấn: Màu đầy đủ 2 mặt",
            "Hoàn thiện: Bóng hoặc Mờ",
            "Số lượng tối thiểu: 500 tờ"
        ],
        options: [
            "Bề mặt bóng",
            "Bề mặt mờ",
            "Bề mặt lụa",
            "Tùy chọn gấp"
        ]
    },

    // Danh mục Brochure
    {
        id: 5,
        name: "Brochure Gấp 3",
        category: "brochures",
        categoryName: "Brochure",
        price: "3.000.000đ",
        priceValue: 149.99,
        shortDescription: "Brochure gấp 3 chuyên nghiệp",
        description: "Giới thiệu doanh nghiệp của bạn với brochure gấp 3 sang trọng. Hoàn hảo cho catalog sản phẩm, menu dịch vụ và bài thuyết trình công ty.",
        image: "📋",
        specs: [
            "Kích thước: A4 (gấp thành DL)",
            "Chất liệu: Giấy Couche 170gsm",
            "In ấn: Màu đầy đủ 2 mặt",
            "Gấp: Gấp 3 (2 nếp gấp)",
            "Số lượng tối thiểu: 100 brochure"
        ],
        options: [
            "Bề mặt bóng",
            "Bề mặt mờ",
            "Bề mặt lụa",
            "Giấy 250gsm cao cấp",
            "Gấp tùy chỉnh"
        ]
    },
    {
        id: 6,
        name: "Brochure Dạng Sách A4",
        category: "brochures",
        categoryName: "Brochure",
        price: "4.000.000đ",
        priceValue: 199.99,
        shortDescription: "Brochure dạng sách A4 nhiều trang",
        description: "Brochure dạng sách toàn diện hoàn hảo cho catalog sản phẩm chi tiết, hồ sơ công ty và bài thuyết trình mở rộng. Đóng gáy chuyên nghiệp.",
        image: "📖",
        specs: [
            "Kích thước: A4 (210mm x 297mm)",
            "Chất liệu: Ruột 150gsm, bìa 250gsm",
            "Số trang: 8-48 trang",
            "Đóng gáy: Gáy kẹp",
            "Số lượng tối thiểu: 50 brochure"
        ],
        options: [
            "8, 12, 16, 24 hoặc 48 trang",
            "Bìa bóng hoặc mờ",
            "Nâng cấp giấy cao cấp",
            "Đóng gáy hoàn hảo (từ 48+ trang)"
        ]
    },

    // Danh mục Poster & Banner
    {
        id: 7,
        name: "Poster A3",
        category: "posters",
        categoryName: "Poster & Banner",
        price: "600.000đ",
        priceValue: 29.99,
        shortDescription: "Poster khuyến mại A3 chất lượng cao",
        description: "Làm nổi bật thông điệp của bạn với poster A3 sống động. Hoàn hảo cho trưng bày bán lẻ, khuyến mại sự kiện và thông báo văn phòng.",
        image: "🖼️",
        specs: [
            "Kích thước: A3 (297mm x 420mm)",
            "Chất liệu: Giấy Couche 170gsm",
            "In ấn: Màu đầy đủ",
            "Hoàn thiện: Bóng hoặc Mờ",
            "Số lượng tối thiểu: 10 poster"
        ],
        options: [
            "Bề mặt bóng",
            "Bề mặt mờ",
            "Nâng cấp kích thước A2/A1",
            "Ép plastic",
            "Dán foam"
        ]
    },
    {
        id: 8,
        name: "Banner Bạt Hiflex",
        category: "posters",
        categoryName: "Poster & Banner",
        price: "2.400.000đ",
        priceValue: 119.99,
        shortDescription: "Banner bạt hiflex bền bỉ ngoài trời",
        description: "Banner bạt chống thời tiết hoàn hảo cho quảng cáo ngoài trời, sự kiện và trưng bày cửa hàng. Bao gồm khoen để dễ dàng treo.",
        image: "🏴",
        specs: [
            "Kích thước: Kích thước tùy chỉnh",
            "Chất liệu: Bạt PVC 440gsm",
            "In ấn: Màu đầy đủ chống UV",
            "Khoen: Mỗi 50cm",
            "Số lượng tối thiểu: 1 banner"
        ],
        options: [
            "Bạt tiêu chuẩn",
            "Bạt lưới (chống gió)",
            "Túi cắm cột",
            "Khoen bổ sung",
            "Viền may"
        ]
    },
    {
        id: 9,
        name: "Banner Cuốn",
        category: "posters",
        categoryName: "Poster & Banner",
        price: "3.200.000đ",
        priceValue: 159.99,
        shortDescription: "Giá đỡ banner cuốn di động",
        description: "Banner cuốn chuyên nghiệp với cơ chế cuốn lại và túi đựng. Hoàn hảo cho hội chợ thương mại, triển lãm và thuyết trình.",
        image: "📊",
        specs: [
            "Kích thước: 800mm x 2000mm",
            "Chất liệu: Banner PVC 280gsm",
            "Giá đỡ: Đế nhôm cao cấp",
            "Trọng lượng: Nhẹ & Di động",
            "Bao gồm: Túi đựng"
        ],
        options: [
            "Kích thước tiêu chuẩn (800mm)",
            "Kích thước rộng (1000mm)",
            "Đế cao cấp Plus",
            "In 2 mặt"
        ]
    },

    // Danh mục Văn Phòng Phẩm
    {
        id: 10,
        name: "Giấy Tiêu Đề",
        category: "stationery",
        categoryName: "Văn phòng phẩm",
        price: "1.400.000đ",
        priceValue: 69.99,
        shortDescription: "Giấy tiêu đề có thương hiệu chuyên nghiệp",
        description: "Thiết lập bản sắc thương hiệu của bạn với giấy tiêu đề tùy chỉnh. Hoàn hảo cho thư từ chính thức và giao tiếp kinh doanh.",
        image: "📝",
        specs: [
            "Kích thước: A4 (210mm x 297mm)",
            "Chất liệu: Giấy Bond 100gsm cao cấp",
            "In ấn: Màu đầy đủ",
            "Hoàn thiện: Mịn",
            "Số lượng tối thiểu: 250 tờ"
        ],
        options: [
            "In 1 mặt",
            "In 2 mặt",
            "Nâng cấp 120gsm",
            "Giấy có watermark"
        ]
    },
    {
        id: 11,
        name: "Phiếu Kèm Theo",
        category: "stationery",
        categoryName: "Văn phòng phẩm",
        price: "800.000đ",
        priceValue: 39.99,
        shortDescription: "Phiếu kèm theo có thương hiệu",
        description: "Nhỏ nhưng có tác động lớn, phiếu kèm theo tạo điểm chạm chuyên nghiệp cho gói hàng và thư từ của bạn.",
        image: "🎫",
        specs: [
            "Kích thước: DL (99mm x 210mm)",
            "Chất liệu: Giấy cao cấp 120gsm",
            "In ấn: Màu đầy đủ 1 mặt",
            "Hoàn thiện: Mịn",
            "Số lượng tối thiểu: 500 phiếu"
        ],
        options: [
            "Bề mặt bóng",
            "Bề mặt mờ",
            "Viền đục lỗ"
        ]
    },
    {
        id: 12,
        name: "Sổ Tay",
        category: "stationery",
        categoryName: "Văn phòng phẩm",
        price: "1.800.000đ",
        priceValue: 89.99,
        shortDescription: "Sổ tay có thương hiệu tùy chỉnh",
        description: "Giữ thương hiệu của bạn luôn được nhớ đến với sổ tay tùy chỉnh. Hoàn hảo để sử dụng trên bàn làm việc và quà tặng khách hàng.",
        image: "📒",
        specs: [
            "Kích thước: A5 hoặc A4",
            "Chất liệu: Giấy Offset 80gsm",
            "Số trang: 50 tờ mỗi cuốn",
            "Đóng gáy: Dán cạnh trên",
            "Số lượng tối thiểu: 10 cuốn"
        ],
        options: [
            "Kích thước A5 hoặc A4",
            "50 hoặc 100 tờ",
            "Lót bìa cứng",
            "Header màu đầy đủ"
        ]
    },

    // Danh mục Bao Bì
    {
        id: 13,
        name: "Hộp Tùy Chỉnh",
        category: "packaging",
        categoryName: "Bao bì",
        price: "6.000.000đ",
        priceValue: 299.99,
        shortDescription: "Hộp đóng gói sản phẩm có thương hiệu",
        description: "Nâng cao cách trình bày sản phẩm của bạn với hộp in tùy chỉnh. Hoàn hảo cho sản phẩm bán lẻ, quà tặng và bao bì thương mại điện tử.",
        image: "📦",
        specs: [
            "Kích thước: Kích thước tùy chỉnh",
            "Chất liệu: Bìa sóng E-flute",
            "In ấn: Màu đầy đủ CMYK",
            "Kiểu dáng: Hộp cài, Hộp thư hoặc Tùy chỉnh",
            "Số lượng tối thiểu: 100 hộp"
        ],
        options: [
            "Phủ mờ",
            "Phủ bóng",
            "UV cục bộ",
            "Dập kim loại",
            "Cửa sổ cắt"
        ]
    },
    {
        id: 14,
        name: "Nhãn Sản Phẩm",
        category: "packaging",
        categoryName: "Bao bì",
        price: "1.600.000đ",
        priceValue: 79.99,
        shortDescription: "Nhãn sản phẩm in tùy chỉnh",
        description: "Nhãn sản phẩm chuyên nghiệp cho thương hiệu, thành phần, cảnh báo và nhiều hơn nữa. Có sẵn nhiều hình dạng và kích thước.",
        image: "🏷️",
        specs: [
            "Kích thước: Tùy chỉnh (từ 25mm x 25mm)",
            "Chất liệu: Giấy nhãn bóng hoặc mờ",
            "In ấn: Màu đầy đủ",
            "Hoàn thiện: Nhiều tùy chọn",
            "Số lượng tối thiểu: 500 nhãn"
        ],
        options: [
            "Tròn, Vuông hoặc Hình dạng tùy chỉnh",
            "Bề mặt bóng",
            "Bề mặt mờ",
            "Nhãn trong suốt",
            "Chất liệu chống nước"
        ]
    },
    {
        id: 15,
        name: "Tấm Decal",
        category: "packaging",
        categoryName: "Bao bì",
        price: "1.200.000đ",
        priceValue: 59.99,
        shortDescription: "Tấm decal tùy chỉnh cho thương hiệu",
        description: "Tấm decal thú vị và linh hoạt hoàn hảo cho thương hiệu, khuyến mại và tem niêm phong bao bì. Cắt kiss dễ bóc.",
        image: "✨",
        specs: [
            "Kích thước: Tấm A6",
            "Chất liệu: Decal Vinyl",
            "In ấn: Màu đầy đủ",
            "Hoàn thiện: Bóng hoặc Mờ",
            "Số lượng tối thiểu: 50 tấm"
        ],
        options: [
            "Vinyl bóng",
            "Vinyl mờ",
            "Chống thời tiết",
            "Nền trắng hoặc trong",
            "Hình dạng cắt tùy chỉnh"
        ]
    },

    // Danh mục Quà tặng doanh nghiệp
    {
        id: 16,
        name: "Ly Thủy Tinh In Logo",
        category: "corporate-gifts",
        categoryName: "Quà tặng doanh nghiệp",
        price: "800.000đ",
        priceValue: 40.00,
        shortDescription: "Ly thủy tinh cao cấp in logo thương hiệu",
        description: "Ly thủy tinh in logo chuyên nghiệp, phù hợp cho quà tặng doanh nghiệp, sự kiện, hội nghị. In logo sắc nét, bền đẹp theo thời gian.",
        image: "🥃",
        specs: [
            "Chất liệu: Thủy tinh cao cấp",
            "Dung tích: 225ml - 350ml",
            "In ấn: Logo 1-4 màu",
            "Kỹ thuật: In lụa/Khắc laser",
            "Số lượng tối thiểu: 50 chiếc"
        ],
        options: [
            "Ly thủy tinh trụ",
            "Ly thủy tinh côn",
            "In logo 1 màu",
            "In logo full màu",
            "Khắc laser logo"
        ]
    },
    {
        id: 17,
        name: "Cốc Sứ In Logo",
        category: "corporate-gifts",
        categoryName: "Quà tặng doanh nghiệp",
        price: "1.200.000đ",
        priceValue: 60.00,
        shortDescription: "Cốc sứ cao cấp in logo doanh nghiệp",
        description: "Cốc sứ in logo chất lượng cao, phù hợp làm quà tặng khách hàng, nhân viên. Logo in sắc nét, không phai màu khi sử dụng lâu dài.",
        image: "☕",
        specs: [
            "Chất liệu: Sứ trắng cao cấp",
            "Dung tích: 300ml - 400ml",
            "In ấn: In nhiệt/In chuyển nhiệt",
            "Màu sắc: Trắng hoặc Màu",
            "Số lượng tối thiểu: 50 chiếc"
        ],
        options: [
            "Cốc sứ trắng",
            "Cốc sứ màu",
            "In logo đơn giản",
            "In ảnh/thiết kế phức tạp",
            "Đóng hộp quà tặng"
        ]
    },
    {
        id: 18,
        name: "Bình Giữ Nhiệt In Logo",
        category: "corporate-gifts",
        categoryName: "Quà tặng doanh nghiệp",
        price: "2.500.000đ",
        priceValue: 125.00,
        shortDescription: "Bình giữ nhiệt inox in logo cao cấp",
        description: "Bình giữ nhiệt inox 304 cao cấp, in logo doanh nghiệp bền đẹp. Giữ nhiệt hiệu quả 6-12 giờ, quà tặng ý nghĩa cho khách hàng và đối tác.",
        image: "🍶",
        specs: [
            "Chất liệu: Inox 304 cao cấp",
            "Dung tích: 500ml - 1000ml",
            "Giữ nhiệt: 6-12 giờ",
            "In ấn: Khắc laser/In UV",
            "Số lượng tối thiểu: 30 chiếc"
        ],
        options: [
            "Bình 500ml",
            "Bình 750ml",
            "Bình 1000ml",
            "Khắc laser logo",
            "In UV full màu"
        ]
    },
    {
        id: 19,
        name: "Bộ Ấm Chén In Logo",
        category: "corporate-gifts",
        categoryName: "Quà tặng doanh nghiệp",
        price: "3.500.000đ",
        priceValue: 175.00,
        shortDescription: "Bộ ấm trà sứ cao cấp in logo",
        description: "Bộ ấm chén sứ cao cấp in logo thương hiệu, quà tặng sang trọng cho đối tác, khách hàng VIP. Thiết kế tinh tế, chất lượng bền bỉ.",
        image: "🫖",
        specs: [
            "Chất liệu: Sứ cao cấp",
            "Bộ gồm: 1 ấm + 4-6 chén",
            "In ấn: In nhiệt cao cấp",
            "Đóng gói: Hộp quà sang trọng",
            "Số lượng tối thiểu: 20 bộ"
        ],
        options: [
            "Bộ 1 ấm + 4 chén",
            "Bộ 1 ấm + 6 chén",
            "Sứ trắng truyền thống",
            "Sứ màu hiện đại",
            "In logo vàng kim"
        ]
    },

    // Danh mục Sản phẩm quảng cáo
    {
        id: 20,
        name: "Áo Mưa In Logo",
        category: "promotional-products",
        categoryName: "Sản phẩm quảng cáo",
        price: "1.500.000đ",
        priceValue: 75.00,
        shortDescription: "Áo mưa quảng cáo in logo thương hiệu",
        description: "Áo mưa in logo chất lượng cao, phù hợp cho sự kiện, marketing. Chất liệu PE/PVC dày dặn, chống thấm tốt, in logo sắc nét.",
        image: "🧥",
        specs: [
            "Chất liệu: PE/PVC dày",
            "Kích thước: Free size hoặc theo yêu cầu",
            "In ấn: In lụa 1-4 màu",
            "Đóng gói: Túi zip/Hộp nhựa",
            "Số lượng tối thiểu: 200 chiếc"
        ],
        options: [
            "Áo mưa cánh dơi",
            "Áo mưa bộ (áo + quần)",
            "In logo ngực",
            "In logo lưng",
            "Nhiều màu sắc"
        ]
    },
    {
        id: 21,
        name: "Mũ Bảo Hiểm In Logo",
        category: "promotional-products",
        categoryName: "Sản phẩm quảng cáo",
        price: "3.000.000đ",
        priceValue: 150.00,
        shortDescription: "Mũ bảo hiểm quảng cáo in logo",
        description: "Mũ bảo hiểm quảng cáo chất lượng, đạt chuẩn an toàn. In logo thương hiệu nổi bật, phù hợp cho chiến dịch marketing, quà tặng khách hàng.",
        image: "🪖",
        specs: [
            "Chất liệu: Nhựa ABS cao cấp",
            "Tiêu chuẩn: CR/QCVN 2:2008",
            "In ấn: Decal/In lụa",
            "Màu sắc: Đa dạng",
            "Số lượng tối thiểu: 100 chiếc"
        ],
        options: [
            "Mũ 1/2 đầu",
            "Mũ 3/4 đầu",
            "In decal logo",
            "In lụa logo",
            "Nhiều màu sắc"
        ]
    },
    {
        id: 22,
        name: "Ô Dù Cầm Tay In Logo",
        category: "promotional-products",
        categoryName: "Sản phẩm quảng cáo",
        price: "2.200.000đ",
        priceValue: 110.00,
        shortDescription: "Ô dù quảng cáo in logo thương hiệu",
        description: "Ô dù cầm tay in logo chuyên nghiệp, phù hợp cho quà tặng doanh nghiệp, sự kiện. Chất liệu bền, chống UV, in logo sắc nét trên vải.",
        image: "☂️",
        specs: [
            "Loại: Ô dù cầm tay/tự động",
            "Đường kính: 100cm - 120cm",
            "Chất liệu vải: Polyester cao cấp",
            "In ấn: In lụa/In nhiệt",
            "Số lượng tối thiểu: 50 chiếc"
        ],
        options: [
            "Ô dù gấp 3 tự động",
            "Ô dù cầm tay thẳng",
            "In logo 1 màu",
            "In logo full màu",
            "Nhiều màu vải"
        ]
    },
    {
        id: 23,
        name: "Túi Vải Canvas In Logo",
        category: "promotional-products",
        categoryName: "Sản phẩm quảng cáo",
        price: "1.800.000đ",
        priceValue: 90.00,
        shortDescription: "Túi vải canvas thân thiện môi trường",
        description: "Túi vải canvas in logo chất lượng cao, thân thiện môi trường. Phù hợp cho chiến dịch marketing xanh, quà tặng doanh nghiệp bền vững.",
        image: "👜",
        specs: [
            "Chất liệu: Canvas 100% cotton",
            "Kích thước: 35x40cm (hoặc tùy chỉnh)",
            "In ấn: In lụa/In nhiệt chuyển",
            "Màu sắc: Trắng/Be/Màu",
            "Số lượng tối thiểu: 100 chiếc"
        ],
        options: [
            "Túi canvas trắng",
            "Túi canvas màu be",
            "In logo đơn giản",
            "In thiết kế phức tạp",
            "Có túi nhỏ bên trong"
        ]
    }
];

// Bản đồ danh mục để truy cập dễ dàng
const categories = {
    all: "Tất cả sản phẩm",
    "business-cards": "Name Card",
    flyers: "Tờ rơi",
    brochures: "Brochure",
    posters: "Poster & Banner",
    stationery: "Văn phòng phẩm",
    packaging: "Bao bì",
    "corporate-gifts": "Quà tặng doanh nghiệp",
    "promotional-products": "Sản phẩm quảng cáo"
};
