const User = require('../models/User'); // Importing the User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Controller for logging in a user
const loginUser = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { 
        email, password } = req.body;

    // Check if the user exists in the database
    const existingUser = await User.findOne({ 
        email });
    if (!existingUser) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // If login is successful, return a success message and user data (excluding password)
    return res.status(200).json({
      message: "Login successful.",
      user: {
        name: existingUser.name,
        email: existingUser.email,
        contact: existingUser.contact,
        walletAddress: existingUser.walletAddress,
        paymentCurrency: existingUser.paymentCurrency,
        skills: existingUser.skills,
        availability: existingUser.availability,
        dob: existingUser.dob,
        pan: existingUser.pan,
        jobsInterested: existingUser.jobsInterested,
        reviews: existingUser.reviews,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    // Handle any errors that occur during login
    return res.status(500).json({
      error: "An error occurred while logging in. Please try again.",
    });
  }
};

module.exports = { loginUser };
