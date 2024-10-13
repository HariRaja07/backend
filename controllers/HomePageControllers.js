const models = require('../models/HomePageModels');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (req) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto', public_id: `your_prefix/${req.file.originalname}` },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );

        stream.end(req.file.buffer);
    });
};

// Banner Controller
const createBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const result = await uploadImage(req);

        const banner = new models.Banner({
            image: result.secure_url,
        });

        const savedBanner = await banner.save();
        res.status(201).json(savedBanner);
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: err.message });
    }
};

const getBanners = async (req, res) => {
    const banners = await models.Banner.find();
    res.send(banners);
};

const deleteBanner = async (req, res) => {
    const { id } = req.params;
    const banner = await models.Banner.findById(id);

        if (!banner) {
            return res.status(404).send({ message: 'Banner not found' });
        }

        // Extract the public_id from the image URL
        const public_id = banner.image.split('/').pop().split('.')[0]; // Adjust this based on your URL format

        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(public_id);
    await models.Banner.findByIdAndDelete(id);
    res.send({ message: 'Banner deleted successfully' });
};

// Solution Controller
const createSolution = async (req, res) => {
    const result = await uploadImage(req);
    const solution = new models.Solution({
        title: req.body.title,
        description: req.body.description,
        image: result.secure_url,
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

    try {
        // If a new image is provided, upload it to Cloudinary
        let imageUrl;
        if (req.file) {
            const result = await uploadImage(req); // Upload the new image
            imageUrl = result.secure_url; // Get the new image URL
        }

        // Prepare the update object
        const updateData = {
            title: req.body.title,
            description: req.body.description,
            ...(imageUrl && { image: imageUrl }) // Only include image if it exists
        };

        // Update the solution in the database
        const updatedSolution = await models.Solution.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedSolution) {
            return res.status(404).send({ error: 'Solution not found' });
        }

        res.send(updatedSolution);
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).send({ error: err.message });
    }
};


const deleteSolution = async (req, res) => {
    const { id } = req.params;
    const solution = await models.Solution.findById(id);

        if (!solution) {
            return res.status(404).send({ message: 'Solution image not found' });
        }

        // Extract the public_id from the image URL
        const public_id = solution.image.split('/').pop().split('.')[0]; // Adjust this based on your URL format

        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(public_id);
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
    upload,
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
