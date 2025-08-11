const express = require('express');
const router = express.Router();
const NewUser = require('../models/Users/User');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
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

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:username', async (req, res) => {
    try{

        const username = req.params.username;

        const user = await NewUser.findOne({username: username});

        if(!user){
            return res.status(404).json({error: 'User not found' });
        }

        res.json(user);

    } catch(err){
        res.status(500).json({error: err.message});
    }
});



module.exports = router;

