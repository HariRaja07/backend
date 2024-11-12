const express = require('express');

module.exports = (controllers) => {
    const router = express.Router();

    router.post('/footerHero', controllers.createFooterHero);
    router.get('/footerHero', controllers.getFooterHero);
    router.put('/footerHero', controllers.updateFooterHero);
    router.delete('/footerHero', controllers.deleteFooterHero);

    router.post('/contactInfo', controllers.createContactInfo);
    router.get('/contactInfo', controllers.getContactInfo);
    router.put('/contactInfo', controllers.updateContactInfo);
    router.delete('/contactInfo', controllers.deleteContactInfo);

    router.post('/links', controllers.createLinks);
    router.get('/links', controllers.getLinks);
    router.put('/links/:id', controllers.updateLinks);
    router.delete('/links/:id', controllers.deleteLinks);

    router.post('/smlinks', controllers.createSMLinks);
    router.get('/smlinks', controllers.getSMLinks);
    router.put('/smlinks/:id', controllers.updateSMLinks);
    router.delete('/smlinks/:id', controllers.deleteSMLinks);

    return router;
};