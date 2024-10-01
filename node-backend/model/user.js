const { type } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // สามารถเพิ่มข้อมูลอื่น ๆ เช่น email, fullName เป็นต้น
}, {
  collection: 'users'
});

// สร้าง model ที่ใช้ schema นี้
module.exports = mongoose.model('User', userSchema);
