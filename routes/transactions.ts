import express from "express"
var router = express.Router()
import cors from "cors"
import TransactionsController from '../controller/TransactionsController';
router.use(cors())

router.post("/", (req, res) => TransactionsController.AddTransaction(req, res))
router.get("/all", (req, res) => TransactionsController.GetAllTransactions(req, res))
router.get("/credit", (req, res) => TransactionsController.GetCredits(req, res))
router.get("/debit", (req, res) => TransactionsController.GetDebits(req, res))


module.exports = router