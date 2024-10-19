const Job = require("../models/jobSchema");

exports.getAllJobs = async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find();

    // If no jobs are found, return a 404 response
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found.",
      });
    }

    // Return the jobs data
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    // Log the error and return a 500 response for server issues
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching jobs.",
    });
  }
};