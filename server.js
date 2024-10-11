const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // Ensure you have a .env file for environment variables

// Connect to MongoDB
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/educationalConsultant'; // Fallback URI
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve static files

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the folder to save files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid name conflicts
    }
});

const upload = multer({ storage });

const models = require('./models/HomePageModels');
const controllers = require('./controllers/HomePageControllers');
const routes = require('./routes/HomePageRoutes')(controllers);

const AboutUsModels = require('./models/AboutUsPageModels');
const AboutUsControllers = require('./controllers/AboutUsPageControllers');
const AboutUsRoutes = require('./routes/AboutUsPageRoutes')(AboutUsControllers);

const AuditModels = require('./models/AuditPageModels');
const AuditControllers = require('./controllers/AuditPageControllers');
const AuditRoutes = require('./routes/AuditPageRoutes')(AuditControllers);

// Use routes with file upload middleware
app.use('/api', routes);
app.use('/api', AboutUsRoutes);
app.use('/api', AuditRoutes);

routes.post('/banner', upload.single("image"), controllers.createBanner);
routes.post('/solutions',upload.single("image"), controllers.createSolution);
routes.put('/solutions/:id',upload.single("image"), controllers.updateSolution);
AuditRoutes.post('/auditBanner',upload.single("image"), AuditControllers.createAuditBanner);
AuditRoutes.post('/auditHero',upload.single("image"), AuditControllers.createAuditHero);
AuditRoutes.put('/auditHero',upload.single("image"), AuditControllers.updateAuditHero);

// Define schemas
const contactSchema = new mongoose.Schema({
    fullName: String,
    institutionName: String,
    email: String,
    phone: String,
    service: String,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

const teamMemberSchema = new mongoose.Schema({
    name: String,
    salutation: String,
    designation: String,
    degrees: String,
    mobile: String,
    email: String,
    address: String,
    website: String,
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

const logoSchema = new mongoose.Schema({
    image: String,
});
const Logo = mongoose.model('Logo', logoSchema);

app.get('/api/Logo', async (req, res) => {
    try {
        const logo = await Logo.findOne();
        res.send(logo);
    } catch (error) {
        res.status(500).send('Error fetching logo');
    }
});

app.post('/api/logo', upload.single("image"), async (req, res) => {
    try {
        const logo = new Logo({ image: req.file.path });
        await logo.save();
        res.send(logo);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create Logo' });
    }
});

app.delete('/api/logo', async (req, res) => {
    await Logo.deleteMany({}); // Deletes all auditHero entries, ensuring there's only one
    res.send({ message: 'Logo deleted successfully' });
});

app.put('/api/logo', upload.single("image"), async (req, res) => {
    try {
        const updateData = {}; 
        // If a new file is uploaded, include the image in the update
        if (req.file) {
            updateData.image = req.file.path;
        }
        const logo = await Logo.findOneAndUpdate({}, updateData, { new: true });
        if (!logo) {
            return res.status(404).send({ error: 'Logo not found' });
        }
        res.send(logo);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update Logo' });
    }
});

// Routes for contacts
app.post('/api/contact', async (req, res) => {
    const { fullName, institutionName, email, phone, service, message } = req.body;

    const newContact = new Contact({
        fullName,
        institutionName,
        email,
        phone,
        service,
        message,
    });

    try {
        await newContact.save();
        res.status(200).send('Contact saved successfully');
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).send('Error fetching contacts');
    }
});

app.delete('/api/contacts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Contact.findByIdAndDelete(id);
      res.status(200).send('Contact deleted successfully');
    } catch (err) {
      res.status(500).send('Error deleting contact');
    }
  });

// Routes for team members
app.get('/api/team-members', async (req, res) => {
    const members = await TeamMember.find();
    res.json(members);
});

app.post('/api/team-members', async (req, res) => {
    const memberData = req.body; // Get member data from the request body

    const newMember = new TeamMember({
        ...memberData, // Use spread operator to include all properties from memberData
    });

    try {
        await newMember.save();
        res.status(201).send(newMember);
    } catch (error) {
        res.status(400).send(error);
    }
});

// PUT route for team members
app.put('/api/team-members/:id', async (req, res) => {
    try {
        const updateData = { ...req.body };
        const member = await TeamMember.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!member) {
            return res.status(404).send("Member not found");
        }
        res.send(member);
    } catch (error) {
        res.status(400).send("Error updating member: " + error.message);
    }
});

// Delete route for team members
app.delete('/api/team-members/:id', async (req, res) => {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
