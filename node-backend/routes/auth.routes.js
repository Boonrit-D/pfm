const express = require("express");
const User = require('../models/user');
const UserPin = require('../models/userPin');
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { loginUser } = require('../controllers/authController');
const { loginPin } = require('../controllers/authController');

// Get all users
authRouter.route('/').get( async (req, res, next) => {
  try {
      const data = await User.find();
      res.json(data);
  } catch (error) {
      console.log(error);
      next(error);
  }
})

// ลงทะเบียนผู้ใช้ใหม่
authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).send('User registered');
});

// ลงทะเบียนผู้ใช้ใหม่
authRouter.post('/registerPin', async (req, res) => {
  const { username, pin } = req.body;
  const hashedPin = await bcrypt.hash(pin, 10);

  const newUser = new UserPin({ username, pin: hashedPin });
  await newUser.save();
  res.status(201).send('User registered');
});

// ล็อกอิน
authRouter.post('/login', loginUser); // เรียกใช้ฟังก์ชัน loginUser

// ล็อกอินพิน
authRouter.post('/loginPin', loginPin);

module.exports = authRouter;
