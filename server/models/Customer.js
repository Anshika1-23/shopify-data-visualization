// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  created_at: { type: Date, required: true },
  default_address: {
    city: { type: String, required: true },
  },
  // Add other fields as needed
});

module.exports = mongoose.model('Customer', customerSchema);
