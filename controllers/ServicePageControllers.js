const models = require('../models/ServicePageModels');

const createServiceHero = async (req, res) => {
    const serviceHero = new models.ServiceHero(req.body);
    await serviceHero.save();
    res.send(serviceHero);
};

const getServiceHero = async (req, res) => {
    const serviceHero = await models.ServiceHero.findOne(); // Fetch only one hero document
    res.send(serviceHero);
};

const updateServiceHero = async (req, res) => {
    const serviceHero = await models.ServiceHero.findOneAndUpdate({}, req.body, { new: true }); // Update the existing hero
    res.json(serviceHero);
};

const deleteServiceHero = async (req, res) => {
    await models.ServiceHero.deleteMany({}); // Deletes all hero entries, ensuring there's only one
    res.send({ message: 'Hero deleted successfully' });
};

// Export all controllers in a single object
module.exports = {
    createServiceHero,
    getServiceHero,
    updateServiceHero,
    deleteServiceHero,
};