const InterestedJob = require("../models/jobSchema");

exports.InterestedCandidates = async (req, res) => {
  try {
    const { _id, email } = req.body;

    // Validate required fields
    if (!_id || !email) {
      return res.status(400).json({
        status: 400,
        message: "Please provide all required fields: job ID and interestedEmail.",
      });
    }

    // Find the InterestedJob entry by _id
    const interestedJob = await InterestedJob.findById(_id);

    if (!interestedJob) {
      return res.status(404).json({
        status: 404,
        message: `No job found for the given ID: ${_id}.`,
      });
    }

    // Check if the email already exists in the array
    if (interestedJob.interestedCandidateEmails.includes(email)) {
      return res.status(400).json({
        status: 400,
        message: "This email has already been added to the interested candidates.",
      });
    }

    // Add the interested email to the array
    interestedJob.interestedCandidateEmails.push(email);

    // Save the updated document
    await interestedJob.save();

    // Send a successful response
    return res.status(200).json({
      status: 200,
      message: "Interested candidate email added successfully.",
      data: interestedJob,
    });
  } catch (error) {
    console.error("Error updating interested job:", error);

    // Send a response with a specific error message if available
    return res.status(500).json({
      status: 500,
      message: error.message || "An internal server error occurred.",
    });
  }
};
