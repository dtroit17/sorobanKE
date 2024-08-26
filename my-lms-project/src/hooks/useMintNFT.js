// This hook handles the logic for minting an NFT and storing its metadata on IPFS.

import { useState } from 'react';
import axios from 'axios';
import connectIPFS from '../config/database';

const useMintNFT = (userId, tokenId, metadata) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mintNFT = async () => {
    setLoading(true);
    setError(null);

    try {
      const ipfs = await connectIPFS();
      const { cid } = await ipfs.add(JSON.stringify(metadata));
      const ipfsHash = cid.toString();

      await axios.post('/api/nfts/mint', { userId, tokenId, ipfsHash });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { mintNFT, loading, error };
};

export default useMintNFT;
