/* 
Importing necessary modules and configuring environment variables:
นำเข้าโมดูลที่จำเป็นและกำหนดค่าตัวแปรสภาพแวดล้อม:

- dotenv: Module for loading environment variables from a .env file.
- jsonwebtoken: Library for working with JSON Web Tokens (JWT).
- bcryptjs: Library for hashing passwords.
- User: User model for interacting with user data.
- UserPin: UserPin model for managing user PINs.
- secret: Variable that holds the JWT secret key from the environment variables.

- dotenv: โมดูลสำหรับโหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env
- jsonwebtoken: ไลบรารีสำหรับทำงานกับ JSON Web Tokens (JWT)
- bcryptjs: ไลบรารีสำหรับการเข้ารหัสรหัสผ่าน
- User: โมเดลผู้ใช้สำหรับการโต้ตอบกับข้อมูลผู้ใช้
- UserPin: โมเดล UserPin สำหรับการจัดการ PIN ของผู้ใช้
- secret: ตัวแปรที่เก็บคีย์ลับของ JWT จากตัวแปรสภาพแวดล้อม
*/

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const UserPin = require("../models/userPin");
const secret = process.env.JWT_SECRET;

/* 
Generating a JSON Web Token (JWT) for the authenticated user:
สร้าง JSON Web Token (JWT) สำหรับผู้ใช้ที่ผ่านการรับรองความถูกต้อง:

- user: The user object containing user information (e.g., _id, username).
- jwt.sign: Method for signing the token with user data and secret key.
- expiresIn: Option to set the token expiration time to 1 hour.

- user: อ็อบเจ็กต์ผู้ใช้ที่มีข้อมูลผู้ใช้ (เช่น _id, username)
- jwt.sign: เมธอดสำหรับลงนามในโทเค็นด้วยข้อมูลผู้ใช้และคีย์ลับ
- expiresIn: ตัวเลือกสำหรับตั้งค่าเวลาในการหมดอายุของโทเค็นเป็น 1 ชั่วโมง
*/
const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, secret, {
    expiresIn: "1h",
  });
};

/* 
Handling user login with a PIN:
จัดการการเข้าสู่ระบบของผู้ใช้ด้วย PIN:

- req.body: Contains the username and PIN provided by the user.
- UserPin.findOne: Method to find the user by username in the UserPin collection.
- bcrypt.compare: Method to compare the provided PIN with the stored hashed PIN.
- isPinMatch: Boolean indicating whether the provided PIN matches the stored hashed PIN.
- If the PIN is invalid, send a 400 response with an error message.
- If the PIN is valid, generate a token using the generateToken function.
- Send the generated token back to the client as a JSON response.

- req.body: มีชื่อผู้ใช้และ PIN ที่ผู้ใช้ให้มา
- UserPin.findOne: เมธอดสำหรับค้นหาผู้ใช้ตามชื่อผู้ใช้ในคอลเลกชัน UserPin
- bcrypt.compare: เมธอดสำหรับเปรียบเทียบ PIN ที่ให้มากับ PIN ที่ถูกเข้ารหัสไว้
- isPinMatch: ค่าบูลีนที่ระบุว่า PIN ที่ให้มาตรงกับ PIN ที่ถูกเข้ารหัสไว้หรือไม่
- หาก PIN ไม่ถูกต้อง ให้ส่งการตอบสนอง 400 พร้อมข้อความแสดงข้อผิดพลาด
- หาก PIN ถูกต้อง ให้สร้างโทเค็นโดยใช้ฟังก์ชัน generateToken
- ส่งโทเค็นที่สร้างขึ้นกลับไปยังไคลเอนต์ในรูปแบบ JSON
*/
exports.loginPin = async (req, res) => {
  const { username, pin } = req.body;
  const user = await UserPin.findOne({ username });

  const isPinMatch = await bcrypt.compare(pin, user.pin);
  if (!isPinMatch) return res.status(400).json({ message: "Invalid PIN" });

  const token = generateToken(user);
  res.json({ token });
};

/* 
Handling user login with username and password:
จัดการการเข้าสู่ระบบของผู้ใช้ด้วยชื่อผู้ใช้และรหัสผ่าน:

- req.body: Contains the username and password provided by the user.
- User.findOne: Method to find the user by username in the User collection.
- If no user is found, send a 404 response with a "User not found" message.
- bcrypt.compare: Method to compare the provided password with the stored hashed password.
- isMatch: Boolean indicating whether the provided password matches the stored hashed password.
- If the credentials are invalid, send a 400 response with an "Invalid credentials" message.
- If the credentials are valid, generate a token using the generateToken function.
- Send the generated token back to the client as a JSON response.

- req.body: มีชื่อผู้ใช้และรหัสผ่านที่ผู้ใช้ให้มา
- User.findOne: เมธอดสำหรับค้นหาผู้ใช้ตามชื่อผู้ใช้ในคอลเลกชัน User
- หากไม่พบผู้ใช้ ให้ส่งการตอบสนอง 404 พร้อมข้อความ "ไม่พบผู้ใช้"
- bcrypt.compare: เมธอดสำหรับเปรียบเทียบรหัสผ่านที่ให้มากับรหัสผ่านที่ถูกเข้ารหัสไว้
- isMatch: ค่าบูลีนที่ระบุว่ารหัสผ่านที่ให้มาตรงกับรหัสผ่านที่ถูกเข้ารหัสไว้หรือไม่
- หากข้อมูลประจำตัวไม่ถูกต้อง ให้ส่งการตอบสนอง 400 พร้อมข้อความ "ข้อมูลประจำตัวไม่ถูกต้อง"
- หากข้อมูลประจำตัวถูกต้อง ให้สร้างโทเค็นโดยใช้ฟังก์ชัน generateToken
- ส่งโทเค็นที่สร้างขึ้นกลับไปยังไคลเอนต์ในรูปแบบ JSON
*/
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ token });
};
