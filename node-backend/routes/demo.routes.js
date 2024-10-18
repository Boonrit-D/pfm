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
const express = require("express");
const DemoAccount = require("../models/demo-account");
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
demoRoutes.route("/").get(async (req, res, next) => {
  try {
    const data = await DemoAccount.find();
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
demoRoutes.route("/read-account/:id").get(async (req, res, next) => {
  try {
    const data = await DemoAccount.findById(req.params.id);
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
demoRoutes.route("/create-account").post(async (req, res, next) => {
  try {
    const data = await DemoAccount.create(req.body);
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
demoRoutes.route("/update-account/:id").put(async (req, res, next) => {
  try {
    const data = await DemoAccount.findByIdAndUpdate(
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
demoRoutes.route("/delete-account/:id").delete(async (req, res, next) => {
  try {
    const data = await DemoAccount.findByIdAndDelete(req.params.id);
    res.status(200).json({
      msg: data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/* 
Defining a POST route for creating a new transaction for a specific account:
กำหนดเส้นทาง POST สำหรับการสร้างธุรกรรมใหม่สำหรับบัญชีที่ระบุ:

This route handles the creation of a transaction associated with a specific account ID provided in the URL.
เส้นทางนี้จัดการการสร้างธุรกรรมที่เชื่อมโยงกับบัญชีที่ระบุโดย ID ใน URL

- Extracts the account ID from the request parameters.
- Attempts to find the account by its ID in the database.
- If the account is not found, responds with a 404 status code and an error message.
- If the account is found, adds the new transaction (from the request body) to the account's transactions array.
- Saves the updated account with the new transaction.
- Responds with the updated account data in JSON format.
- If an error occurs, logs the error and passes it to the next middleware for handling.

- ดึง ID ของบัญชีจากพารามิเตอร์ของคำขอ
- พยายามค้นหาบัญชีตาม ID ในฐานข้อมูล
- หากไม่พบบัญชี จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- หากพบบัญชี จะเพิ่มธุรกรรมใหม่ (จาก body ของคำขอ) ลงในอาร์เรย์ transactions ของบัญชี
- บันทึกบัญชีที่อัปเดตพร้อมธุรกรรมใหม่
- ตอบกลับด้วยข้อมูลบัญชีที่อัปเดตในรูปแบบ JSON
- หากเกิดข้อผิดพลาด จะทำการล็อกข้อผิดพลาดและส่งต่อให้ middleware ถัดไปเพื่อจัดการ
*/
demoRoutes.route("/create-transaction/:id").post(async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const account = await DemoAccount.findById(accountId);

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

/* 
Defining a GET route for retrieving transactions of a specific account:
กำหนดเส้นทาง GET สำหรับการดึงธุรกรรมของบัญชีที่ระบุ:

This route handles requests to fetch all transactions associated with a specific account ID provided in the URL.
เส้นทางนี้จัดการคำขอเพื่อนำธุรกรรมทั้งหมดที่เชื่อมโยงกับบัญชีที่ระบุโดย ID ใน URL

- Extracts the account ID from the request parameters.
- Attempts to find the account by its ID in the database.
- If the account is not found, responds with a 404 status code and an error message.
- If the account is found, responds with the account's transactions in JSON format.
- If an error occurs, logs the error and passes it to the next middleware for handling.

- ดึง ID ของบัญชีจากพารามิเตอร์ของคำขอ
- พยายามค้นหาบัญชีตาม ID ในฐานข้อมูล
- หากไม่พบบัญชี จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- หากพบบัญชี จะตอบกลับด้วยธุรกรรมของบัญชีในรูปแบบ JSON
- หากเกิดข้อผิดพลาด จะทำการล็อกข้อผิดพลาดและส่งต่อให้ middleware ถัดไปเพื่อจัดการ
*/
demoRoutes
  .route("/read-account-transactions/:id")
  .get(async (req, res, next) => {
    try {
      const account = await DemoAccount.findById(req.params.id);
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
Defining a GET route for retrieving a specific transaction from an account:
กำหนดเส้นทาง GET สำหรับการดึงธุรกรรมเฉพาะจากบัญชี:

This route handles requests to fetch a specific transaction identified by its ID within a given account.
เส้นทางนี้จัดการคำขอเพื่อนำธุรกรรมเฉพาะที่ระบุโดย ID ในบัญชีที่กำหนด

- Extracts the account ID and transaction ID from the request parameters.
- Attempts to find the account by its ID in the database.
- If the account is not found, responds with a 404 status code and an error message.
- If the account is found, attempts to find the transaction by its ID within the account's transactions.
- If the transaction is not found, responds with a 404 status code and an error message.
- If the transaction is found, responds with the transaction data in JSON format.
- If an error occurs, logs the error and passes it to the next middleware for handling.

- ดึง ID ของบัญชีและ ID ของธุรกรรมจากพารามิเตอร์ของคำขอ
- พยายามค้นหาบัญชีตาม ID ในฐานข้อมูล
- หากไม่พบบัญชี จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- หากพบบัญชี จะพยายามค้นหาธุรกรรมตาม ID ในธุรกรรมของบัญชี
- หากไม่พบธุรกรรม จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- หากพบบัญชี จะตอบกลับด้วยข้อมูลธุรกรรมในรูปแบบ JSON
- หากเกิดข้อผิดพลาด จะทำการล็อกข้อผิดพลาดและส่งต่อให้ middleware ถัดไปเพื่อจัดการ
*/
demoRoutes
  .route("/read-account-transaction/:accountId/:transactionId")
  .get(async (req, res, next) => {
    try {
      const account = await DemoAccount.findById(req.params.accountId);
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
Defining a PUT route for updating a specific transaction within an account:
กำหนดเส้นทาง PUT สำหรับการปรับปรุงธุรกรรมเฉพาะภายในบัญชี:

This route handles requests to update a specific transaction identified by its ID within a given account.
เส้นทางนี้จัดการคำขอเพื่อปรับปรุงธุรกรรมเฉพาะที่ระบุโดย ID ในบัญชีที่กำหนด

- Extracts the account ID and transaction ID from the request parameters.
- Attempts to find the account by its ID in the database.
- Attempts to find the transaction by its ID within the account's transactions.
- If either the account or the transaction is not found, responds with a 404 status code and an error message.
- If both are found, updates the transaction details with the data from the request body.
- Saves the updated account back to the database.
- Responds with the updated transaction data in JSON format.
- If an error occurs, logs the error and passes it to the next middleware for handling.

- ดึง ID ของบัญชีและ ID ของธุรกรรมจากพารามิเตอร์ของคำขอ
- พยายามค้นหาบัญชีตาม ID ในฐานข้อมูล
- พยายามค้นหาธุรกรรมตาม ID ในธุรกรรมของบัญชี
- หากไม่พบบัญชีหรือธุรกรรมใด ๆ จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- หากพบทั้งคู่ จะทำการปรับปรุงรายละเอียดธุรกรรมด้วยข้อมูลจาก body ของคำขอ
- บันทึกบัญชีที่อัปเดตกลับลงในฐานข้อมูล
- ตอบกลับด้วยข้อมูลธุรกรรมที่อัปเดตในรูปแบบ JSON
- หากเกิดข้อผิดพลาด จะทำการล็อกข้อผิดพลาดและส่งต่อให้ middleware ถัดไปเพื่อจัดการ
*/
demoRoutes
  .route("/update-account-transaction/:accountId/:transactionId")
  .put(async (req, res, next) => {
    try {
      const account = await DemoAccount.findById(req.params.accountId);
      const transaction = account?.transactions.id(req.params.transactionId);

      if (!account || !transaction) {
        return res
          .status(404)
          .json({ message: "Account or Transaction not found" });
      }

      Object.assign(transaction, req.body);
      await account.save();

      res.json(transaction);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

/* 
Defining a PUT route for updating the balance of a specific account:
กำหนดเส้นทาง PUT สำหรับการปรับปรุงยอดเงินของบัญชีเฉพาะ:

This route handles requests to update the balance of an account identified by its ID.
เส้นทางนี้จัดการคำขอเพื่อปรับปรุงยอดเงินของบัญชีที่ระบุโดย ID

- Extracts the account ID from the request parameters.
- Extracts the new balance value from the request body.
- Attempts to find and update the account's balance using the provided ID.
- If the account is not found, responds with a 404 status code and an error message.
- If the update is successful, responds with the updated account data in JSON format.
- If an error occurs, logs the error and passes it to the next middleware for handling.

- ดึง ID ของบัญชีจากพารามิเตอร์ของคำขอ
- ดึงค่า balance ใหม่จาก body ของคำขอ
- พยายามค้นหาและปรับปรุงยอดเงินของบัญชีโดยใช้ ID ที่ให้มา
- หากไม่พบบัญชี จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- หากการอัปเดตสำเร็จ จะตอบกลับด้วยข้อมูลบัญชีที่อัปเดตในรูปแบบ JSON
- หากเกิดข้อผิดพลาด จะทำการล็อกข้อผิดพลาดและส่งต่อให้ middleware ถัดไปเพื่อจัดการ
*/
demoRoutes.route("/update-balance/:id").put(async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const { balance } = req.body;

    const updatedAccount = await DemoAccount.findByIdAndUpdate(
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
กำหนดเส้นทาง DELETE สำหรับการลบธุรกรรมเฉพาะจากบัญชี:

This route handles requests to delete a transaction identified by its ID from a specific account.
เส้นทางนี้จัดการคำขอเพื่อลบธุรกรรมที่ระบุโดย ID จากบัญชีเฉพาะ

- Retrieves the account from the database using the account ID from the request parameters.
- If the account is not found, responds with a 404 status code and an error message.
- Searches for the specified transaction within the account's transactions array.
- If the transaction is not found, responds with a 404 status code and an error message.
- Removes the transaction from the transactions array using the pull method.
- Saves the updated account after deletion.
- Responds with a success message and the deleted transaction data.

- ดึงบัญชีจากฐานข้อมูลโดยใช้ account ID จากพารามิเตอร์ของคำขอ
- หากไม่พบบัญชี จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- ค้นหาธุรกรรมที่ระบุในอาร์เรย์ transactions ของบัญชี
- หากไม่พบบันทึกธุรกรรม จะตอบกลับด้วยสถานะ 404 และข้อความข้อผิดพลาด
- ลบธุรกรรมออกจากอาร์เรย์ transactions โดยใช้วิธี pull
- บันทึกบัญชีที่อัปเดตหลังจากลบ
- ตอบกลับด้วยข้อความสำเร็จและข้อมูลธุรกรรมที่ถูกลบ
*/
demoRoutes.route('/delete-account-transaction/:accountId/:transactionId').delete(async (req, res, next) => {
  try {
      const account = await DemoAccount.findById(req.params.accountId);

      if (!account) {
          return res.status(404).json({ message: 'Account not found' });
      }

      const transaction = account.transactions.id(req.params.transactionId);
      if (!transaction) {
          return res.status(404).json({ message: 'Transaction not found' });
      }

      account.transactions.pull(transaction);
      await account.save();

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
module.exports = demoRoutes;
