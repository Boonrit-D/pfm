/*
Importing necessary modules and initializing the router:
นำเข้าโมดูลที่จำเป็นและสร้าง Router:

- The 'express' module is imported to create an Express application.
- The 'DemoAccount' model is imported to interact with the DemoAccount collection in the database.
- An instance of the router is created using 'express.Router()' to define routes for handling account-related requests.

- นำเข้าโมดูล 'express' เพื่อสร้างแอปพลิเคชัน Express
- นำเข้าโมเดล 'DemoAccount' เพื่อใช้งานกับคอลเลกชัน DemoAccount ในฐานข้อมูล
- สร้างอินสแตนซ์ของ Router โดยใช้ 'express.Router()' เพื่อกำหนดเส้นทางสำหรับจัดการคำขอที่เกี่ยวข้องกับบัญชี
*/
const express = require('express');
const DemoAccount = require('../models/demo-account');
const demoRoutes = express.Router();

/*
Retrieve all accounts:
ดึงข้อมูลบัญชีทั้งหมด:

- This route handles the retrieval of all accounts from the database.
- It uses the 'find' method from Mongoose to get all account documents stored in the DemoAccount collection.
- If successful, it returns the list of accounts as a JSON response.
- In case of an error, it catches the error and passes it to the next middleware for further handling.

- เส้นทางนี้ใช้สำหรับดึงข้อมูลบัญชีทั้งหมดจากฐานข้อมูล
- ใช้เมธอด 'find' ของ Mongoose เพื่อดึงเอกสารบัญชีทั้งหมดในคอลเลกชัน DemoAccount
- หากดึงข้อมูลสำเร็จ จะคืนลิสต์ของบัญชีเป็นการตอบกลับในรูปแบบ JSON
- ในกรณีที่เกิดข้อผิดพลาด จะจับข้อผิดพลาดและส่งไปยัง middleware ถัดไปเพื่อจัดการ
*/
demoRoutes.route('/').get( async (req, res, next) => {
    try {
        const data = await DemoAccount.find();
        res.json(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

/*
Create a new account:
สร้างบัญชีใหม่:

- This route handles the creation of a new account in the database using the data provided in the request body.
- It uses the 'create' method from Mongoose to insert the account data into the database.
- If successful, it returns the newly created account data as the response.
- In case of an error, it catches the error and passes it to the next middleware for further handling.

- เส้นทางนี้ใช้สำหรับสร้างบัญชีใหม่ในฐานข้อมูล โดยข้อมูลบัญชีจะถูกส่งมาใน request body
- ใช้เมธอด 'create' ของ Mongoose เพื่อเพิ่มข้อมูลบัญชีเข้าไปในฐานข้อมูล
- หากสร้างสำเร็จ จะคืนข้อมูลบัญชีที่สร้างใหม่เป็นการตอบกลับ
- ในกรณีที่เกิดข้อผิดพลาด จะจับข้อผิดพลาดและส่งไปยัง middleware ถัดไปเพื่อจัดการ
*/
demoRoutes.route('/create-account').post( async (req, res, next) => {
    try {
        const data = await DemoAccount.create(req.body);
        res.json(data);
    } catch (error) {
        console.log(error);
        next(error);
    } 
});

/* 
Delete an account by ID:
ลบบัญชีตาม ID:

- This route handles the deletion of an account from the database based on the provided account ID.
- It uses the 'findByIdAndDelete' method from Mongoose to find and delete the specified account.
- If successful, it returns a status of 200 with the deleted account's data as the response.
- In case of an error, it catches the error and passes it to the next middleware for further handling.

- เส้นทางนี้ใช้สำหรับลบบัญชีจากฐานข้อมูลโดยอ้างอิงจาก ID ของบัญชีที่ส่งมา
- ใช้เมธอด 'findByIdAndDelete' ของ Mongoose เพื่อลบข้อมูลบัญชีที่ระบุ
- หากลบสำเร็จ จะคืนสถานะ 200 พร้อมข้อมูลของบัญชีที่ถูกลบกลับไปเป็นการตอบกลับ
- ในกรณีที่เกิดข้อผิดพลาด จะจับข้อผิดพลาดและส่งไปยัง middleware ถัดไปเพื่อจัดการ
*/
demoRoutes.route('/delete-account/:id').delete( async (req, res, next) => {
    try {
        const data = await DemoAccount.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg:data
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
});

/*
Exporting the demoRoutes module:
ส่งออกโมดูล demoRoutes:

- This line exports the 'demoRoutes' object, making it available for import in other files.
- It allows other parts of the application to use the defined routes for handling requests related to DemoAccount.

- บรรทัดนี้ส่งออกวัตถุ 'demoRoutes' ทำให้สามารถนำเข้าในไฟล์อื่นได้
- ช่วยให้ส่วนอื่น ๆ ของแอปพลิเคชันสามารถใช้เส้นทางที่กำหนดสำหรับจัดการคำขอที่เกี่ยวข้องกับ DemoAccount
*/
module.exports = demoRoutes ;