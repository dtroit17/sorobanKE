import React from 'react';
import axios from 'axios';

const MintNFT = ({ userId, tokenId, metadata }) => {
  const handleMint = async () => {
    const ipfsResponse = await axios.post('https://ipfs.infura.io:5001/api/v0/add', metadata);
    const ipfsHash = ipfsResponse.data.Hash;
    await axios.post('/api/nfts/mint', { userId, tokenId, ipfsHash });
  };

  return <button onClick={handleMint}>Mint NFT</button>;
};

export default MintNFT;
