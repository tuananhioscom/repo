const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken, isAdmin, isMember } = require('../middleware/auth');

// Member routes
router.post('/', authenticateToken, isMember, orderController.createOrder);
router.get('/my-orders', authenticateToken, isMember, orderController.getMyOrders);
router.get('/:id', authenticateToken, isMember, orderController.getOrderDetail);
router.put('/:id/cancel', authenticateToken, isMember, orderController.cancelOrder);

// Admin routes
router.get('/admin/all', authenticateToken, isAdmin, orderController.getAllOrders);
router.put('/admin/:id/status', authenticateToken, isAdmin, orderController.updateOrderStatus);

module.exports = router;
