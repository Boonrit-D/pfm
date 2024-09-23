const { type } = require("mongoose");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TransactionV2 = new Schema({
    date : {
        type: String
    },
    type : {
        type: String 
    },
    amount : {
        type: String
    },
    description : {
        type: String
    },
    category : {
        type: String
    }
}, {
    collection : 'transactionsV2'
})

module.exports = mongoose.model('TransactionV2', TransactionV2);