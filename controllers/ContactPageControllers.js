const models = require('../models/ContactPageModels');

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
};