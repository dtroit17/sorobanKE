const connectIPFS = require('../config/database');

const BlogPosts = {
  slug: 'blog-posts',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'content', type: 'richText', required: true },
    { name: 'ipfsHash', type: 'text' },
    { name: 'upvotes', type: 'number', defaultValue: 0 },
    { name: 'downvotes', type: 'number', defaultValue: 0 },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        const ipfs = await connectIPFS();
        const { cid } = await ipfs.add(data.content);
        data.ipfsHash = cid.toString();
      },
    ],
  },
};

module.exports = BlogPosts;
