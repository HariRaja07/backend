const models = require('../models/TeamPageModels');

// AboutUs Controller
const createTeam = async (req, res) => {
    const team = new models.TeamMember(req.body);
    await team.save();
    res.send(team);
};

const getTeam = async (req, res) => {
    const team = await models.TeamMember.find();
    res.send(team);
};

const updateTeam = async (req, res) => {
    const { id } = req.params;
    const updatedTeam = await models.TeamMember.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedTeam);
};

const deleteTeam = async (req, res) => {
    const { id } = req.params;
    await models.TeamMember.findByIdAndDelete(id);
    res.send({ message: 'Team Member deleted successfully' });
};

// Export all controllers in a single object
module.exports = {
    createTeam,
    getTeam,
    updateTeam,
    deleteTeam,
};
