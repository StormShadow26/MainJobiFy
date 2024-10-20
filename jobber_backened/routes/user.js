const express = require('express');
const router = express.Router();
const { registerUser } = require('../Controllers/Register');
const { loginUser } = require('../Controllers/Login');
const { getAllJobs } = require('../Controllers/getAllJobs');
const { createJob } = require('../Controllers/createJob');
const { InterestedCandidates } = require('../Controllers/InterestedCandidates');
const { markJobAsTrue } = require('../Controllers/markJobAsTrue');
const { markJobAsTrue1 } = require('../Controllers/markJobAsTrue1');
const { addJobInterest } = require('../Controllers/addJobInterest');
const getUserByEmail = require('../Controllers/getUserByEmail');
const {addJobInterest1}=require('../Controllers/addJobInterest1')
const User = require('../models/User');
const Votes=require('../Controllers/Votes');

// POST request to register a user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/yourjobs', getAllJobs);
router.post('/createJob', createJob);
router.put('/applyjobs', InterestedCandidates);
router.put("/markjob/:jobId", markJobAsTrue);
router.put('/yourwork', addJobInterest);
router.put('/yourwork1', addJobInterest1);
router.get('/getuser/:email', getUserByEmail);
router.put("/markjob1/:jobId", markJobAsTrue1);
// Route to upvote a job
router.put('/upvote/:jobId', Votes.upvoteJob);

// Route to downvote a job
router.put('/downvote/:jobId', Votes.downvoteJob);



// Update user cnt by email

router.put('/updateuser/:email', async (req, res) => {
    const { email } = req.params;
    const { cnt } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate({ email }, { cnt }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'cnt updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the cnt' });
    }
});


module.exports = router;
