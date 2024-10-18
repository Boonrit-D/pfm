/* 
JWT middleware for authenticating requests:
มิดเดิลแวร์ JWT สำหรับการตรวจสอบสิทธิ์คำขอ:

- dotenv: Package for loading environment variables from a .env file.
- jsonwebtoken: Library for creating and verifying JSON Web Tokens.
- secret: Secret key used for signing tokens, retrieved from environment variables.

- jwtMiddleware: Function to check for the presence and validity of the JWT in the request headers.

- req: Request object representing the incoming request.
- res: Response object for sending responses to the client.
- next: Callback function to pass control to the next middleware in the stack.

- dotenv: แพ็กเกจสำหรับโหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env
- jsonwebtoken: ไลบรารีสำหรับสร้างและตรวจสอบ JSON Web Tokens
- secret: คีย์ลับที่ใช้สำหรับลงนามในโทเค็น ซึ่งดึงมาจากตัวแปรสภาพแวดล้อม

- jwtMiddleware: ฟังก์ชันเพื่อตรวจสอบการมีอยู่และความถูกต้องของ JWT ในส่วนหัวของคำขอ

- req: อ็อบเจ็กต์คำขอที่แสดงถึงคำขอที่เข้ามา
- res: อ็อบเจ็กต์การตอบสนองสำหรับส่งการตอบสนองไปยังลูกค้า
- next: ฟังก์ชันคอลแบ็กเพื่อส่งต่อการควบคุมไปยังมิดเดิลแวร์ถัดไปในสแตก
*/

require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const jwtMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    console.log("No token provided");
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log("Error verifying token:", err);
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log("Token decoded successfully:", decoded);
    req.userId = decoded.id;
    next();
  });
};

/* 
Exporting the JWT middleware for use in other modules:
ส่งออกมิดเดิลแวร์ JWT เพื่อใช้งานในโมดูลอื่น ๆ:

- module.exports: An object that defines what a module exports and makes it available to other modules.
- jwtMiddleware: The function that checks the validity of the JWT.

- module.exports: อ็อบเจ็กต์ที่กำหนดว่าสิ่งใดบ้างที่โมดูลส่งออกและทำให้สามารถใช้งานได้ในโมดูลอื่น ๆ
- jwtMiddleware: ฟังก์ชันที่ตรวจสอบความถูกต้องของ JWT
*/
module.exports = jwtMiddleware;

module.exports = jwtMiddleware;
