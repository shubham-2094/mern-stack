const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    min: 10
  },
  email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('List', ListSchema);