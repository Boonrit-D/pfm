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
- It uses the 'find' method from Mongoose to get all account documents stored in the DemoAccount collection.
- If successful, it returns the list of accounts as a JSON response.
- In case of an error, it catches the error and passes it to the next middleware for further handling.

- เส้นทางนี้ใช้สำหรับดึงข้อมูลบัญชีทั้งหมดจากฐานข้อมูล
- ใช้เมธอด 'find' ของ Mongoose เพื่อดึงเอกสารบัญชีทั้งหมดในคอลเลกชัน DemoAccount
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
routes.route("/delete-account/:id").delete(async (req, res, next) => {
  try {
    const data = await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({
      msg: data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//
routes.route("/create-transaction/:id").post(async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Add the new transaction to the account's transactions array
    account.transactions.push(req.body);

    // Save the account with the new transaction
    const updatedAccount = await account.save();

    res.json(updatedAccount);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Get transactions of a specific account
routes
  .route("/read-account-transactions/:id")
  .get(async (req, res, next) => {
    try {
      const account = await Account.findById(req.params.id);
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
      res.json(account.transactions);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

// Get a specific transaction of a specific account
routes
  .route("/read-account-transaction/:accountId/:transactionId")
  .get(async (req, res, next) => {
    try {
      const account = await Account.findById(req.params.accountId);
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

      // Find the transaction by its ID
      const transaction = account.transactions.id(req.params.transactionId);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      res.json(transaction);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

// Update a specific transaction of a specific account
routes
  .route("/update-account-transaction/:accountId/:transactionId")
  .put(async (req, res, next) => {
    try {
      const account = await Account.findById(req.params.accountId);
      const transaction = account?.transactions.id(req.params.transactionId);

      if (!account || !transaction) {
        return res
          .status(404)
          .json({ message: "Account or Transaction not found" });
      }

      // Update the transaction details
      Object.assign(transaction, req.body);
      await account.save();

      res.json(transaction);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

// Update account balance
routes.route("/update-balance/:id").put(async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const { balance } = req.body; // รับค่า balance จาก body ของ request

    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      { balance },
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ msg: "Account not found" });
    }

    res.json(updatedAccount);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Delete a specific transaction of a specific account
routes.route('/delete-account-transaction/:accountId/:transactionId').delete(async (req, res, next) => {
  try {
      // ดึง Account จาก req.params.accountId
      const account = await Account.findById(req.params.accountId);

      if (!account) {
          return res.status(404).json({ message: 'Account not found' });
      }

      // ค้นหาและลบ transaction จากบัญชี
      const transaction = account.transactions.id(req.params.transactionId);
      if (!transaction) {
          return res.status(404).json({ message: 'Transaction not found' });
      }

      // ลบ transaction ออกจาก array
      account.transactions.pull(transaction); // ใช้ pull แทน remove
      await account.save(); // บันทึกการเปลี่ยนแปลงหลังจากลบ

      res.status(200).json({
          message: 'Transaction deleted successfully',
          deletedTransaction: transaction
      });
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
module.exports = routes;
