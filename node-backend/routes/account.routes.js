const express = require('express');
const Account = require('../model/account');

const accountRoute = express.Router();

// Get all accounts
accountRoute.route('/').get( async (req, res, next) => {
    try {
        const data = await Account.find();
        res.json(data);
    } catch (error) {
        next(error);
    }
})

// Add transaction
accountRoute.route('/add-account').post( async (req, res, next) => {
    try {
        const data = await Account.create(req.body);
        res.json(data);
    } catch (error) {
        next(error);
    } 
});

module.exports = accountRoute ;