const express = require('express');
const router = express.Router();
const { registerUser } = require('../Controllers/Register');
const {loginUser}=require('../Controllers/Login')

// POST request to register a user
router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;
