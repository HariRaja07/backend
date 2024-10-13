const models = require('../models/LayoutPageModels');
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

const createLogo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const result = await uploadImage(req);

        const logo = new models.Logo({
            image: result.secure_url,
        });

        const savedLogo = await logo.save();
        res.status(201).json(savedLogo);
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: err.message });
    }
};

const getLogo = async (req, res) => {
    const logo = await models.Logo.findOne();
    res.send(logo);
};

const deleteLogo = async (req, res) => {
    const logo = await models.Logo.findOne();

        if (!logo) {
            return res.status(404).send({ message: 'Logo not found' });
        }

        // Extract the public_id from the image URL
        const public_id = logo.image.split('/').pop().split('.')[0]; // Adjust this based on your URL format

        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(public_id);


    await models.Logo.deleteMany({});
    res.send({ message: 'Logo deleted successfully' });
};

const updateLogo =  async (req, res) => {
    const { id } = req.params;
    try {
        let imageUrl;
        if (req.file) {
            const result = await uploadImage(req); // Upload the new image
            imageUrl = result.secure_url; // Get the new image URL
        }
        const updateData = {
            ...(imageUrl && { image: imageUrl })
        }; 
        
        const logo = await models.Logo.findOneAndUpdate({}, updateData, { new: true });
        if (!logo) {
            return res.status(404).send({ error: 'Logo not found' });
        }
        res.send(logo);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update Logo' });
    }
};

module.exports = {
    createLogo,
    getLogo,
    deleteLogo,
    updateLogo,
    upload,
};