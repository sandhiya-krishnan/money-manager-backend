const Transaction = require("../models/Transaction");

/* ADD TRANSACTION */
const addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* GET ALL TRANSACTIONS */
const getTransactions = async (req, res) => {
  const data = await Transaction.find().sort({ date: -1 });
  res.json(data);
};

/* SUMMARY */
const getSummary = async (req, res) => {
  const tx = await Transaction.find();
  let income = 0;
  let expense = 0;

  tx.forEach((t) =>
    t.type === "income"
      ? (income += t.amount)
      : (expense += t.amount)
  );

  res.json({
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense,
  });
};

/* DELETE */
const deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

/* UPDATE */
const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        type: req.body.type,
        division: req.body.division,
        category: req.body.category,
        amount: Number(req.body.amount),
        date: new Date(req.body.date),
      },
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ✅ EXPORTS (THIS IS CRITICAL) */
module.exports = {
  addTransaction,
  getTransactions,
  getSummary,
  deleteTransaction,
  updateTransaction,
};
