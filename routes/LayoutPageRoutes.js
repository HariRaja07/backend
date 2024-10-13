const express = require('express');

module.exports = (controllers) => {
    const router = express.Router();

    router.post('/logo', controllers.upload.single("image"), controllers.createLogo);
    router.put('/logo', controllers.upload.single("image"), controllers.updateLogo);
    router.get('/logo', controllers.getLogo);
    router.delete('/logo', controllers.deleteLogo);

    return router;

};