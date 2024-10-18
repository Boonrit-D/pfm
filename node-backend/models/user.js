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
Defining the User schema for Mongoose:
กำหนด schema สำหรับผู้ใช้ใน Mongoose:

- username: A string that is required and must be unique.
- password: A string that is required.
- collection: Specifies the MongoDB collection name for the schema.

- username: สตริงที่จำเป็นและต้องไม่ซ้ำกัน
- password: สตริงที่จำเป็น
- collection: กำหนดชื่อคอลเล็กชัน MongoDB สำหรับ schema
*/
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  collection: 'users'
});

/* 
Exporting the User model based on the user schema:
ส่งออกโมเดล User ที่สร้างจาก user schema:

- mongoose.model: Creates a model based on the provided schema.
- 'User': Name of the model to be used in the application.
- userSchema: The schema used to define the structure of user documents in MongoDB.

- mongoose.model: สร้างโมเดลจาก schema ที่กำหนด
- 'User': ชื่อโมเดลที่จะใช้ในแอปพลิเคชัน
- userSchema: schema ที่ใช้กำหนดโครงสร้างของเอกสารผู้ใช้ใน MongoDB
*/
module.exports = mongoose.model('User', userSchema);
