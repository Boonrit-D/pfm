const express = require('express');
const Account = require('../model/account');

const accountRoute = express.Router();

// Get all accounts
accountRoute.route('/').get( async (req, res, next) => {
    try {
        const data = await Account.find();
        res.json(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

// Add account
accountRoute.route('/add-account').post( async (req, res, next) => {
    try {
        const data = await Account.create(req.body);
        res.json(data);
    } catch (error) {
        console.log(error);
        next(error);
    } 
});

// Get a account
accountRoute.route('/read-account/:id').get( async (req, res, next) => {
    try {
        const data = await Account.findById(req.params.id);
        res.json(data);
    } catch (error) {
        console.log(error);
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
        console.log(error);
        next(error);
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
        console.error(error);
        next(error);
    }
});

// Transaction 
// Add transaction
accountRoute.route('/add-transaction/:id').post( async (req, res, next) => {
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
accountRoute.route('/read-account-transactions/:id').get( async (req, res, next) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json(account.transactions);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Update account balance
accountRoute.route('/update-balance/:id').put(async (req, res, next) => {
    try {
        const accountId = req.params.id;
        const { balance } = req.body; // รับค่า balance จาก body ของ request

        const updatedAccount = await Account.findByIdAndUpdate(accountId, { balance }, { new: true });

        if (!updatedAccount) {
            return res.status(404).json({ msg: 'Account not found' });
        }
        
        res.json(updatedAccount);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Get a specific transaction of a specific account
accountRoute.route('/read-account-transaction/:accountId/:transactionId').get(async (req, res, next) => {
    try {
        const account = await Account.findById(req.params.accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Find the transaction by its ID
        const transaction = account.transactions.id(req.params.transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(transaction);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Update a specific transaction of a specific account
accountRoute.route('/update-account-transaction/:accountId/:transactionId').put(async (req, res, next) => {
    try {
        const account = await Account.findById(req.params.accountId);
        const transaction = account?.transactions.id(req.params.transactionId);

        if (!account || !transaction) {
            return res.status(404).json({ message: 'Account or Transaction not found' });
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

module.exports = accountRoute ;