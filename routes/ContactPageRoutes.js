const express = require('express');

module.exports = (controllers) => {
    const router = express.Router();

    router.post('/contacts', controllers.createContact);
    router.get('/contacts', controllers.getContact);
    router.delete('/contacts/:id', controllers.deleteContact);

    return router;
};
