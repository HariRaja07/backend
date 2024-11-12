const models = require('../models/ContactPageModels');


const createContactDet = async (req, res) => {
  const contactDet = new models.ContactDet(req.body);
  await contactDet.save();
  res.send(contactDet);
};

const getContactDet = async (req, res) => {
  const contactDet = await models.ContactDet.findOne(); // Fetch only one hero document
  res.send(contactDet);
};

const updateContactDet = async (req, res) => {
  const contactDet = await models.ContactDet.findOneAndUpdate({}, req.body, { new: true }); // Update the existing hero
  res.json(contactDet);
};

const deleteContactDet = async (req, res) => {
  await models.ContactDet.deleteMany({}); // Deletes all hero entries, ensuring there's only one
  res.send({ message: 'Contact Details deleted successfully' });
};


const createContact = async (req, res) => {
    const contact = new models.Contact(req.body);
    await contact.save();
    res.send(contact);
};

const getContact = async (req, res) => {
    try {
        const contacts = await models.Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).send('Error fetching contacts');
    }
};

const deleteContact = async (req, res) => {
    try {
      const { id } = req.params;
      await models.Contact.findByIdAndDelete(id);
      res.status(200).send('Contact deleted successfully');
    } catch (err) {
      res.status(500).send('Error deleting contact');
    }
  };

  module.exports = {
    createContact,
    getContact,
    deleteContact,
    createContactDet,
    getContactDet,
    updateContactDet,
    deleteContactDet,
};