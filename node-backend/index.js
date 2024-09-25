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

// API root
app.use('/api', transactionRoute);
app.use('/apiV2', transactionRouteV2);

// API root of Account
app.use('/account', accountRoute);

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