const express = require('express');

module.exports = (controllers) => {
    const router = express.Router();

    router.post('/team-members', controllers.createTeam);
    router.get('/team-members', controllers.getTeam);
    router.put('/team-members/:id', controllers.updateTeam);
    router.delete('/team-members/:id', controllers.deleteTeam);

    return router;
};
