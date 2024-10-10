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
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const mongoDb = require('./database/db');
const path = require('path');

// routes
const transactionRoute = require('./routes/transaction.routes');
const transactionRouteV2 = require('./routes/transactionV2.routes');
const accountRoute = require('./routes/account.routes');
const authRoute = require('./routes/auth.routes');

// ►►► Prepared ◄◄◄
// ►►► Routes ◄◄◄

// Importing the demo routes from the specified routes file
// นำเข้าเส้นทางของ demo จากไฟล์เส้นทางที่ระบุ
const demoRoutes = require('./routes/demo.routes')

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
}).then(() => {
    console.log('Database successfully connected');
}, error => {
    console.log('Database error: ' + error);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// Static directory path
app.use(express.static(path.join(__dirname, 'dist/')));

// Base route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// API root of Transaction
app.use('/transactionVersion1', transactionRoute);
app.use('/transactionVersion2', transactionRouteV2);

// API root of Account
// app.use('/account', accountRoute);
app.use('/account', jwtMiddleware, accountRoute);

// API root of User
app.use('/auth', authRoute);

// ►►► Prepared ◄◄◄
// Mounting the demo routes under the '/demo' path
// ติดตั้งเส้นทางของ demo ภายใต้เส้นทาง '/demo'
app.use('/demo', demoRoutes);

// PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
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