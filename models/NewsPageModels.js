const mongoose = require('mongoose');

// About Us Model
const NewsSchema = new mongoose.Schema({
    Heading: String,
    description: String,
    format: { type: String, enum: ['paragraph', 'points'], default: 'paragraph' }, // New field to indicate format
},{ timestamps: true });

const News = mongoose.model('News', NewsSchema);

// Export all models in a single object
module.exports = { News };
