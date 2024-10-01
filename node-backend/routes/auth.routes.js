const express = require("express");
const User = require('../model/user');
const authRouter = express.Router();
const bcrypt = require("bcrypt");

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

// ล็อกอิน
authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).send('Invalid username or password');
  }

  // สามารถสร้าง token ที่ใช้สำหรับการตรวจสอบในอนาคตได้ที่นี่
  res.status(200).send('Login successful');
});

module.exports = authRouter;
