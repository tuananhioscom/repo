// Product Database with Categories (Folders)
const productsData = [
    // Business Cards Category
    {
        id: 1,
        name: "Premium Business Cards",
        category: "business-cards",
        categoryName: "Business Cards",
        price: "$49.99",
        priceValue: 49.99,
        shortDescription: "Professional business cards with premium finish",
        description: "Make a lasting impression with our premium business cards. Printed on high-quality cardstock with your choice of matte or glossy finish. Perfect for networking events and professional meetings.",
        image: "📇",
        specs: [
            "Size: 3.5\" x 2\" (Standard)",
            "Material: 350gsm Premium Cardstock",
            "Finish: Matte or Glossy",
            "Printing: Full Color Both Sides",
            "Minimum Order: 100 cards"
        ],
        options: [
            "Matte Finish",
            "Glossy Finish",
            "Rounded Corners",
            "Spot UV Coating",
            "Metallic Foil"
        ]
    },
    {
        id: 2,
        name: "Luxury Business Cards",
        category: "business-cards",
        categoryName: "Business Cards",
        price: "$89.99",
        priceValue: 89.99,
        shortDescription: "Ultra-thick premium cards with special finishes",
        description: "Stand out with our luxury business cards featuring ultra-thick cardstock and premium finishing options including metallic foil, embossing, and silk lamination.",
        image: "💳",
        specs: [
            "Size: 3.5\" x 2\" (Standard)",
            "Material: 600gsm Ultra-thick Cardstock",
            "Finish: Silk, Soft-touch, or Metallic",
            "Printing: Full Color Both Sides",
            "Minimum Order: 100 cards"
        ],
        options: [
            "Silk Lamination",
            "Soft-touch Finish",
            "Gold/Silver Foil",
            "Embossing/Debossing",
            "Edge Painting"
        ]
    },

    // Flyers & Leaflets Category
    {
        id: 3,
        name: "A5 Flyers",
        category: "flyers",
        categoryName: "Flyers & Leaflets",
        price: "$79.99",
        priceValue: 79.99,
        shortDescription: "Eye-catching A5 promotional flyers",
        description: "Perfect for promotions, events, and advertising. Our A5 flyers are printed on high-quality paper with vibrant colors that grab attention.",
        image: "📄",
        specs: [
            "Size: A5 (148mm x 210mm)",
            "Material: 150gsm Gloss Art Paper",
            "Printing: Full Color Single/Double Sided",
            "Finish: Gloss or Matte",
            "Minimum Order: 250 flyers"
        ],
        options: [
            "Single Sided",
            "Double Sided",
            "Gloss Finish",
            "Matte Finish",
            "Premium 200gsm Paper"
        ]
    },
    {
        id: 4,
        name: "DL Leaflets",
        category: "flyers",
        categoryName: "Flyers & Leaflets",
        price: "$59.99",
        priceValue: 59.99,
        shortDescription: "Compact DL size leaflets for direct mail",
        description: "Ideal for direct mail campaigns and handouts. DL leaflets fit perfectly in standard envelopes and are easy to distribute.",
        image: "📃",
        specs: [
            "Size: DL (99mm x 210mm)",
            "Material: 150gsm Gloss Art Paper",
            "Printing: Full Color Double Sided",
            "Finish: Gloss or Matte",
            "Minimum Order: 500 leaflets"
        ],
        options: [
            "Gloss Finish",
            "Matte Finish",
            "Silk Finish",
            "Folded Options"
        ]
    },

    // Brochures Category
    {
        id: 5,
        name: "Tri-fold Brochures",
        category: "brochures",
        categoryName: "Brochures",
        price: "$149.99",
        priceValue: 149.99,
        shortDescription: "Professional tri-fold brochures",
        description: "Showcase your business with elegant tri-fold brochures. Perfect for product catalogs, service menus, and corporate presentations.",
        image: "📋",
        specs: [
            "Size: A4 (folded to DL)",
            "Material: 170gsm Gloss Art Paper",
            "Printing: Full Color Both Sides",
            "Folding: Tri-fold (2 creases)",
            "Minimum Order: 100 brochures"
        ],
        options: [
            "Gloss Finish",
            "Matte Finish",
            "Silk Finish",
            "Premium 250gsm Paper",
            "Custom Folding"
        ]
    },
    {
        id: 6,
        name: "A4 Booklet Brochures",
        category: "brochures",
        categoryName: "Brochures",
        price: "$199.99",
        priceValue: 199.99,
        shortDescription: "Multi-page A4 booklet style brochures",
        description: "Comprehensive booklet brochures perfect for detailed product catalogs, company profiles, and extensive presentations. Professionally bound with saddle stitch.",
        image: "📖",
        specs: [
            "Size: A4 (210mm x 297mm)",
            "Material: 150gsm inner, 250gsm cover",
            "Pages: 8-48 pages",
            "Binding: Saddle Stitch",
            "Minimum Order: 50 brochures"
        ],
        options: [
            "8, 12, 16, 24, or 48 pages",
            "Gloss or Matte Cover",
            "Premium Paper Upgrade",
            "Perfect Binding (for 48+ pages)"
        ]
    },

    // Posters & Banners Category
    {
        id: 7,
        name: "A3 Posters",
        category: "posters",
        categoryName: "Posters & Banners",
        price: "$29.99",
        priceValue: 29.99,
        shortDescription: "High-quality A3 promotional posters",
        description: "Make your message visible with vibrant A3 posters. Perfect for retail displays, event promotions, and office notices.",
        image: "🖼️",
        specs: [
            "Size: A3 (297mm x 420mm)",
            "Material: 170gsm Gloss Art Paper",
            "Printing: Full Color",
            "Finish: Gloss or Matte",
            "Minimum Order: 10 posters"
        ],
        options: [
            "Gloss Finish",
            "Matte Finish",
            "A2/A1 Size Upgrade",
            "Encapsulation",
            "Foam Board Mounting"
        ]
    },
    {
        id: 8,
        name: "Vinyl Banners",
        category: "posters",
        categoryName: "Posters & Banners",
        price: "$119.99",
        priceValue: 119.99,
        shortDescription: "Durable outdoor vinyl banners",
        description: "Weather-resistant vinyl banners perfect for outdoor advertising, events, and storefront displays. Includes eyelets for easy hanging.",
        image: "🏴",
        specs: [
            "Size: Custom sizes available",
            "Material: 440gsm PVC Vinyl",
            "Printing: Full Color UV Resistant",
            "Eyelets: Every 50cm",
            "Minimum Order: 1 banner"
        ],
        options: [
            "Standard Vinyl",
            "Mesh Vinyl (wind-resistant)",
            "Pole Pockets",
            "Additional Eyelets",
            "Hemmed Edges"
        ]
    },
    {
        id: 9,
        name: "Pull-up Banners",
        category: "posters",
        categoryName: "Posters & Banners",
        price: "$159.99",
        priceValue: 159.99,
        shortDescription: "Portable retractable banner stands",
        description: "Professional pull-up banners with retractable mechanism and carry case. Perfect for trade shows, exhibitions, and presentations.",
        image: "📊",
        specs: [
            "Size: 800mm x 2000mm",
            "Material: 280gsm PVC Banner",
            "Stand: Premium Aluminum Base",
            "Weight: Lightweight & Portable",
            "Includes: Carry Case"
        ],
        options: [
            "Standard Size (800mm)",
            "Wide Size (1000mm)",
            "Premium Plus Base",
            "Double-sided Printing"
        ]
    },

    // Stationery Category
    {
        id: 10,
        name: "Letterheads",
        category: "stationery",
        categoryName: "Stationery",
        price: "$69.99",
        priceValue: 69.99,
        shortDescription: "Professional branded letterheads",
        description: "Establish your brand identity with custom letterheads. Perfect for official correspondence and business communication.",
        image: "📝",
        specs: [
            "Size: A4 (210mm x 297mm)",
            "Material: 100gsm Premium Bond Paper",
            "Printing: Full Color",
            "Finish: Smooth",
            "Minimum Order: 250 sheets"
        ],
        options: [
            "Single Sided",
            "Double Sided",
            "120gsm Upgrade",
            "Watermark Paper"
        ]
    },
    {
        id: 11,
        name: "Compliment Slips",
        category: "stationery",
        categoryName: "Stationery",
        price: "$39.99",
        priceValue: 39.99,
        shortDescription: "Branded compliment slips",
        description: "Small but impactful, compliment slips add a professional touch to your packages and correspondence.",
        image: "🎫",
        specs: [
            "Size: DL (99mm x 210mm)",
            "Material: 120gsm Premium Paper",
            "Printing: Full Color Single Sided",
            "Finish: Smooth",
            "Minimum Order: 500 slips"
        ],
        options: [
            "Gloss Finish",
            "Matte Finish",
            "Perforated Edge"
        ]
    },
    {
        id: 12,
        name: "Notepads",
        category: "stationery",
        categoryName: "Stationery",
        price: "$89.99",
        priceValue: 89.99,
        shortDescription: "Custom branded notepads",
        description: "Keep your brand top-of-mind with custom notepads. Perfect for desk use and customer giveaways.",
        image: "📒",
        specs: [
            "Size: A5 or A4",
            "Material: 80gsm Offset Paper",
            "Pages: 50 sheets per pad",
            "Binding: Glued top edge",
            "Minimum Order: 10 pads"
        ],
        options: [
            "A5 or A4 Size",
            "50 or 100 sheets",
            "Cardboard Backing",
            "Full Color Header"
        ]
    },

    // Packaging Category
    {
        id: 13,
        name: "Custom Boxes",
        category: "packaging",
        categoryName: "Packaging",
        price: "$299.99",
        priceValue: 299.99,
        shortDescription: "Branded product packaging boxes",
        description: "Elevate your product presentation with custom printed boxes. Perfect for retail products, gifts, and e-commerce packaging.",
        image: "📦",
        specs: [
            "Size: Custom sizes available",
            "Material: E-flute Corrugated Board",
            "Printing: Full Color CMYK",
            "Style: Tuck-end, Mailer, or Custom",
            "Minimum Order: 100 boxes"
        ],
        options: [
            "Matte Lamination",
            "Gloss Lamination",
            "Spot UV",
            "Foil Stamping",
            "Die-cut Windows"
        ]
    },
    {
        id: 14,
        name: "Product Labels",
        category: "packaging",
        categoryName: "Packaging",
        price: "$79.99",
        priceValue: 79.99,
        shortDescription: "Custom printed product labels",
        description: "Professional product labels for branding, ingredients, warnings, and more. Available in various shapes and sizes.",
        image: "🏷️",
        specs: [
            "Size: Custom (from 25mm x 25mm)",
            "Material: Gloss or Matte Label Stock",
            "Printing: Full Color",
            "Finish: Various options",
            "Minimum Order: 500 labels"
        ],
        options: [
            "Circle, Square, or Custom Shape",
            "Gloss Finish",
            "Matte Finish",
            "Clear Labels",
            "Waterproof Material"
        ]
    },
    {
        id: 15,
        name: "Sticker Sheets",
        category: "packaging",
        categoryName: "Packaging",
        price: "$59.99",
        priceValue: 59.99,
        shortDescription: "Custom sticker sheets for branding",
        description: "Fun and versatile sticker sheets perfect for branding, promotions, and packaging seals. Kiss-cut for easy peeling.",
        image: "✨",
        specs: [
            "Size: A6 sheets",
            "Material: Vinyl Sticker Stock",
            "Printing: Full Color",
            "Finish: Gloss or Matte",
            "Minimum Order: 50 sheets"
        ],
        options: [
            "Gloss Vinyl",
            "Matte Vinyl",
            "Weatherproof",
            "White or Clear Base",
            "Custom Die-cut Shapes"
        ]
    }
];

// Category mapping for easy access
const categories = {
    all: "All Products",
    "business-cards": "Business Cards",
    flyers: "Flyers & Leaflets",
    brochures: "Brochures",
    posters: "Posters & Banners",
    stationery: "Stationery",
    packaging: "Packaging"
};
