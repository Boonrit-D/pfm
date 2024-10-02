const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // รับ token จาก header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ตรวจสอบ token
    req.user = decoded; // เก็บข้อมูลผู้ใช้ใน req เพื่อใช้ใน routes
    next(); // ถ้าผ่านการตรวจสอบให้เรียกต่อไปยัง next middleware หรือ route
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
