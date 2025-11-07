const { pool } = require('../config/database');

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const [cartItems] = await pool.query(
            `SELECT ci.*, p.name, p.price, p.image_url, p.image_emoji
             FROM cart_items ci
             JOIN products p ON ci.product_id = p.id
             WHERE ci.user_id = ? AND p.is_active = 1`,
            [userId]
        );

        // Calculate total
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        res.json({
            success: true,
            data: {
                items: cartItems,
                total
            }
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id, quantity, selected_options } = req.body;

        // Check if product exists
        const [products] = await pool.query(
            'SELECT id, stock_quantity FROM products WHERE id = ? AND is_active = 1',
            [product_id]
        );

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Sản phẩm không tồn tại'
            });
        }

        // Check if item already in cart
        const [existingItems] = await pool.query(
            'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?',
            [userId, product_id]
        );

        if (existingItems.length > 0) {
            // Update quantity
            const newQuantity = existingItems[0].quantity + (quantity || 1);
            await pool.query(
                'UPDATE cart_items SET quantity = ?, selected_options = ? WHERE id = ?',
                [newQuantity, JSON.stringify(selected_options), existingItems[0].id]
            );
        } else {
            // Insert new item
            await pool.query(
                'INSERT INTO cart_items (user_id, product_id, quantity, selected_options) VALUES (?, ?, ?, ?)',
                [userId, product_id, quantity || 1, JSON.stringify(selected_options)]
            );
        }

        res.json({
            success: true,
            message: 'Đã thêm vào giỏ hàng'
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Số lượng phải lớn hơn 0'
            });
        }

        await pool.query(
            'UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?',
            [quantity, id, userId]
        );

        res.json({
            success: true,
            message: 'Cập nhật giỏ hàng thành công'
        });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        await pool.query(
            'DELETE FROM cart_items WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        res.json({
            success: true,
            message: 'Đã xóa khỏi giỏ hàng'
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        await pool.query('DELETE FROM cart_items WHERE user_id = ?', [userId]);

        res.json({
            success: true,
            message: 'Đã xóa toàn bộ giỏ hàng'
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};
