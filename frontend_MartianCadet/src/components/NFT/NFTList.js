import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NFTList = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    axios.get('/api/nfts').then(response => setNfts(response.data));
  }, []);

  return (
    <div>
      {nfts.map(nft => (
        <div key={nft.tokenId}>
          <h2>NFT #{nft.tokenId}</h2>
          <p>Owner: {nft.owner.username}</p>
          <p>Metadata: <a href={`https://ipfs.io/ipfs/${nft.ipfsHash}`}>View on IPFS</a></p>
        </div>
      ))}
    </div>
  );
};

export default NFTList;
