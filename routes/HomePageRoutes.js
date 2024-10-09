const express = require('express');

module.exports = (controllers) => {
    const router = express.Router();

    // Banner routes
    router.post('/banner', controllers.createBanner);
    router.get('/banner', controllers.getBanners);
    router.delete('/banner/:id', controllers.deleteBanner);

    // Solution routes
    router.post('/solutions', controllers.createSolution);
    router.get('/solutions', controllers.getSolutions);
    router.put('/solutions/:id', controllers.updateSolution);
    router.delete('/solutions/:id', controllers.deleteSolution);

    // Service routes
    router.post('/services', controllers.createService);
    router.get('/services', controllers.getServices);
    router.put('/services/:id', controllers.updateService);
    router.delete('/services/:id', controllers.deleteService);

    // Testimonial routes
    router.post('/testimonials', controllers.createTestimonial);
    router.get('/testimonials', controllers.getTestimonials);
    router.put('/testimonials/:id', controllers.updateTestimonial);
    router.delete('/testimonials/:id', controllers.deleteTestimonial);

    // Hero routes
    router.post('/hero', controllers.createHero);
    router.get('/hero', controllers.getHero);
    router.put('/hero', controllers.updateHero);
    router.delete('/hero', controllers.deleteHero);

    return router;
};
