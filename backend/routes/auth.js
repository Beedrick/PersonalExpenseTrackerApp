const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users/User') // your mongoose user model

// POST /login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Check if user exists
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // 3. Create JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET || "supersecretkey",
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
