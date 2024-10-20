const User = require('../models/User'); // Assuming the user model is in this path
const Job = require('../models/jobSchema'); // Assuming the job model is in this path

// Controller function to add a job ID to the user's jobsInterested field
const addJobInterest1 = async (req, res) => {
  try {
    const { amount,email} = req.body; // Assuming the request contains email and jobId

    // Validate if the email and jobId are provided
    if (!email ) {
      return res.status(400).json({ error: 'Email  required' });
    }

    // Find the user by their email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.amount=user.amount-amount;

    // Check if the job exists
    // const job = await Job.findById(jobId);

    // if (!job) {
    //   return res.status(404).json({ error: 'Job not found' });
    // }

   

    

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
  addJobInterest1,
};
