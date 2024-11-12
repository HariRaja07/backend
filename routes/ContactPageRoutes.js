const express = require('express');

module.exports = (controllers) => {
    const router = express.Router();

    router.post('/contactDet', controllers.createContactDet);
    router.get('/contactDet', controllers.getContactDet);
    router.put('/contactDet', controllers.updateContactDet);
    router.delete('/contactDet', controllers.deleteContactDet);

    router.post('/contacts', controllers.createContact);
    router.get('/contacts', controllers.getContact);
    router.delete('/contacts/:id', controllers.deleteContact);

    return router;
};
