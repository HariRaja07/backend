const models = require('../models/FooterModels');

const createFooterHero = async (req, res) => {
    const footerHero = new models.FooterHero(req.body);
    await footerHero.save();
    res.send(footerHero);
};

const getFooterHero = async (req, res) => {
    const footerHero = await models.FooterHero.findOne(); // Fetch only one hero document
    res.send(footerHero);
};

const updateFooterHero = async (req, res) => {
    const footerHero = await models.FooterHero.findOneAndUpdate({}, req.body, { new: true }); // Update the existing hero
    res.json(footerHero);
};

const deleteFooterHero = async (req, res) => {
    await models.FooterHero.deleteMany({}); // Deletes all hero entries, ensuring there's only one
    res.send({ message: 'Hero deleted successfully' });
};

const createContactInfo = async (req, res) => {
    const contactInfo = new models.FooterContactInfo(req.body);
    await contactInfo.save();
    res.send(contactInfo);
};

const getContactInfo = async (req, res) => {
    const contactInfo = await models.FooterContactInfo.findOne(); // Fetch only one hero document
    res.send(contactInfo);
};

const updateContactInfo = async (req, res) => {
    const contactInfo = await models.FooterContactInfo.findOneAndUpdate({}, req.body, { new: true }); // Update the existing hero
    res.json(contactInfo);
};

const deleteContactInfo = async (req, res) => {
    await models.FooterContactInfo.deleteMany({}); // Deletes all hero entries, ensuring there's only one
    res.send({ message: 'Hero deleted successfully' });
};


const createLinks = async (req, res) => {
    const links = new models.FooterLinks(req.body);
    await links.save();
    res.send(links);
};

const getLinks = async (req, res) => {
    const links = await models.FooterLinks.find();
    res.send(links);
};

const updateLinks = async (req, res) => {
    const { id } = req.params;
    const updatedLinks = await models.FooterLinks.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedLinks);
};

const deleteLinks = async (req, res) => {
    const { id } = req.params;
    await models.FooterLinks.findByIdAndDelete(id);
    res.send({ message: 'Link deleted successfully' });
};

const createSMLinks = async (req, res) => {
    const links = new models.FooterSMLinks(req.body);
    await links.save();
    res.send(links);
};

const getSMLinks = async (req, res) => {
    const links = await models.FooterSMLinks.find();
    res.send(links);
};

const updateSMLinks = async (req, res) => {
    const { id } = req.params;
    const updatedLinks = await models.FooterSMLinks.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedLinks);
};

const deleteSMLinks = async (req, res) => {
    const { id } = req.params;
    await models.FooterSMLinks.findByIdAndDelete(id);
    res.send({ message: 'Link deleted successfully' });
};
// Export all controllers in a single object
module.exports = {
    createFooterHero,
    getFooterHero,
    updateFooterHero,
    deleteFooterHero,
    createContactInfo,
    getContactInfo,
    updateContactInfo,
    deleteContactInfo,
    createLinks,
    getLinks,
    updateLinks,
    deleteLinks,
    createSMLinks,
    getSMLinks,
    updateSMLinks,
    deleteSMLinks,
};