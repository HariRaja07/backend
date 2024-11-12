const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const controllers = require("./controllers/HomePageControllers");
const AboutUsControllers = require("./controllers/AboutUsPageControllers");
const AuditControllers = require("./controllers/AuditPageControllers");
const LayoutControllers = require("./controllers/LayoutPageControllers");
const ContactControllers = require("./controllers/ContactPageControllers");
const TeamControllers = require("./controllers/TeamPageControllers");
const NewsControllers = require("./controllers/NewsPageControllers");
const ServiceControllers = require('./controllers/ServicePageControllers');
const FooterControllers = require('./controllers/FooterControllers');

const routes = require("./routes/HomePageRoutes")(controllers);
const AboutUsRoutes = require("./routes/AboutUsPageRoutes")(AboutUsControllers);
const AuditRoutes = require("./routes/AuditPageRoutes")(AuditControllers);
const LayoutRoutes = require("./routes/LayoutPageRoutes")(LayoutControllers);
const ContactRoutes = require("./routes/ContactPageRoutes")(ContactControllers);
const TeamRoutes = require("./routes/TeamPageRoutes")(TeamControllers);
const NewsRoutes = require("./routes/NewsPageRoutes")(NewsControllers);
const ServiceRoutes = require('./routes/ServicePageRoutes')(ServiceControllers);
const FooterRoutes = require('./routes/FooterRoutes')(FooterControllers);

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes

app.use("/api", routes);
app.use("/api", AboutUsRoutes);
app.use("/api", AuditRoutes);
app.use("/api", LayoutRoutes);
app.use("/api", ContactRoutes);
app.use("/api", TeamRoutes);
app.use("/api", NewsRoutes);
app.use('/api', ServiceRoutes);
app.use('/api', FooterRoutes);


const dataArraySchema = new mongoose.Schema({
  title1: String,
  description1: String,
  innerArray: [{ title2: String, description2: String }],
  benefits: {  // New field for benefits
    type: Map,
    of: [String]  // Each key in the map will hold an array of strings
  }
});

const DataArray = mongoose.model('DataArray', dataArraySchema);


// POST route for adding dataArray
app.post('/api/dataArray', async (req, res) => {
  try {
    const newData = new DataArray(req.body);
    await newData.save();
    res.status(201).send('DataArray saved successfully');
  } catch (error) {
    res.status(400).send('Error saving DataArray: ' + error.message);
  }
});

// GET route for fetching dataArray
app.get('/api/dataArray', async (req, res) => {
  try {
    const dataArrays = await DataArray.find();
    res.json(dataArrays);
  } catch (error) {
    res.status(400).send('Error fetching DataArray: ' + error.message);
  }
});

app.put('/api/dataArray/:id', async (req, res) => {
  try {
    const updatedData = await DataArray.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedData);
  } catch (error) {
    res.status(400).send('Error updating DataArray: ' + error.message);
  }
});

// DELETE route for deleting dataArray
app.delete('/api/dataArray/:id', async (req, res) => {
  try {
    await DataArray.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(400).send('Error deleting DataArray: ' + error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
