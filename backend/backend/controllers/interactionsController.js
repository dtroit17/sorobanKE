// backend/controllers/interactionsController.js
const Interaction = require('../models/interaction');
const ipfsService = require('../services/ipfsService');

exports.recordInteraction = async (req, res) => {
  try {
    const { user, interactionType } = req.body;
    const interaction = new Interaction({ user, interactionType });
    await interaction.save();
    // Upload interaction data to IPFS
    const ipfsHash = await ipfsService.uploadToIPFS({ user, interactionType });
    res.status(201).json({ interaction, ipfsHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
