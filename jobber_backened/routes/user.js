const express = require('express');
const router = express.Router();
const { registerUser } = require('../Controllers/Register');
const {loginUser}=require('../Controllers/Login');
const { getAllJobs } = require('../Controllers/getAllJobs');
const { createJob } = require('../Controllers/createJob');

// POST request to register a user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/yourjobs',getAllJobs);
router.post('/createJob',createJob);

module.exports = router;
