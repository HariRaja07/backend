const mongoose = require('mongoose');

const serviceHeroSchema = new mongoose.Schema({
    title: String,
    description: String,
});
const ServiceHero = mongoose.model('ServiceHero', serviceHeroSchema);

module.exports = { ServiceHero };