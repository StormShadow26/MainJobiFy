const User = require('../models/User'); // Importing the User model
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords

// Controller for registering a user
const registerUser = async (req, res) => {
  try {
    // Extract form data from the request body
    const {
      name,
      contact,
      email,
      walletAddress,
      paymentCurrency,
      skills,
      availability,
      dob,
      pan,
      password, // Extracting password
    } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Using 10 salt rounds

    // Create a new user instance with the provided data
    const newUser = new User({
      name,
      contact,
      email,
      walletAddress,
      paymentCurrency,
      skills,
      availability,
      dob,
      pan,
      password: hashedPassword, // Store the hashed password
      jobsInterested: [], // Initially empty
      reviews: [] ,
      cnt:0,              // Initially empty
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with a success message and the saved user data
    return res.status(201).json({
      message: "User registered successfully.",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    // Handle any errors that occur during registration
    return res.status(500).json({
      error: "An error occurred while registering the user. Please try again.",
    });
  }
};

module.exports = { registerUser };
