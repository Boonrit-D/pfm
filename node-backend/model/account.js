const { type } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// สร้าง schema สำหรับ transactions โดยให้ MongoDB สร้าง _id อัตโนมัติ
const transactionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // ใช้ ObjectId และให้สร้างอัตโนมัติ
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, required: true },
});

// สร้าง schema สำหรับ account โดยไม่ต้องกำหนด id เอง
const accountSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
  currency: { type: String, required: true },
  balance: { type: Number, required: true },
  transactions: [transactionSchema], // ใช้ array ของ transactions
},{
    collection : 'accounts'
});

// สร้าง model ที่ใช้ schema นี้
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
