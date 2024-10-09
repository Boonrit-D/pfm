const { type } = require("mongoose");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Transaction = new Schema({
    title : {
        type: String
    },
    type : {
        type: String 
    },
    amount : {
        type: String
    }
}, {
    collection : 'transactions'
})

module.exports = mongoose.model('Transaction', Transaction);