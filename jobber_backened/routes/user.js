const express = require('express');
const router = express.Router();
const { registerUser } = require('../Controllers/Register');
const {loginUser}=require('../Controllers/Login');
const { getAllJobs } = require('../Controllers/getAllJobs');
const { createJob } = require('../Controllers/createJob');
const { InterestedCandidates } = require('../Controllers/InterestedCandidates');
const {markJobAsTrue}=require('../Controllers/markJobAsTrue');
const { addJobInterest } = require('../Controllers/addJobInterest');
const getUserByEmail = require('../Controllers/getUserByEmail');

// POST request to register a user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/yourjobs',getAllJobs);
router.post('/createJob',createJob);
router.put('/applyjobs',InterestedCandidates);
router.put("/markjob/:jobId", markJobAsTrue);
router.put('/yourwork',addJobInterest);
router.get('/getuser/:email', getUserByEmail);

module.exports = router;
