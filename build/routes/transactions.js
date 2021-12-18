"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
const TransactionsController_1 = __importDefault(require("../controller/TransactionsController"));
router.use((0, cors_1.default)());
router.post("/", (req, res) => TransactionsController_1.default.AddTransaction(req, res));
router.get("/all", (req, res) => TransactionsController_1.default.GetAllTransactions(req, res));
router.get("/credit", (req, res) => TransactionsController_1.default.GetCredits(req, res));
router.get("/debit", (req, res) => TransactionsController_1.default.GetDebits(req, res));
module.exports = router;
