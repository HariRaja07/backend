const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const dbUri = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  }
});

const upload = multer({ storage });

//const mongoDBUri = 'mongodb+srv://hariraja24cs:ABCdef123%23@cluster0.5ftive4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbUri)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));


// Define schemas
const contactSchema = new mongoose.Schema({
  fullName: String,
  institutionName: String,
  email: String,
  phone: String,
  service: String,
  message: String,
  file: String,
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

// Routes for contacts
app.post('/api/contact', upload.single('file'), async (req, res) => {
  const { fullName, institutionName, email, phone, service, message } = req.body;
  const filePath = req.file ? req.file.filename : null;

  const newContact = new Contact({
    fullName,
    institutionName,
    email,
    phone,
    service,
    message,
    file: filePath
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

// Routes for team members
app.get('/api/team-members', async (req, res) => {
  const members = await TeamMember.find();
  res.json(members);
});

// Updated POST route to handle file upload
app.post('/api/team-members', async (req, res) => {
  console.log(req.file);
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
  console.log("Update request for ID: ", req.params.id); // Log the ID
  console.log("Update data: ", req.body); // Log the body data

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

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
