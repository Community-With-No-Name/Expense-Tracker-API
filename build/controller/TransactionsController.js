"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Transactions_1 = __importDefault(require("../models/Transactions"));
const key = process.env.SECRET_KEY || "secret";
class TransactionsController {
    static AddTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.send(decode)
            var decode = jsonwebtoken_1.default.verify(req.headers['authorization'], key);
            const { transaction_name, transaction_amount, transaction_type, transaction_detail } = req.body;
            const year = new Date().getFullYear();
            const month = Number(new Date().getMonth()) + 1;
            const day = new Date().getDay();
            const newTransaction = {
                transaction_name,
                transaction_amount,
                transaction_type,
                transaction_detail,
                year,
                month,
                day,
                user_id: decode.userId
            };
            yield Transactions_1.default.create(newTransaction).then(() => {
                res.json({ data: newTransaction, message: `${transaction_name} added to the Transaction list successfully` });
            })
                .catch((err) => {
                res.send("error" + err);
            });
        });
    }
    static GetAllTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var decode = jsonwebtoken_1.default.verify(req.headers['authorization'], key);
            yield Transactions_1.default.find({ user_id: decode.userId }).sort({ date_created: -1 }).then(transactions => {
                transactions && res.status(200).json({ message: "All Transactions Retrieved Successfully", data: transactions, total: transactions.length });
                !transactions && res.status(500).json({ message: "Unexpected Error" });
            });
        });
    }
    static GetCredits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var decode = jsonwebtoken_1.default.verify(req.headers['authorization'], key);
            yield Transactions_1.default.find({ transaction_type: "credit", user_id: decode.userId }).sort({ date_created: -1 }).then(transactions => {
                transactions && res.status(200).json({ message: "All Credit Transactions Retrieved Successfully", data: transactions, total: transactions.length });
                !transactions && res.status(500).json({ message: "Unexpected Error" });
            });
        });
    }
    static GetDebits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var decode = jsonwebtoken_1.default.verify(req.headers['authorization'], key);
            yield Transactions_1.default.find({ transaction_type: "debit", user_id: decode.userId }).sort({ date_created: -1 }).then(transactions => {
                transactions && res.status(200).json({ message: "All Credit Transactions Retrieved Successfully", data: transactions, total: transactions.length });
                !transactions && res.status(500).json({ message: "Unexpected Error" });
            });
        });
    }
}
exports.default = TransactionsController;
