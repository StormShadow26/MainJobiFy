const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true, // Made email required, as it is required in the InterestedJobSchema
    trim: true,
  },
  location: {
    type: String,
    required: false,
    trim: true,
  },
  salary: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  workType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"],
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  requirements: {
    type: [String], // Array of strings for listing job requirements
    required: false,
  },
  interestedCandidateEmails: {
    type: [String],
    required: true,
    default: [],
  },
  interestedCandidateNames: {
    type: [String],
    required: true,
    default: [],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", jobSchema);