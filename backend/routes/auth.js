const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users/User')

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET || "supersecretkey",
            { expiresIn: '1h' }
        );

        res
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // only over HTTPS in prod
                sameSite: 'Strict',
                maxAge: 3600000, // 1 hour
            })
            .json({ message: 'Login successful' });


    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
