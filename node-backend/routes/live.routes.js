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
Route to retrieve a live account by its ID:
เส้นทางสำหรับดึงข้อมูลบัญชีโดยใช้ ID ของบัญชี:

- This route uses the HTTP GET method to retrieve a specific live account from the database based on the account ID.
- It uses Mongoose's 'findById' method to search for the account.
- If the account is found, it sends the data as a JSON response.
- If an error occurs, it is logged to the console and passed to the next middleware for handling.

- เส้นทางนี้ใช้เมธอด HTTP GET เพื่อดึงข้อมูลบัญชีจากฐานข้อมูลโดยใช้ ID ของบัญชี
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
Route to update a live account by its ID:
เส้นทางสำหรับอัปเดตบัญชีโดยใช้ ID ของบัญชี:

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

/* 
Defining a POST route for creating a new transaction in a specific account:
กำหนดเส้นทาง POST สำหรับการสร้างธุรกรรมใหม่ในบัญชีเฉพาะ:

This route handles requests to create a new transaction and add it to the specified account's transaction array.
เส้นทางนี้จัดการคำขอเพื่อสร้างธุรกรรมใหม่และเพิ่มลงในอาร์เรย์ธุรกรรมของบัญชีที่ระบุ

- Extracts the account ID from the request parameters.
- Retrieves the account from the database using the account ID.
- If the account is not found, responds with a 404 status code and an error message.
- Adds the new transaction data from the request body to the account's transactions array.
- Saves the updated account after adding the new transaction.
- Responds with the updated account data in JSON format.

- ดึง account ID จากพารามิเตอร์ของคำขอ
- ดึงบัญชีจากฐานข้อมูลโดยใช้ account ID
- หากไม่พบบัญชี จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- เพิ่มข้อมูลธุรกรรมใหม่จาก body ของคำขอไปยังอาร์เรย์ transactions ของบัญชี
- บันทึกบัญชีที่อัปเดตหลังจากเพิ่มธุรกรรมใหม่
- ตอบกลับด้วยข้อมูลบัญชีที่อัปเดตในรูปแบบ JSON
*/
routes.route("/create-transaction/:id").post(async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    account.transactions.push(req.body);

    const updatedAccount = await account.save();

    res.json(updatedAccount);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/* 
Defining a GET route for retrieving all transactions of a specific account:
กำหนดเส้นทาง GET สำหรับดึงธุรกรรมทั้งหมดของบัญชีเฉพาะ:

This route handles requests to read all transactions associated with a given account ID.
เส้นทางนี้จัดการคำขอเพื่ออ่านธุรกรรมทั้งหมดที่เกี่ยวข้องกับ account ID ที่กำหนด

- Extracts the account ID from the request parameters.
- Retrieves the account from the database using the account ID.
- If the account is not found, responds with a 404 status code and an error message.
- If the account is found, returns the transactions associated with that account in JSON format.

- ดึง account ID จากพารามิเตอร์ของคำขอ
- ดึงบัญชีจากฐานข้อมูลโดยใช้ account ID
- หากไม่พบบัญชี จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- หากพบบัญชี จะส่งคืนธุรกรรมที่เกี่ยวข้องกับบัญชีนั้นในรูปแบบ JSON
*/
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

/* 
Defining a GET route for retrieving a specific transaction of an account:
กำหนดเส้นทาง GET สำหรับดึงธุรกรรมเฉพาะของบัญชี:

This route handles requests to read a specific transaction associated with an account ID and transaction ID.
เส้นทางนี้จัดการคำขอเพื่ออ่านธุรกรรมเฉพาะที่เกี่ยวข้องกับ account ID และ transaction ID

- Extracts the account ID and transaction ID from the request parameters.
- Retrieves the account from the database using the account ID.
- If the account is not found, responds with a 404 status code and an error message.
- Finds the transaction within the account's transactions array using the transaction ID.
- If the transaction is not found, responds with a 404 status code and an error message.
- If both account and transaction are found, returns the transaction in JSON format.

- ดึง account ID และ transaction ID จากพารามิเตอร์ของคำขอ
- ดึงบัญชีจากฐานข้อมูลโดยใช้ account ID
- หากไม่พบบัญชี จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- ค้นหาธุรกรรมใน array ของธุรกรรมของบัญชีโดยใช้ transaction ID
- หากไม่พบบัญชี จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- หากพบทั้งบัญชีและธุรกรรม จะส่งคืนธุรกรรมในรูปแบบ JSON
*/
routes
  .route("/read-account-transaction/:accountId/:transactionId")
  .get(async (req, res, next) => {
    try {
      const account = await Account.findById(req.params.accountId);
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

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

/* 
Defining a PUT route for updating a specific transaction of an account:
กำหนดเส้นทาง PUT สำหรับการอัปเดตธุรกรรมเฉพาะของบัญชี:

This route handles requests to update an existing transaction associated with an account ID and transaction ID.
เส้นทางนี้จัดการคำขอเพื่ออัปเดตธุรกรรมที่มีอยู่ซึ่งเกี่ยวข้องกับ account ID และ transaction ID

- Retrieves the account from the database using the account ID.
- Finds the transaction within the account's transactions array using the transaction ID.
- If either the account or the transaction is not found, responds with a 404 status code and an error message.
- Updates the transaction details with the new data from the request body.
- Saves the updated account back to the database.
- Returns the updated transaction in JSON format.

- ดึงบัญชีจากฐานข้อมูลโดยใช้ account ID
- ค้นหาธุรกรรมใน array ของธุรกรรมของบัญชีโดยใช้ transaction ID
- หากไม่พบทั้งบัญชีหรือธุรกรรม จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- อัปเดตข้อมูลธุรกรรมด้วยข้อมูลใหม่จาก body ของคำขอ
- บันทึกบัญชีที่อัปเดตกลับไปยังฐานข้อมูล
- ส่งคืนธุรกรรมที่อัปเดตในรูปแบบ JSON
*/
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

/* 
Defining a PUT route for updating the balance of an account:
กำหนดเส้นทาง PUT สำหรับการอัปเดตยอดเงินของบัญชี:

This route handles requests to update the balance of a specific account identified by its ID.
เส้นทางนี้จัดการคำขอเพื่ออัปเดตยอดเงินของบัญชีเฉพาะที่ระบุโดย ID ของมัน

- Extracts the account ID from the request parameters.
- Retrieves the new balance from the request body.
- Uses the findByIdAndUpdate method to update the account's balance in the database.
- The 'new: true' option returns the updated account after the update.
- If the account is not found, responds with a 404 status code and an error message.
- If successful, returns the updated account in JSON format.

- ดึง account ID จากพารามิเตอร์ของคำขอ
- ดึงยอดเงินใหม่จาก body ของคำขอ
- ใช้ findByIdAndUpdate เพื่ออัปเดตยอดเงินของบัญชีในฐานข้อมูล
- ตัวเลือก 'new: true' จะคืนค่าบัญชีที่อัปเดตหลังจากการอัปเดต
- หากไม่พบบัญชี จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- หากสำเร็จ ส่งคืนบัญชีที่อัปเดตในรูปแบบ JSON
*/

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

/* 
Defining a DELETE route for removing a specific transaction from an account:
กำหนดเส้นทาง DELETE สำหรับการลบ transaction เฉพาะจากบัญชี:

This route handles requests to delete a specific transaction identified by its ID from the specified account.
เส้นทางนี้จัดการคำขอเพื่อลบ transaction เฉพาะที่ระบุโดย ID จากบัญชีที่กำหนด

- Extracts the account ID and transaction ID from the request parameters.
- Retrieves the account associated with the provided account ID.
- If the account is not found, responds with a 404 status code and an error message.
- Finds the transaction within the account's transactions array using the provided transaction ID.
- If the transaction is not found, responds with a 404 status code and an error message.
- Uses the pull method to remove the transaction from the transactions array.
- Saves the updated account after the transaction has been removed.
- Responds with a 200 status code and a success message, including the deleted transaction.

- ดึง account ID และ transaction ID จากพารามิเตอร์ของคำขอ
- ดึงข้อมูลบัญชีที่เกี่ยวข้องกับ account ID ที่ให้มา
- หากไม่พบบัญชี จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- ค้นหา transaction ภายในอาร์เรย์ transactions ของบัญชีโดยใช้ transaction ID ที่ให้มา
- หากไม่พบ transaction จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- ใช้เมธอด pull เพื่อลบ transaction จากอาร์เรย์ transactions
- บันทึกบัญชีที่อัปเดตหลังจากลบ transaction
- ตอบกลับด้วยสถานะ 200 และข้อความความสำเร็จ รวมถึง transaction ที่ถูกลบ
*/

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
Exporting the Routes module:
ส่งออกโมดูล Routes:

- This line exports the 'routes' object, making it available for import in other files.
- It allows other parts of the application to use the defined routes for handling requests related to DemoAccount.

- บรรทัดนี้ส่งออกวัตถุ 'routes' ทำให้สามารถนำเข้าในไฟล์อื่นได้
- ช่วยให้ส่วนอื่น ๆ ของแอปพลิเคชันสามารถใช้เส้นทางที่กำหนดสำหรับจัดการคำขอที่เกี่ยวข้องกับ DemoAccount
*/
module.exports = routes;
