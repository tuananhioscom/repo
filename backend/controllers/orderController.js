const { pool } = require('../config/database');

// Generate unique order number
function generateOrderNumber() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `PP${timestamp.slice(-8)}${random}`;
}

// Create order from cart
exports.createOrder = async (req, res) => {
    const connection = await pool.getConnection();

    try {
        const userId = req.user.id;
        const {
            shipping_name,
            shipping_phone,
            shipping_address,
            payment_method,
            notes
        } = req.body;

        // Validate required fields
        if (!shipping_name || !shipping_phone || !shipping_address) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin giao hàng'
            });
        }

        await connection.beginTransaction();

        // Get cart items
        const [cartItems] = await connection.query(
            `SELECT ci.*, p.name, p.price
             FROM cart_items ci
             JOIN products p ON ci.product_id = p.id
             WHERE ci.user_id = ? AND p.is_active = 1`,
            [userId]
        );

        if (cartItems.length === 0) {
            await connection.rollback();
            return res.status(400).json({
                success: false,
                message: 'Giỏ hàng trống'
            });
        }

        // Calculate total
        const total_amount = cartItems.reduce((sum, item) =>
            sum + (parseFloat(item.price) * item.quantity), 0
        );

        // Create order
        const orderNumber = generateOrderNumber();
        const [orderResult] = await connection.query(
            `INSERT INTO orders
            (user_id, order_number, total_amount, shipping_name, shipping_phone, shipping_address, payment_method, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                orderNumber,
                total_amount,
                shipping_name,
                shipping_phone,
                shipping_address,
                payment_method || 'cod',
                notes
            ]
        );

        const orderId = orderResult.insertId;

        // Create order items
        for (const item of cartItems) {
            await connection.query(
                `INSERT INTO order_items
                (order_id, product_id, product_name, quantity, unit_price, total_price, selected_options)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    orderId,
                    item.product_id,
                    item.name,
                    item.quantity,
                    item.price,
                    item.price * item.quantity,
                    item.selected_options
                ]
            );
        }

        // Clear cart
        await connection.query('DELETE FROM cart_items WHERE user_id = ?', [userId]);

        await connection.commit();

        res.status(201).json({
            success: true,
            message: 'Đặt hàng thành công',
            data: {
                order_id: orderId,
                order_number: orderNumber,
                total_amount
            }
        });
    } catch (error) {
        await connection.rollback();
        console.error('Create order error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    } finally {
        connection.release();
    }
};

// Get user's orders
exports.getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        let query = 'SELECT * FROM orders WHERE user_id = ?';
        const params = [userId];

        if (status) {
            query += ' AND status = ?';
            params.push(status);
        }

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [orders] = await pool.query(query, params);

        // Get total count
        let countQuery = 'SELECT COUNT(*) as total FROM orders WHERE user_id = ?';
        const countParams = [userId];

        if (status) {
            countQuery += ' AND status = ?';
            countParams.push(status);
        }

        const [countResult] = await pool.query(countQuery, countParams);
        const total = countResult[0].total;

        res.json({
            success: true,
            data: {
                orders,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Get order detail
exports.getOrderDetail = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        // Get order
        const [orders] = await pool.query(
            'SELECT * FROM orders WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn hàng'
            });
        }

        // Get order items
        const [items] = await pool.query(
            'SELECT * FROM order_items WHERE order_id = ?',
            [id]
        );

        res.json({
            success: true,
            data: {
                ...orders[0],
                items
            }
        });
    } catch (error) {
        console.error('Get order detail error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        // Check if order belongs to user and can be cancelled
        const [orders] = await pool.query(
            'SELECT status FROM orders WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn hàng'
            });
        }

        if (orders[0].status !== 'pending' && orders[0].status !== 'confirmed') {
            return res.status(400).json({
                success: false,
                message: 'Không thể hủy đơn hàng đang xử lý hoặc đã hoàn thành'
            });
        }

        await pool.query(
            'UPDATE orders SET status = ? WHERE id = ?',
            ['cancelled', id]
        );

        res.json({
            success: true,
            message: 'Đã hủy đơn hàng'
        });
    } catch (error) {
        console.error('Cancel order error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Admin: Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        let query = 'SELECT o.*, u.email, u.full_name FROM orders o JOIN users u ON o.user_id = u.id WHERE 1=1';
        const params = [];

        if (status) {
            query += ' AND o.status = ?';
            params.push(status);
        }

        query += ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [orders] = await pool.query(query, params);

        // Get total count
        let countQuery = 'SELECT COUNT(*) as total FROM orders WHERE 1=1';
        const countParams = [];

        if (status) {
            countQuery += ' AND status = ?';
            countParams.push(status);
        }

        const [countResult] = await pool.query(countQuery, countParams);
        const total = countResult[0].total;

        res.json({
            success: true,
            data: {
                orders,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};

// Admin: Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, payment_status } = req.body;

        const updates = [];
        const params = [];

        if (status) {
            updates.push('status = ?');
            params.push(status);
        }

        if (payment_status) {
            updates.push('payment_status = ?');
            params.push(payment_status);
        }

        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Không có thông tin cập nhật'
            });
        }

        params.push(id);

        await pool.query(
            `UPDATE orders SET ${updates.join(', ')} WHERE id = ?`,
            params
        );

        res.json({
            success: true,
            message: 'Cập nhật đơn hàng thành công'
        });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server, vui lòng thử lại sau'
        });
    }
};
