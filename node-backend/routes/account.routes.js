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

// Get a account
accountRoute.route('/read-account/:id').get( async (req, res, next) => {
    try {
        const data = await Account.findById(req.params.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Update account
accountRoute.route('/update-account/:id').put(async (req, res, next) => {
    try {
        const data = await Account.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        if (!data) {
            return res.status(404).json({ msg: 'Account not found' });
        }
        res.json(data);
    } catch (error) {
        next(error);
        console.log(error);
    }
});

// Delete account
accountRoute.route('/delete-account/:id').delete( async (req, res, next) => {
    try {
        const data = await Account.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg:data
        })
    } catch (error) {
        next(error);
    }
});

module.exports = accountRoute ;