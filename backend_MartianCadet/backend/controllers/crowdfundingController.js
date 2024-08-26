// backend/controllers/crowdfundingController.js
const { exec } = require('child_process');
const ipfsService = require('../services/ipfsService');

exports.createCampaign = async (req, res) => {
  const { creator, goal } = req.body;
  try {
    // Upload campaign data to IPFS
    const ipfsHash = await ipfsService.uploadToIPFS({ creator, goal });
    exec(`soroban-cli invoke --contract CrowdfundContract --method create_campaign --args ${creator} ${goal} ${ipfsHash}`, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (stderr) {
        return res.status(500).json({ error: stderr });
      }
      res.status(201).json({ message: 'Campaign Created', output: stdout });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.contributeToCampaign = (req, res) => {
  const { campaignId, contributor, amount } = req.body;
  exec(`soroban-cli invoke --contract CrowdfundContract --method contribute --args ${campaignId} ${contributor} ${amount}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      return res.status(500).json({ error: stderr });
    }
    res.status(201).json({ message: 'Contribution Received', output: stdout });
  });
};

exports.withdrawFunds = (req, res) => {
  const { campaignId, creator } = req.body;
  exec(`soroban-cli invoke --contract CrowdfundContract --method withdraw --args ${campaignId} ${creator}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      return res.status(500).json({ error: stderr });
    }
    res.status(201).json({ message: 'Funds Withdrawn', output: stdout });
  });
};
