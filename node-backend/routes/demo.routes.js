// Importing the express module and the Account model
// นำเข้าโมดูล express และโมเดล Account
const express = require('express');
const DemoAccount = require('../models/demo-account');
const demoRoutes = express.Router();

// Defining a route to get all accounts using a GET request
// กำหนดเส้นทางเพื่อดึงข้อมูลบัญชีทั้งหมดโดยใช้คำขอ GET
demoRoutes.route('/').get( async (req, res, next) => {
    try {
        const data = await DemoAccount.find();
        res.json(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

// Defining a route to add a new account using a POST request
// กำหนดเส้นทางเพื่อเพิ่มบัญชีใหม่โดยใช้คำขอ POST
demoRoutes.route('/create-account').post( async (req, res, next) => {
    try {
        const data = await DemoAccount.create(req.body);
        res.json(data);
    } catch (error) {
        console.log(error);
        next(error);
    } 
});

module.exports = demoRoutes ;