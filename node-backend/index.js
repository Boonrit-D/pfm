/* 
Importing the necessary modules and middleware for the application:
นำนำเข้าโมดูลและ middleware ที่จำเป็นสำหรับแอปพลิเคชัน:

ЄпǤ
- body-parser: Middleware for parsing incoming request bodies.
- cors: Middleware for enabling Cross-Origin Resource Sharing.
- express: Framework for building web applications.
- http-errors: Library for creating HTTP errors.
- mongoose: Library for MongoDB object modeling.
- jwtMiddleware: Middleware for handling JSON Web Tokens.
- mongoDb: Database configuration file.
- path: Module for working with file and directory paths.
Գnຍ
- body-parser: Middleware สำหรับการแปลงข้อมูลในคำขอที่เข้ามา
- cors: Middleware สำหรับเปิดใช้งานการแชร์ทรัพยากรข้ามต้นทาง
- express: Framework สำหรับสร้างเว็บแอปพลิเคชัน
- http-errors: ไลบรารีสำหรับสร้างข้อผิดพลาด HTTP
- mongoose: ไลบรารีสำหรับการสร้างโมเดลใน MongoDB
- jwtMiddleware: Middleware สำหรับจัดการ JSON Web Tokens
- mongoDb: ไฟล์การกำหนดค่าฐานข้อมูล
- path: โมดูลสำหรับการทำงานกับไฟล์และเส้นทางไดเรกทอรี
*/
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const createError = require("http-errors");
const mongoose = require("mongoose");
const jwtMiddleware = require("./middlewares/jwtMiddleware");
const mongoDb = require("./database/db");
const path = require("path");

// ►►► Authentication ◄◄◄
/* 
Importing route modules for the application:
นำเข้าโมดูลเส้นทางสำหรับแอปพลิเคชัน:

- authRoute: Routes for handling authentication-related requests.
- authRoute: เส้นทางสำหรับจัดการคำขอที่เกี่ยวข้องกับการรับรองความถูกต้อง
*/
const authRoute = require("./routes/auth.routes");

// ►►► Routes ◄◄◄

// Importing the demo routes from the specified routes file
// นำเข้าเส้นทางของ demo จากไฟล์เส้นทางที่ระบุ
const demoRoutes = require("./routes/demo.routes");

// Importing the live routes from the specified routes file
// นำเข้าเส้นทางของการใช้งานจากไฟล์เส้นทางที่ระบุ
const routes = require("./routes/live.routes");

/* 
Connecting to the MongoDB database using Mongoose:
เชื่อมต่อกับฐานข้อมูล MongoDB โดยใช้ Mongoose:

- Set Mongoose to use the global Promise for better compatibility.
- Connect to the database using the connection string from mongoDb.db.
- Log a success message if the connection is established successfully.
- If there's an error during connection, log the error message.

- ตั้งค่า Mongoose ให้ใช้ Promise ของ global เพื่อความเข้ากันได้ที่ดีขึ้น
- เชื่อมต่อกับฐานข้อมูลโดยใช้ connection string จาก mongoDb.db
- แสดงข้อความสำเร็จหากการเชื่อมต่อสำเร็จ
- หากเกิดข้อผิดพลาดระหว่างการเชื่อมต่อ ให้แสดงข้อความข้อผิดพลาด
*/
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {}).then(
  () => {
    console.log("Database successfully connected");
  },
  (error) => {
    console.log("Database error: " + error);
  }
);

/* 
Setting up the Express application middleware:
การตั้งค่า middleware สำหรับแอปพลิเคชัน Express:

- Create an instance of the Express application.
- Use body-parser middleware to parse JSON requests.
- Use body-parser middleware to parse URL-encoded requests with extended options set to false.
- Use CORS middleware to enable Cross-Origin Resource Sharing for the application.

- สร้างอินสแตนซ์ของแอปพลิเคชัน Express
- ใช้ middleware body-parser เพื่อแปลงคำขอ JSON
- ใช้ middleware body-parser เพื่อแปลงคำขอที่เป็น URL-encoded โดยตั้งค่า extended เป็น false
- ใช้ middleware CORS เพื่อเปิดใช้งาน Cross-Origin Resource Sharing สำหรับแอปพลิเคชัน
*/
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

/* 
Serving static files from the 'dist' directory:
ให้บริการไฟล์สแตติกจากไดเรกทอรี 'dist':

- Use the express.static middleware to serve static files.
- The path to the 'dist' directory is constructed using path.join with __dirname to ensure compatibility across different operating systems.

- ใช้ middleware express.static เพื่อให้บริการไฟล์สแตติก
- เส้นทางไปยังไดเรกทอรี 'dist' จะถูกสร้างขึ้นโดยใช้ path.join กับ __dirname เพื่อให้เข้ากันได้กับระบบปฏิบัติการที่แตกต่างกัน
*/
app.use(express.static(path.join(__dirname, "dist/")));

/* 
Defining a GET route to serve the index.html file:
กำหนดเส้นทาง GET สำหรับให้บริการไฟล์ index.html:

- This route listens for GET requests to "/index".
- It responds by sending the index.html file located in the 'dist' directory.
- The path to the file is constructed using path.join with __dirname to ensure correct file location.

- เส้นทางนี้จะรับคำขอ GET ไปที่ "/index"
- จะตอบกลับโดยการส่งไฟล์ index.html ที่อยู่ในไดเรกทอรี 'dist'
- เส้นทางไปยังไฟล์จะถูกสร้างขึ้นโดยใช้ path.join กับ __dirname เพื่อให้ตำแหน่งไฟล์ถูกต้อง
*/
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// ►►► Authentication ◄◄◄
app.use("/auth", authRoute);

// ►►► Routes ◄◄◄
// Mounting the demo routes under the '/demo' path
// ติดตั้งเส้นทางของ demo ภายใต้เส้นทาง '/demo'
app.use("/demo", demoRoutes);

// Mounting the live routes under the '/' path
// ติดตั้งเส้นทางของการใช้งานภายใต้เส้นทาง '/'
app.use("/accounts", jwtMiddleware, routes);

// PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});

// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
