
const Job = require("../models/jobSchema"); // Import InterestedJob schema

exports.createJob = async (req, res) => {
  try {
    const { jobTitle, company, email, salary, role, workType, description, requirements,deadline } = req.body;

    // Validate required fields
    if (!jobTitle || !company || !email || !role || !workType || !description || !deadline) {
      return res.status(400).json({
        status: 400,
        message: "Please fill all required fields",
      });
    }

    // Create a new job document
    const job = await Job.create({
      jobTitle,
      company,
      email,  // Include the email to link to the interested job later
      salary,
      role,
      workType,
      description,
      requirements,
      deadline,
    });

    // Create an entry in InterestedJob for tracking candidate interest
    // await InterestedJob.create({
    //   company,
    //   title: jobTitle,
    //   companyEmail: email,  // Use the job email for the InterestedJob document
    //   interestedCandidateEmails: [],
    //   interestedCandidateNames: [],
    // });

    // Send success response
    return res.status(201).json({
      status: 201,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({
      status: 500,
      message: "Server error, please try again later",
    });
  }
};