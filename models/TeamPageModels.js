const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: String,
  salutation: String,
  designation: String,
  degrees: String,
  mobile: String,
  email: String,
  address: String,
  website: String,
  image: String,
});

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = { TeamMember };
