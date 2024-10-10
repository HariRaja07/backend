const models = require('../models/AboutUsPageModels');

// AboutUs Controller
const createAboutUs = async (req, res) => {
    const aboutUs = new models.AboutUs(req.body);
    await aboutUs.save();
    res.send(aboutUs);
};

const getAboutUs = async (req, res) => {
    const aboutUss = await models.AboutUs.find();
    res.send(aboutUss);
};

const updateAboutUs = async (req, res) => {
    const { id } = req.params;
    const updatedAboutUs = await models.AboutUs.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedAboutUs);
};

const deleteAboutUs = async (req, res) => {
    const { id } = req.params;
    await models.AboutUs.findByIdAndDelete(id);
    res.send({ message: 'AboutUs deleted successfully' });
};

// Export all controllers in a single object
module.exports = {
    createAboutUs,
    getAboutUs,
    updateAboutUs,
    deleteAboutUs,
};
