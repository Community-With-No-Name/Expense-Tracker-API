import express from "express";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { decode } from "punycode";
import Transactions from "../models/Transactions";
const key = process.env.SECRET_KEY || "secret"
class TransactionsController {
  static async AddTransaction(req, res) {
    // res.send(decode)
    var decode = jwt.verify(req.headers['authorization'], key)
    const { transaction_name,
      transaction_amount,
      transaction_type,
      transaction_detail } = req.body;
      const year = new Date().getFullYear()
      const month = Number(new Date().getMonth()) + 1
    const day = new Date().getDay()
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
    await Transactions.create(newTransaction).then(() => {
      res.json({ data: newTransaction, message: `${transaction_name} added to the Transaction list successfully` });
    })
    .catch((err) => {
        res.send("error" + err);
      });
    }
    static async GetAllTransactions(req, res) {
    var decode = jwt.verify(req.headers['authorization'], key)
    await Transactions.find({user_id: decode.userId}).sort({date_created: -1}).then(transactions=>{
      transactions && res.status(200).json({message: "All Transactions Retrieved Successfully", data: transactions, total: transactions.length})
      !transactions && res.status(500).json({message: "Unexpected Error"})
    })
  }
  static async GetCredits(req, res) {
    var decode = jwt.verify(req.headers['authorization'], key)
    await Transactions.find({transaction_type: "credit", user_id: decode.userId}).sort({date_created: -1}).then(transactions=>{
      transactions && res.status(200).json({message: "All Credit Transactions Retrieved Successfully", data: transactions, total: transactions.length})
      !transactions && res.status(500).json({message: "Unexpected Error"})
    })
  }
  static async GetDebits(req, res) {
    var decode = jwt.verify(req.headers['authorization'], key)
    await Transactions.find({transaction_type: "debit", user_id: decode.userId}).sort({date_created: -1}).then(transactions=>{
      transactions && res.status(200).json({message: "All Credit Transactions Retrieved Successfully", data: transactions, total: transactions.length})
      !transactions && res.status(500).json({message: "Unexpected Error"})
    })
  }
}
export default TransactionsController;
