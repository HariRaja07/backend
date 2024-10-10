const models = require('../models/AuditPageModels');

// AuditBanner Controller
const createAuditBanner = async (req, res) => {
    try {
        const auditBanner = new models.AuditBanner({ image: req.file.path });
        await auditBanner.save();
        res.send(auditBanner);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create AuditBanner' });
    }
};

const getAuditBanners = async (req, res) => {
    try {
        const auditBanners = await models.AuditBanner.find();
        res.send(auditBanners);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch AuditBanners' });
    }
};

const deleteAuditBanner = async (req, res) => {
    const { id } = req.params;
    await models.AuditBanner.findByIdAndDelete(id);
    res.send({ message: 'AuditBanner deleted successfully' });
};

// AuditHero Controller
const createAuditHero = async (req, res) => {
    try {
        const auditHero = new models.AuditHero({
            title: req.body.title,
            description: req.body.description,
            image: req.file.path,
        });
        await auditHero.save();
        res.status(201).send(auditHero);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create AuditHero' });
    }
};

const getAuditHero = async (req, res) => {
    const auditHero = await models.AuditHero.findOne(); // Fetch only one auditHero document
    res.send(auditHero);
};

const updateAuditHero = async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            description: req.body.description,
        };

        // If a new file is uploaded, include the image in the update
        if (req.file) {
            updateData.image = req.file.path;
        }

        const auditHero = await models.AuditHero.findOneAndUpdate({}, updateData, { new: true });
        res.json(auditHero);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update AuditHero' });
    }
};


const deleteAuditHero = async (req, res) => {
    await models.AuditHero.deleteMany({}); // Deletes all auditHero entries, ensuring there's only one
    res.send({ message: 'AuditHero deleted successfully' });
};

const createAuditSubHeading = async (req, res) => {
    const auditSubHeading = new models.AuditSubHeading(req.body);
    await auditSubHeading.save();
    res.send(auditSubHeading);
};

const getAuditSubHeading = async (req, res) => {
    const auditSubHeading = await models.AuditSubHeading.findOne(); // Fetch only one auditHero document
    res.send(auditSubHeading);
};

const updateAuditSubHeading = async (req, res) => {
    const auditSubHeading = await models.AuditSubHeading.findOneAndUpdate({}, req.body, { new: true }); // Update the existing auditHero
    res.json(auditSubHeading);
};

const deleteAuditSubHeading = async (req, res) => {
    await models.AuditSubHeading.deleteMany({}); // Deletes all auditHero entries, ensuring there's only one
    res.send({ message: 'AuditHero deleted successfully' });
};

const createAuditData = async (req, res) => {
    const auditData = new models.AuditData(req.body);
    await auditData.save();
    res.send(auditData);
};

const getAuditData = async (req, res) => {
    const auditDatas = await models.AuditData.find();
    res.send(auditDatas);
};

const updateAuditData = async (req, res) => {
    const { id } = req.params;
    const updatedAuditData = await models.AuditData.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedAuditData);
};

const deleteAuditData = async (req, res) => {
    const { id } = req.params;
    await models.AuditData.findByIdAndDelete(id);
    res.send({ message: 'AuditData deleted successfully' });
};

// Export all controllers in a single object
module.exports = {
    createAuditBanner,
    getAuditBanners,
    deleteAuditBanner,
    createAuditHero,
    getAuditHero,
    updateAuditHero,
    deleteAuditHero,
    createAuditData,
    getAuditData,
    updateAuditData,
    deleteAuditData,
    createAuditSubHeading,
    getAuditSubHeading,
    updateAuditSubHeading,
    deleteAuditSubHeading,
};
