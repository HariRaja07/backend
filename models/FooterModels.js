const mongoose = require('mongoose');

const footerHeroSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const footerContactInfoSchema = new mongoose.Schema({
    address: String,
    email: String,
    phno: String,
});

const footerLinksSchema = new mongoose.Schema({
    name: String,
    linkAddress: String,
});

const footerSMLinksSchema = new mongoose.Schema({
    platformName: String,
    linkAddress: String,
});

const FooterLinks = mongoose.model('FooterLinks', footerLinksSchema);
const FooterSMLinks = mongoose.model('FooterSMLinks', footerSMLinksSchema);
const FooterHero = mongoose.model('FooterHero', footerHeroSchema);
const FooterContactInfo = mongoose.model('FooterContactInfo', footerContactInfoSchema);

module.exports = { FooterHero, FooterContactInfo, FooterLinks, FooterSMLinks };