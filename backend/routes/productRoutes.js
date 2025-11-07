const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const upload = require('../config/upload');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.get('/:id', productController.getProduct);

// Admin routes
router.post('/',
    authenticateToken,
    isAdmin,
    upload.single('image'),
    productController.createProduct
);

router.put('/:id',
    authenticateToken,
    isAdmin,
    upload.single('image'),
    productController.updateProduct
);

router.delete('/:id',
    authenticateToken,
    isAdmin,
    productController.deleteProduct
);

module.exports = router;
