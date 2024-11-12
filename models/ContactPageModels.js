const mongoose = require('mongoose');

const contactDetSchema = new mongoose.Schema({
  address: String,
  email: String,
  phno: String,
});

const contactSchema = new mongoose.Schema({
  fullName: String,
  institutionName: String,
  email: String,
  phone: String,
  service: String,
  message: String,
});

const ContactDet = mongoose.model('ContactDet', contactDetSchema);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = { Contact, ContactDet };