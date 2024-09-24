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

// Add transaction
transactionRouteV2.route('/add-transactionV2').post( async (req, res, next) => {
    try {
        const data = await TransactionV2.create(req.body);
        res.json(data);
    } catch (error) {
        next(error);
    } 
});

// Delete book
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

module.exports = transactionRouteV2 ;