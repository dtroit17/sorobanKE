const connectIPFS = require('../config/database');

const NFTs = {
  slug: 'nfts',
  fields: [
    { name: 'owner', type: 'relationship', relationTo: 'users', required: true },
    { name: 'tokenId', type: 'number', required: true },
    { name: 'metadata', type: 'json', required: true },
    { name: 'ipfsHash', type: 'text' },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        const ipfs = await connectIPFS();
        const { cid } = await ipfs.add(JSON.stringify(data.metadata));
        data.ipfsHash = cid.toString();
      },
    ],
  },
};

module.exports = NFTs;
