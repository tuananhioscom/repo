const { pool } = require('../config/database');

// Get all products (with optional filters)
exports.getAllProducts = async (req, res) => {
    try {
        const { category, search, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        let query = `
            SELECT p.*, c.name as category_name, c.slug as category_slug
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.is_active = 1
        `;
        const params = [];

        if (category) {
            query += ' AND c.slug = ?';
            params.push(category);
        }

        if (search) {
            query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [products] = await pool.query(query, params);

        // Get total count
        let countQuery = 'SELECT COUNT(*) as total FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.is_active = 1';
        const countParams = [];

        if (category) {
            countQuery += ' AND c.slug = ?';
            countParams.push(category);
        }

        if (search) {
            countQuery += ' AND (p.name LIKE ? OR p.description LIKE ?)';
            countParams.push(`%${search}%`, `%${search}%`);
        }

        const [countResult] = await pool.query(countQuery, countParams);
        const total = countResult[0].total;

        res.json({
            success: true,
            data: {
                products,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Get single product
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const [products] = await pool.query(
            `SELECT p.*, c.name as category_name, c.slug as category_slug
             FROM products p
             LEFT JOIN categories c ON p.category_id = c.id
             WHERE p.id = ? AND p.is_active = 1`,
            [id]
        );

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm'
            });
        }

        // Increment view count
        await pool.query('UPDATE products SET view_count = view_count + 1 WHERE id = ?', [id]);

        res.json({
            success: true,
            data: products[0]
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Create product (Admin only)
exports.createProduct = async (req, res) => {
    try {
        const {
            category_id,
            name,
            slug,
            short_description,
            description,
            price,
            image_emoji,
            specifications,
            options,
            stock_quantity
        } = req.body;

        const image_url = req.file ? `/uploads/${req.file.filename}` : null;

        const [result] = await pool.query(
            `INSERT INTO products
            (category_id, name, slug, short_description, description, price, image_url, image_emoji, specifications, options, stock_quantity)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                category_id,
                name,
                slug,
                short_description,
                description,
                price,
                image_url,
                image_emoji,
                JSON.stringify(specifications),
                JSON.stringify(options),
                stock_quantity || 0
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Tạo sản phẩm thành công',
            data: {
                id: result.insertId
            }
        });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            category_id,
            name,
            slug,
            short_description,
            description,
            price,
            image_emoji,
            specifications,
            options,
            stock_quantity,
            is_active
        } = req.body;

        let query = `UPDATE products SET
            category_id = ?,
            name = ?,
            slug = ?,
            short_description = ?,
            description = ?,
            price = ?,
            image_emoji = ?,
            specifications = ?,
            options = ?,
            stock_quantity = ?,
            is_active = ?`;

        const params = [
            category_id,
            name,
            slug,
            short_description,
            description,
            price,
            image_emoji,
            JSON.stringify(specifications),
            JSON.stringify(options),
            stock_quantity,
            is_active !== undefined ? is_active : 1
        ];

        // Add image if uploaded
        if (req.file) {
            query += ', image_url = ?';
            params.push(`/uploads/${req.file.filename}`);
        }

        query += ' WHERE id = ?';
        params.push(id);

        await pool.query(query, params);

        res.json({
            success: true,
            message: 'Cập nhật sản phẩm thành công'
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Soft delete by setting is_active to false
        await pool.query('UPDATE products SET is_active = 0 WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Xóa sản phẩm thành công'
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const [categories] = await pool.query(
            'SELECT * FROM categories WHERE is_active = 1 ORDER BY display_order'
        );

        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};
