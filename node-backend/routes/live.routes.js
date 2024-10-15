/*
Importing necessary modules and initializing the router:
นำเข้าโมดูลที่จำเป็นและสร้าง Router:

- The 'express' module is imported to create an Express application.
- The 'DemoAccount' model is imported to interact with the DemoAccount collection in the database.
- An instance of the router is created using 'express.Router()' to define routes for handling account-related requests.

- นำเข้าโมดูล 'express' เพื่อสร้างแอปพลิเคชัน Express
- นำเข้าโมเดล 'Account' เพื่อใช้งานกับคอลเลกชัน Account ในฐานข้อมูล
- สร้างอินสแตนซ์ของ Router โดยใช้ 'express.Router()' เพื่อกำหนดเส้นทางสำหรับจัดการคำขอที่เกี่ยวข้องกับบัญชี
*/
const express = require("express");
const Account = require("../models/account");
const routes = express.Router();

/*
Retrieve all accounts:
ดึงข้อมูลบัญชีทั้งหมด:

- This route handles the retrieval of all accounts from the database.
- It uses the 'find' method from Mongoose to get all account documents stored in the Account collection.
- If successful, it returns the list of accounts as a JSON response.
- In case of an error, it catches the error and passes it to the next middleware for further handling.

- เส้นทางนี้ใช้สำหรับดึงข้อมูลบัญชีทั้งหมดจากฐานข้อมูล
- ใช้เมธอด 'find' ของ Mongoose เพื่อดึงเอกสารบัญชีทั้งหมดในคอลเลกชัน Account
- หากดึงข้อมูลสำเร็จ จะคืนลิสต์ของบัญชีเป็นการตอบกลับในรูปแบบ JSON
- ในกรณีที่เกิดข้อผิดพลาด จะจับข้อผิดพลาดและส่งไปยัง middleware ถัดไปเพื่อจัดการ
*/
routes.route("/").get(async (req, res, next) => {
  try {
    const data = await Account.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

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
routes.route("/create-account").post(async (req, res, next) => {
  try {
    const data = await Account.create(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/*
Route to retrieve a demo account by its ID:
เส้นทางสำหรับดึงข้อมูลบัญชีเดโมโดยใช้ ID ของบัญชี:

- This route uses the HTTP GET method to retrieve a specific demo account from the database based on the account ID.
- It uses Mongoose's 'findById' method to search for the account.
- If the account is found, it sends the data as a JSON response.
- If an error occurs, it is logged to the console and passed to the next middleware for handling.

- เส้นทางนี้ใช้เมธอด HTTP GET เพื่อดึงข้อมูลบัญชีเดโมจากฐานข้อมูลโดยใช้ ID ของบัญชี
- ใช้เมธอด 'findById' ของ Mongoose ในการค้นหาบัญชี
- ถ้าพบบัญชี จะส่งข้อมูลเป็น JSON กลับไป
- หากเกิดข้อผิดพลาด จะแสดงในคอนโซลและส่งต่อให้ middleware ถัดไปจัดการ
*/
routes.route("/read-account/:id").get(async (req, res, next) => {
  try {
    const data = await Account.findById(req.params.id);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/*
Route to update a demo account by its ID:
เส้นทางสำหรับอัปเดตบัญชีเดโมโดยใช้ ID ของบัญชี:

- This route handler uses the 'findByIdAndUpdate' method from Mongoose to update the specified account.
- The '$set' operator is used to update only the fields provided in the request body.
- The '{ new: true }' option returns the updated document after modification.
- If the account is not found, a 404 error with a 'not found' message is returned.
- Any errors encountered during the operation are caught and passed to the next middleware.

- ตัวจัดการเส้นทางนี้ใช้เมธอด 'findByIdAndUpdate' ของ Mongoose เพื่ออัปเดตบัญชีที่ระบุ
- ใช้โอเปอเรเตอร์ '$set' เพื่ออัปเดตเฉพาะฟิลด์ที่ถูกส่งมาในเนื้อหาของคำขอ
- ตัวเลือก '{ new: true }' คืนค่าด๊อกคิวเมนต์ที่ถูกอัปเดตหลังจากการแก้ไข
- หากไม่พบบัญชี จะส่งสถานะ 404 พร้อมข้อความ 'ไม่พบบัญชี'
- ข้อผิดพลาดใด ๆ ที่พบระหว่างดำเนินการจะถูกจับและส่งต่อไปยังมิดเดิลแวร์ถัดไป
*/
routes.route("/update-account/:id").put(async (req, res, next) => {
  try {
    const data = await Account.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({ msg: "Account not found" });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
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
module.exports = routes;