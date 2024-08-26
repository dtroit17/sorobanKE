
// backend/models/interaction.js
const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  user: { type: String, required: true },
  interactionType: { type: String, required: true },
});

module.exports = mongoose.model('Interaction', interactionSchema);
