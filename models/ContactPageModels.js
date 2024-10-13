const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: String,
  institutionName: String,
  email: String,
  phone: String,
  service: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = { Contact };