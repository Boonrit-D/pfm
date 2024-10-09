require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const UserPin = require("../models/userPin");
const secret = process.env.JWT_SECRET;

// ฟังก์ชันสำหรับสร้าง token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, secret, {
    expiresIn: "1h",
  });
};

// ฟังก์ชันสำหรับล็อกอินด้วย PIN และสร้าง token
exports.loginPin = async (req, res) => {
  const { username, pin } = req.body;
  const user = await UserPin.findOne({ username });

  // ตรวจสอบ PIN (สมมติว่าถูกเข้ารหัสด้วย bcrypt)
  const isPinMatch = await bcrypt.compare(pin, user.pin);
  if (!isPinMatch) return res.status(400).json({ message: "Invalid PIN" });

  const token = generateToken(user);
  res.json({ token });
};

// ฟังก์ชันสำหรับล็อกอินและสร้าง token
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ token });
};
