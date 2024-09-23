const express = require('express');
const app = express();

const transactionRoute = express.Router();
let Transaction = require('../model/transaction_');

// Add transaction
transactionRoute.route('/add-transaction').post( async (req, res, next) => {
    try {
        const data = await Transaction.create(req.body);
        res.json(data);
    } catch (error) {
        next(error);
    } 
});

// Get all transactions
transactionRoute.route('/').get( async (req, res, next) => {
    try {
        const data = await Transaction.find();
        res.json(data);
    } catch (error) {
        next(error);
    }
})

// Get a book
transactionRoute.route('/read-transaction/:id').get( async (req, res, next) => {
    try {
        const data = await Transaction.findById(req.params.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Update book
transactionRoute.route('/update-transaction/:id').put(async (req, res, next) => {
    try {
        const data = await Transaction.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        if (!data) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }
        res.json(data);
    } catch (error) {
        next(error);
        console.log(error);
    }
});

// Delete book
transactionRoute.route('/delete-transaction/:id').delete( async (req, res, next) => {
    try {
        const data = await Transaction.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg:data
        })
    } catch (error) {
        next(error);
    }
});

module.exports = transactionRoute ;