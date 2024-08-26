const connectIPFS = require('../config/database');

const Crowdfunding = {
  slug: 'crowdfunding',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'richText', required: true },
    { name: 'ipfsHash', type: 'text' },
    { name: 'goal', type: 'number', required: true },
    { name: 'raised', type: 'number', defaultValue: 0 },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        const ipfs = await connectIPFS();
        const { cid } = await ipfs.add(data.description);
        data.ipfsHash = cid.toString();
      },
    ],
  },
};

module.exports = Crowdfunding;
