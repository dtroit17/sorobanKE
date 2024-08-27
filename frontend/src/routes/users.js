// handles the logic for fetching and creating users

const express = require('express');
const Users = require('../collections/Users');

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new Users({ username, email, password });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
