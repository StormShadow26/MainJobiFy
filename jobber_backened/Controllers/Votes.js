const Job = require('../models/jobSchema'); // Assuming Job is your Mongoose model

// Function to handle upvoting a job
exports.upvoteJob = async (req, res) => {
  const { jobId } = req.params; // Get jobId from the request parameters

  try {
    // Find the job by its ID
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Increment the upvotes
    job.upvote += 1;

    // Save the updated job
    await job.save();

    // Respond with the updated job data
    res.status(200).json({
      message: "Upvoted successfully",
      data: job
    });
  } catch (error) {
    console.error("Error upvoting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to handle downvoting a job
exports.downvoteJob = async (req, res) => {
  const { jobId } = req.params; // Get jobId from the request parameters

  try {
    // Find the job by its ID
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Decrement the downvotes
    job.downvote += 1;

    // Save the updated job
    await job.save();

    // Respond with the updated job data
    res.status(200).json({
      message: "Downvoted successfully",
      data: job
    });
  } catch (error) {
    console.error("Error downvoting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
