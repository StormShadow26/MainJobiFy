const User = require('../models/User'); // Assuming the user model is in this path
const Job = require('../models/jobSchema'); // Assuming the job model is in this path

// Controller function to add a job ID to the user's jobsInterested field
const addJobInterest = async (req, res) => {
  try {
    const { email, jobId } = req.body; // Assuming the request contains email and jobId

    // Validate if the email and jobId are provided
    if (!email || !jobId) {
      return res.status(400).json({ error: 'Email and jobId are required' });
    }

    // Find the user by their email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the job exists
    // const job = await Job.findById(jobId);

    // if (!job) {
    //   return res.status(404).json({ error: 'Job not found' });
    // }

    // Check if the job is already in the user's jobsInterested array
    if (user.jobsInterested.includes(jobId)) {
      return res.status(400).json({ error: 'User has already shown interest in this job' });
    }

    // Add the jobId to the user's jobsInterested field
    user.jobsInterested.push(jobId);

    // Save the updated user
    await user.save();

    // Return a success response
    res.status(200).json({ message: 'Job interest added successfully', user });
  } catch (error) {
    console.error('Error adding job interest:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addJobInterest,
};
