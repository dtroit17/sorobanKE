const connectIPFS = require('../config/database');

const Courses = {
  slug: 'courses',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'richText', required: true },
    { name: 'ipfsHash', type: 'text' },
    { name: 'completed', type: 'boolean', defaultValue: false },
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

module.exports = Courses;
