const express = require('express');

module.exports = (controllers) => {
    const router = express.Router();

    router.post('/serviceHero', controllers.createServiceHero);
    router.get('/serviceHero', controllers.getServiceHero);
    router.put('/serviceHero', controllers.updateServiceHero);
    router.delete('/serviceHero', controllers.deleteServiceHero);

    return router;
};