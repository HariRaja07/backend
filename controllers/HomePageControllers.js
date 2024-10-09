const models = require('../models/HomePageModels');

// Banner Controller
const createBanner = async (req, res) => {
    const banner = new models.Banner({ image: req.file.path });
    await banner.save();
    res.send(banner);
};

const getBanners = async (req, res) => {
    const banners = await models.Banner.find();
    res.send(banners);
};

const deleteBanner = async (req, res) => {
    const { id } = req.params;
    await models.Banner.findByIdAndDelete(id);
    res.send({ message: 'Banner deleted successfully' });
};

// Solution Controller
const createSolution = async (req, res) => {
    const solution = new models.Solution({
        title: req.body.title,
        description: req.body.description,
        image: req.file.path,
    });
    await solution.save();
    res.send(solution);
};

const getSolutions = async (req, res) => {
    const solutions = await models.Solution.find();
    res.send(solutions);
};

const updateSolution = async (req, res) => {
    const { id } = req.params;
    const updatedSolution = await models.Solution.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedSolution);
};

const deleteSolution = async (req, res) => {
    const { id } = req.params;
    await models.Solution.findByIdAndDelete(id);
    res.send({ message: 'Solution deleted successfully' });
};

// Service Controller
const createService = async (req, res) => {
    const service = new models.Service(req.body);
    await service.save();
    res.send(service);
};

const getServices = async (req, res) => {
    const services = await models.Service.find();
    res.send(services);
};

const updateService = async (req, res) => {
    const { id } = req.params;
    const updatedService = await models.Service.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedService);
};

const deleteService = async (req, res) => {
    const { id } = req.params;
    await models.Service.findByIdAndDelete(id);
    res.send({ message: 'Service deleted successfully' });
};

// Testimonial Controller
const createTestimonial = async (req, res) => {
    const testimonial = new models.Testimonial(req.body);
    await testimonial.save();
    res.send(testimonial);
};

const getTestimonials = async (req, res) => {
    const testimonials = await models.Testimonial.find();
    res.send(testimonials);
};

const updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const updatedTestimonial = await models.Testimonial.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedTestimonial);
};

const deleteTestimonial = async (req, res) => {
    const { id } = req.params;
    await models.Testimonial.findByIdAndDelete(id);
    res.send({ message: 'Testimonial deleted successfully' });
};

// Hero Controller
const createHero = async (req, res) => {
    const hero = new models.Hero(req.body);
    await hero.save();
    res.send(hero);
};

const getHero = async (req, res) => {
    const hero = await models.Hero.findOne(); // Fetch only one hero document
    res.send(hero);
};

const updateHero = async (req, res) => {
    const hero = await models.Hero.findOneAndUpdate({}, req.body, { new: true }); // Update the existing hero
    res.json(hero);
};

const deleteHero = async (req, res) => {
    await models.Hero.deleteMany({}); // Deletes all hero entries, ensuring there's only one
    res.send({ message: 'Hero deleted successfully' });
};

// Export all controllers in a single object
module.exports = {
    createBanner,
    getBanners,
    deleteBanner,
    createSolution,
    getSolutions,
    updateSolution,
    deleteSolution,
    createService,
    getServices,
    updateService,
    deleteService,
    createTestimonial,
    getTestimonials,
    updateTestimonial,
    deleteTestimonial,
    createHero,
    getHero,
    updateHero,
    deleteHero,
};
