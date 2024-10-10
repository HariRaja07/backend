const mongoose = require('mongoose');

// AuditBanner Model
const auditBannerSchema = new mongoose.Schema({
    image: String,
});
const AuditBanner = mongoose.model('AuditBanner', auditBannerSchema);

// AuditHero Model
const auditHeroSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
});
const AuditHero = mongoose.model('AuditHero', auditHeroSchema);

const auditSubHeadingSchema = new mongoose.Schema({
    title: String,
});
const AuditSubHeading = mongoose.model('AuditSubHeading', auditSubHeadingSchema);

const auditDataSchema = new mongoose.Schema({
    Heading: String,
    description: String,
    format: { type: String, enum: ['paragraph', 'points'], default: 'paragraph' }, // New field to indicate format
});

const AuditData = mongoose.model('AuditData', auditDataSchema);

// Export all models in a single object
module.exports = { AuditBanner, AuditHero, AuditData, AuditSubHeading };
