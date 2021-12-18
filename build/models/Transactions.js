"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const TransactionsSchema = new mongoose.Schema({
    transaction_name: String,
    transaction_amount: Number,
    transaction_type: String,
    transaction_detail: String,
    user_id: String,
    month: String,
    year: String,
    day: String,
    date_modified: {
        type: Date,
        default: Date.now
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});
const Transactions = mongoose.model('Transactions', TransactionsSchema);
exports.default = Transactions;
