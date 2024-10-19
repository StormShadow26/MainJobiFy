const Job = require("../models/jobSchema"); // Import the Job model

// Controller to mark a job as true
exports.markJobAsTrue = async (req, res) => {
  try {
    const { jobId } = req.params; // Extract jobId from request parameters

    // Find the job by its ID and update the marked field to true
    const job = await Job.findByIdAndUpdate(
      jobId,
      { marked: true },
      { new: true } // Return the updated document
    );

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({
      success: true,
      message: "Job marked as true successfully",
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
