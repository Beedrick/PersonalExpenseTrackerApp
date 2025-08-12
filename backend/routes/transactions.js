const express = require('express');
const authMiddleware = require('./middleware/authMiddleware');
const router = express.Router();
const Transaction = require('../models/Transactions/Transaction');

// POST: Create new transaction
router.post('/', authMiddleware, async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    const saved = await transaction.save();
    res.status(201).json(saved, {user: req.user});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: All transactions
router.get('/', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions,  {user: req.user});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove transaction
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
