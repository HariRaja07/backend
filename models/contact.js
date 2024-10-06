const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  institutionName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  file: { type: String }, // Optional for file uploads
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
