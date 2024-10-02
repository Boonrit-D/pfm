const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // ใช้ secret จาก env

const jwtMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // รับ token จาก header

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.id; // เก็บ userId เพื่อใช้งานใน request ต่อไป
        next(); // ทำงานต่อไป
    });
};

module.exports = jwtMiddleware;
