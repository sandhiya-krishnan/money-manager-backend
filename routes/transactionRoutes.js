const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  getSummary,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");

/* ROUTES */
router.post("/", addTransaction);
router.get("/", getTransactions);
router.get("/summary", getSummary);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);

module.exports = router;
