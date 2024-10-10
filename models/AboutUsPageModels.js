const mongoose = require('mongoose');

// About Us Model
const aboutUsSchema = new mongoose.Schema({
    Heading: String,
    description: String,
    format: { type: String, enum: ['paragraph', 'points'], default: 'paragraph' }, // New field to indicate format
});

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

// Export all models in a single object
module.exports = { AboutUs };
