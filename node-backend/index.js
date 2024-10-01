const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoDb = require('./database/db');
const createError = require('http-errors');

// routes
const transactionRoute = require('./routes/transaction.routes');
const transactionRouteV2 = require('./routes/transactionV2.routes');
const accountRoute = require('./routes/account.routes');
const authRoute = require('./routes/auth.routes');

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
app.use('/account', accountRoute);

// API root of User
app.use('/auth', authRoute);

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