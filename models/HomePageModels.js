const mongoose = require('mongoose');

// Banner Model
const bannerSchema = new mongoose.Schema({
    image: String,
});
const Banner = mongoose.model('Banner', bannerSchema);

// Solution Model
const solutionSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
});
const Solution = mongoose.model('Solution', solutionSchema);

// Service Model
const serviceSchema = new mongoose.Schema({
    name: String,
});
const Service = mongoose.model('Service', serviceSchema);

// Testimonial Model
const testimonialSchema = new mongoose.Schema({
    text: String,
    author: String,
    designation: String,
});
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

// Hero Model
const heroSchema = new mongoose.Schema({
    title: String,
    description: String,
});
const Hero = mongoose.model('Hero', heroSchema);

// Export all models in a single object
module.exports = { Banner, Solution, Service, Testimonial, Hero };
