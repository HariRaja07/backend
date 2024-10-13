const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
    image: String,
});
const Logo = mongoose.model('Logo', logoSchema);

module.exports = { Logo };