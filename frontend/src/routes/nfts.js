//This route handles the logic for minting and fetching NFTs, with metadata stored on IPFS.

const express = require('express');
const connectIPFS = require('../config/database');
const NFTs = require('../collections/NFTs');

const router = express.Router();

router.get('/nfts', async (req, res) => {
  try {
    const nfts = await NFTs.find().populate('owner');
    res.json(nfts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/nfts/mint', async (req, res) => {
  try {
    const { userId, tokenId, metadata } = req.body;

    const ipfs = await connectIPFS();
    const { cid } = await ipfs.add(JSON.stringify(metadata));
    const ipfsHash = cid.toString();

    const nft = new NFTs({ owner: userId, tokenId, metadata, ipfsHash });
    await nft.save();
    res.json(nft);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
