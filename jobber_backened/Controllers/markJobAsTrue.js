const Job = require("../models/jobSchema"); // Import the Job model
const User = require("../models/User"); // Import the User model (assuming this exists)

exports.markJobAsTrue = async (req, res) => {
  try {
    const { jobId } = req.params; // Extract jobId from request parameters
    const { amount, userId } = req.body; // Assuming userId and amount are passed in the request body

    // Find the job by its ID and update the marked field to true
    const job = await Job.findByIdAndUpdate(
      jobId,
      { marked: true },
      { new: true } // Return the updated job document
    );

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Update the user's amount after assigning the job (assuming `amount` and `userId` are provided)
    if (userId && amount !== undefined) {
      const user = await User.findByIdAndUpdate(
        userId,
        { amount: amount + Int16Array(job.salary) }, // Subtract job salary from user amount
        { new: true } // Return updated user document
      );

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
    }

    res.status(200).json({
      success: true,
      message: "Job marked as true successfully and user amount updated",
      job,
    });
  } catch (error) {
    console.error("Error marking job as true:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
