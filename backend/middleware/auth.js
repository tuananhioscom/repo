const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Vui lòng đăng nhập để tiếp tục'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Token không hợp lệ hoặc đã hết hạn'
            });
        }

        req.user = user;
        next();
    });
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Bạn không có quyền truy cập chức năng này'
        });
    }
};

// Middleware to check if user is member or admin
const isMember = (req, res, next) => {
    if (req.user && (req.user.role === 'member' || req.user.role === 'admin')) {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Bạn cần đăng nhập để sử dụng chức năng này'
        });
    }
};

module.exports = {
    authenticateToken,
    isAdmin,
    isMember
};
