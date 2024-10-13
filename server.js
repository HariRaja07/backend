const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const controllers = require('./controllers/HomePageControllers');
const AboutUsControllers = require('./controllers/AboutUsPageControllers');
const AuditControllers = require('./controllers/AuditPageControllers');
const LayoutControllers = require('./controllers/LayoutPageControllers');
const ContactControllers = require('./controllers/ContactPageControllers');
const TeamControllers = require('./controllers/TeamPageControllers');

const routes = require('./routes/HomePageRoutes')(controllers);
const AboutUsRoutes = require('./routes/AboutUsPageRoutes')(AboutUsControllers);
const AuditRoutes = require('./routes/AuditPageRoutes')(AuditControllers);
const LayoutRoutes = require('./routes/LayoutPageRoutes')(LayoutControllers);
const ContactRoutes = require('./routes/ContactPageRoutes')(ContactControllers);
const TeamRoutes = require('./routes/TeamPageRoutes')(TeamControllers);

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes

app.use('/api', routes);
app.use('/api', AboutUsRoutes);
app.use('/api', AuditRoutes);
app.use('/api', LayoutRoutes);
app.use('/api', ContactRoutes);
app.use('/api', TeamRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
