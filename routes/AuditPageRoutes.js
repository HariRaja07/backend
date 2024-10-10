const express = require('express');

module.exports = (controllers) => {
    const router = express.Router();

    // AuditBanner routes
    router.get('/auditBanner', controllers.getAuditBanners);
    router.delete('/auditBanner/:id', controllers.deleteAuditBanner);

    // AuditHero routes
    
    router.get('/auditHero', controllers.getAuditHero);
    router.delete('/auditHero', controllers.deleteAuditHero);

    router.post('/auditDatas', controllers.createAuditData);
    router.get('/auditDatas', controllers.getAuditData);
    router.put('/auditDatas/:id', controllers.updateAuditData);
    router.delete('/auditDatas/:id', controllers.deleteAuditData);

    router.post('/auditSubHeading', controllers.createAuditSubHeading);
    router.get('/auditSubHeading', controllers.getAuditSubHeading);
    router.put('/auditSubHeading/', controllers.updateAuditSubHeading);
    router.delete('/auditSubHeading/', controllers.deleteAuditSubHeading);

    return router;
};
