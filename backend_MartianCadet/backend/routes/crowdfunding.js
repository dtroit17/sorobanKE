// backend/routes/crowdfunding.js
const express = require('express');
const router = express.Router();
const crowdfundingController = require('../controllers/crowdfundingController');

router.post('/create', crowdfundingController.createCampaign);
router.post('/contribute', crowdfundingController.contributeToCampaign);
router.post('/withdraw', crowdfundingController.withdrawFunds);

module.exports = router;
