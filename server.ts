import express from "express"
import path from "path"
import cors from "cors"
import mongoose from "mongoose"
const app = express();
var AuthRouter = require('./routes/auth')
var TransactionsRouter = require('./routes/transactions')
const PORT = process.env.PORT || 8000;
const mongoURI = process.env.ATLAS_URI || "mongodb://localhost/ExpenseTracker"
 const connection = mongoose.connect(mongoURI,
  {
    useNewUrlParser: true,
  useCreateIndex:true,
   useUnifiedTopology:true,
   useFindAndModify: false
 })
 .then(()=>console.log('MongoDB database connected successfully'))
 .catch(error=>console.error(error))

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', AuthRouter);
app.use('/api/transactions', TransactionsRouter);
app.get('/', (req, res) => res.send(`Expense Tracker ⚡️[server]: Server is running at https://localhost:${PORT}`));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});