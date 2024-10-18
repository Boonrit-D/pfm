/* 
Setting up authentication routes for user login:
ตั้งค่าเส้นทางการตรวจสอบสิทธิ์สำหรับการล็อกอินของผู้ใช้:

- express: Framework for building web applications in Node.js.
- User: Model representing user data for authentication.
- UserPin: Model representing user PIN data for authentication.
- authRouter: Router instance for handling authentication routes.
- bcrypt: Library for hashing and comparing passwords.
- loginUser: Controller function for handling user login logic.
- loginPin: Controller function for handling user PIN login logic.

- express: เฟรมเวิร์กสำหรับสร้างแอปพลิเคชันเว็บใน Node.js
- User: โมเดลที่แสดงถึงข้อมูลผู้ใช้สำหรับการตรวจสอบสิทธิ์
- UserPin: โมเดลที่แสดงถึงข้อมูล PIN ของผู้ใช้สำหรับการตรวจสอบสิทธิ์
- authRouter: อินสแตนซ์ของ Router สำหรับจัดการเส้นทางการตรวจสอบสิทธิ์
- bcrypt: ไลบรารีสำหรับการแฮชและเปรียบเทียบรหัสผ่าน
- loginUser: ฟังก์ชันควบคุมสำหรับจัดการตรรกะการล็อกอินของผู้ใช้
- loginPin: ฟังก์ชันควบคุมสำหรับจัดการตรรกะการล็อกอินด้วย PIN ของผู้ใช้
*/
const express = require("express");
const User = require('../models/user');
const UserPin = require('../models/userPin');
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { loginUser } = require('../controllers/authController');
const { loginPin } = require('../controllers/authController');

/* 
Defining a GET route for retrieving all users:
กำหนดเส้นทาง GET สำหรับดึงข้อมูลผู้ใช้ทั้งหมด:

This route handles requests to the root of the authRouter.
เส้นทางนี้จัดการคำขอที่ส่งไปยังรากของ authRouter.

- Asynchronous function to fetch user data from the database.
- If successful, returns the user data in JSON format.
- If an error occurs, logs the error and passes it to the next middleware for handling.

- ฟังก์ชันแบบอะซิงโครนัสเพื่อดึงข้อมูลผู้ใช้จากฐานข้อมูล
- หากสำเร็จ จะส่งคืนข้อมูลผู้ใช้ในรูปแบบ JSON
- หากเกิดข้อผิดพลาด จะทำการล็อกข้อผิดพลาดและส่งต่อให้ middleware ถัดไปเพื่อจัดการ
*/
authRouter.route('/').get( async (req, res, next) => {
  try {
      const data = await User.find();
      res.json(data);
  } catch (error) {
      console.log(error);
      next(error);
  }
})

/* 
Defining a POST route for user registration:
กำหนดเส้นทาง POST สำหรับการลงทะเบียนผู้ใช้:

This route handles registration requests.
เส้นทางนี้จัดการคำขอลงทะเบียน.

- Extracts username and password from the request body.
- Hashes the password using bcrypt for security.
- Creates a new user instance with the hashed password.
- Saves the new user to the database.
- Responds with a 201 status code indicating successful registration.
- If an error occurs, it should ideally be caught and handled (not shown here).

- เสริมข้อมูลชื่อผู้ใช้และรหัสผ่านจาก body ของคำขอ
- ทำการแฮชรหัสผ่านโดยใช้ bcrypt เพื่อความปลอดภัย
- สร้างอินสแตนซ์ผู้ใช้ใหม่ด้วยรหัสผ่านที่แฮช
- บันทึกผู้ใช้ใหม่ลงในฐานข้อมูล
- ตอบกลับด้วยสถานะ 201 ที่ระบุว่าการลงทะเบียนสำเร็จ
- หากเกิดข้อผิดพลาด จะต้องจับและจัดการ (ไม่แสดงในที่นี้)
*/
authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).send('User registered');
});

/* 
Defining a POST route for user PIN registration:
กำหนดเส้นทาง POST สำหรับการลงทะเบียน PIN ของผู้ใช้:

This route handles registration requests for user PINs.
เส้นทางนี้จัดการคำขอลงทะเบียนสำหรับ PIN ของผู้ใช้.

- Extracts username and pin from the request body.
- Hashes the pin using bcrypt for security.
- Creates a new user instance with the hashed pin.
- Saves the new user to the database.
- Responds with a 201 status code indicating successful registration.
- If an error occurs, it should ideally be caught and handled (not shown here).

- เสริมข้อมูลชื่อผู้ใช้และ PIN จาก body ของคำขอ
- ทำการแฮช PIN โดยใช้ bcrypt เพื่อความปลอดภัย
- สร้างอินสแตนซ์ผู้ใช้ใหม่ด้วย PIN ที่แฮช
- บันทึกผู้ใช้ใหม่ลงในฐานข้อมูล
- ตอบกลับด้วยสถานะ 201 ที่ระบุว่าการลงทะเบียนสำเร็จ
- หากเกิดข้อผิดพลาด จะต้องจับและจัดการ (ไม่แสดงในที่นี้)
*/
authRouter.post('/registerPin', async (req, res) => {
  const { username, pin } = req.body;
  const hashedPin = await bcrypt.hash(pin, 10);

  const newUser = new UserPin({ username, pin: hashedPin });
  await newUser.save();
  res.status(201).send('User registered');
});

/* 
Defining a POST route for user login:
กำหนดเส้นทาง POST สำหรับการเข้าสู่ระบบของผู้ใช้:

This route handles login requests for users.
เส้นทางนี้จัดการคำขอเข้าสู่ระบบสำหรับผู้ใช้.

- Calls the loginUser function to handle the authentication process.
- The loginUser function will validate the user's credentials and respond accordingly.

- เรียกฟังก์ชัน loginUser เพื่อจัดการกระบวนการตรวจสอบสิทธิ์
- ฟังก์ชัน loginUser จะตรวจสอบข้อมูลรับรองของผู้ใช้และตอบกลับตามนั้น
*/
authRouter.post('/login', loginUser);

/* 
Defining a POST route for user PIN login:
กำหนดเส้นทาง POST สำหรับการเข้าสู่ระบบด้วย PIN ของผู้ใช้:

This route handles login requests for users using their PIN.
เส้นทางนี้จัดการคำขอเข้าสู่ระบบสำหรับผู้ใช้ที่ใช้ PIN.

- Calls the loginPin function to handle the authentication process.
- The loginPin function will validate the user's PIN and respond accordingly.

- เรียกฟังก์ชัน loginPin เพื่อจัดการกระบวนการตรวจสอบสิทธิ์
- ฟังก์ชัน loginPin จะตรวจสอบ PIN ของผู้ใช้และตอบกลับตามนั้น
*/
authRouter.post('/loginPin', loginPin);

/* 
Exporting the authRouter module:
ส่งออกโมดูล authRouter:

This allows other parts of the application to use the authentication routes defined in this router.
นี่ช่วยให้ส่วนอื่นๆ ของแอปพลิเคชันสามารถใช้เส้นทางการตรวจสอบสิทธิ์ที่กำหนดใน router นี้ได้
*/
module.exports = authRouter;
