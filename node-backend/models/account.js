// Importing the mongoose library for MongoDB object modeling
// นำเข้าไลบรารี mongoose สำหรับการสร้างโมเดลใน MongoDB
const mongoose = require("mongoose");

// Defining the schema for transactions
// กำหนดสคีมาสำหรับธุรกรรม
const transactionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, required: true },
});

// Defining the schema for accounts
// กำหนดสคีมาสำหรับบัญชี
const accountSchema = new mongoose.Schema(
  {
    accountName: { type: String, required: true },
    currency: { type: String, required: true },
    description: { type: String },
    balance: { type: Number, required: true },
    transactions: [transactionSchema],
  },
  {
    collection: "accounts",
  }
);

// Creating the Account model from the account schema
// สร้างโมเดล Account จากสคีมาบัญชี
const Account = mongoose.model("Account", accountSchema);

// Exporting the Account model for use in other parts of the application
// ส่งออกโมเดล Account เพื่อใช้ในส่วนอื่นของแอปพลิเคชัน
module.exports = Account;
