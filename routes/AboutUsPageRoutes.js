const express = require('express');

module.exports = (controllers) => {
    const router = express.Router();

    // AboutUs routes
    router.post('/aboutDatas', controllers.createAboutUs);
    router.get('/aboutDatas', controllers.getAboutUs);
    router.put('/aboutDatas/:id', controllers.updateAboutUs);
    router.delete('/aboutDatas/:id', controllers.deleteAboutUs);

    return router;
};
