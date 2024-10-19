const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    description: "The full name of the user",
  },
  contact: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
    description: "The contact number of the user (must be 10 digits)",
  },
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
    description: "The email address of the user (must be a valid email address)",
  },
  walletAddress: {
    type: String,
    required: true,
    match: /^(0x)?[0-9a-fA-F]{40}$/,
    description: "The wallet address of the user (must be a valid Ethereum wallet address)",
  },
  paymentCurrency: {
    type: String,
    required: true,
    enum: ["ETH", "BTC", "USDT", "BNB", "SOL"],
    default: "ETH",
    description: "The preferred payment currency of the user",
  },
  skills: {
    type: String,
    required: true,
    enum: [
      "Writing & Content Creation",
      "Design & Multimedia",
      "Web Development",
      "Mobile App Development",
      "Software & Game Development",
      "Digital Marketing",
      "Virtual Assistance & Admin Support",
      "Sales & Business Development",
      "Finance & Accounting",
      "Human Resources & Recruitment",
      "Language Services",
      "IT & Networking",
      "Consulting",
      "Engineering & Architecture",
      "Education & Tutoring",
      "Legal Services",
      "Data Science & Analytics",
      "Audio & Music",
      "Real Estate",
      "Customer Support",
      "Health & Fitness",
    ],
  },
  availability: {
    type: String,
    required: true,
    enum: ["Part-time", "Full-time"],
    maxLength: 50,
    description: "The availability of the user for work (e.g., part-time or full-time)",
  },
  dob: {
    type: Date,
    required: true,
    description: "The date of birth of the user in YYYY-MM-DD format",
  },
  pan: {
    type: String,
    required: true,
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    description: "The PAN (Permanent Account Number) of the user (must be a valid PAN number)",
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    description: "The password for user authentication (minimum 8 characters)",
  },
  jobsInterested: {
    type: Array,
    default: [],
    description: "A list of jobs the user is interested in, starting as an empty array",
  },
  reviews: [
    {
      reviewerName: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        description: "Rating given to the user (between 1 and 5)",
      },
      comment: {
        type: String,
        required: true,
      },
      reviewDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
