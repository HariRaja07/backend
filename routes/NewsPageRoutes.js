const express = require('express');

module.exports = (controllers) => {
    const router = express.Router();

    // News routes
    router.post('/news', controllers.createNews);
    router.get('/news', controllers.getNews);
    router.put('/news/:id', controllers.updateNews);
    router.delete('/news/:id', controllers.deleteNews);
    return router;
};
