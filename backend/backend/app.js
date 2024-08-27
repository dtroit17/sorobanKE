
// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const interactionsRoutes = require('./routes/interactions');
const crowdfundingRoutes = require('./routes/crowdfunding');
const ipfsService = require('./services/ipfsService');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/space-exploration', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to upload data to IPFS
app.use(async (req, res, next) => {
  if (req.method === 'POST' && (req.path.includes('/interactions') || req.path.includes('/crowdfunding'))) {
    try {
      const ipfsHash = await ipfsService.uploadToIPFS(req.body);
      req.body.ipfsHash = ipfsHash;
    } catch (error) {
      return res.status(500).json({ error: 'IPFS upload failed' });
    }
  }
  next();
});

app.use('/api/interactions', interactionsRoutes);
app.use('/api/crowdfunding', crowdfundingRoutes);

module.exports = app;
