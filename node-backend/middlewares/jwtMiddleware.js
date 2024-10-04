require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
// const secret = "your_jwt_secret";
console.log(secret); // ตรวจสอบว่าค่า secret ถูกต้องหรือไม่

const jwtMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // รับ token จาก header

    if (!token) {
        console.log("No token provided");
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.log("Error verifying token:", err); // ตรวจสอบข้อผิดพลาด
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log("Token decoded successfully:", decoded); // ตรวจสอบค่าที่ decode
        req.userId = decoded.id; // เก็บ userId เพื่อใช้งานใน request ต่อไป
        next(); // ทำงานต่อไป
    });
};

module.exports = jwtMiddleware;
