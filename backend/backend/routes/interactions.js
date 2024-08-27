// backend/routes/interactions.js
const express = require('express');
const router = express.Router();
const interactionsController = require('../controllers/interactionsController');

router.post('/', interactionsController.recordInteraction);

module.exports = router;
