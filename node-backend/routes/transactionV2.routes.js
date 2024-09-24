const express = require('express');
const app = express();

const transactionRouteV2 = express.Router();
let TransactionV2 = require('../model/transactionV2');

// V2
// Get all transactionsV2
transactionRouteV2.route('/').get( async (req, res, next) => {
    try {
        const data = await TransactionV2.find();
        res.json(data);
    } catch (error) {
        next(error);
    }
})

// Get a transaction
transactionRouteV2.route('/read-transactionV2/:id').get( async (req, res, next) => {
    try {
        const data = await TransactionV2.findById(req.params.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Add transaction
transactionRouteV2.route('/add-transactionV2').post( async (req, res, next) => {
    try {
        const data = await TransactionV2.create(req.body);
        res.json(data);
    } catch (error) {
        next(error);
    } 
});

// Delete transaction
transactionRouteV2.route('/delete-transactionV2/:id').delete( async (req, res, next) => {
    try {
        const data = await TransactionV2.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg:data
        })
    } catch (error) {
        next(error);
    }
});

// Update book
transactionRouteV2.route('/update-transactionV2/:id').put(async (req, res, next) => {
    try {
        const data = await TransactionV2.findByIdAndUpdate(req.params.id, {
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

module.exports = transactionRouteV2 ;