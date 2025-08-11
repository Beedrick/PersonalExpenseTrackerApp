const express = require('express');
const router = express.Router();
const NewUser = require('../models/Users/NewUser');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {

    // Take user input
    const { username, password, email } = req.body;

    // Hash the password (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with encrypted password
    const user = new NewUser({
        username,
        email,
        password: hashedPassword
    });

    const saved = await user.save();
    res.status(201).json(saved);
});


