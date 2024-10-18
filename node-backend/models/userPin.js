/* 
Importing Mongoose and creating a new Schema instance:
นำเข้า Mongoose และสร้างตัวอย่าง Schema ใหม่:

- mongoose: The main Mongoose library for connecting to MongoDB and defining models.
- Schema: A constructor for creating a new schema in Mongoose.

- mongoose: ไลบรารีหลักของ Mongoose สำหรับเชื่อมต่อกับ MongoDB และกำหนดโมเดล
- Schema: ตัวสร้างสำหรับสร้าง schema ใหม่ใน Mongoose
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* 
Defining the userPin schema for the application:
กำหนด schema ของ userPin สำหรับแอปพลิเคชัน:

- username: Field to store the user's username, required and must be unique.
- pin: Field to store the user's PIN, required.

- username: ฟิลด์สำหรับเก็บชื่อผู้ใช้ที่ต้องการ, จำเป็นต้องมีและต้องไม่ซ้ำ
- pin: ฟิลด์สำหรับเก็บ PIN ของผู้ใช้, จำเป็นต้องมี
*/
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  pin: { type: String, required: true },
}, {
  collection: 'usersPin'
});

/* 
Exporting the UserPin model for use in the application:
ส่งออกโมเดล UserPin สำหรับใช้งานในแอปพลิเคชัน:
*/
module.exports = mongoose.model('UserPin', userSchema);
