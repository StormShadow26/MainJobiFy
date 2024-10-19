// Import the User model
const User = require('../models/User'); // Adjust the path as per your project structure

// Controller to fetch user data by email
const getUserByEmail = async (req, res) => {
    const { email } = req.params; // Extract email from request parameters

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // If user not found, send 404 response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If user is found, send user data in the response
        res.status(200).json({ message: 'User found', data: user });
    } catch (error) {
        // Handle any errors during the process
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
};

module.exports = getUserByEmail;
