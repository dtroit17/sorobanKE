// This route handles the logic for fetching and upvoting blog posts, with content stored on IPFS
const express = require('express');
const connectIPFS = require('../config/database');
const BlogPosts = require('../collections/BlogPosts');

const router = express.Router();

router.get('/blog-posts', async (req, res) => {
  try {
    const posts = await BlogPosts.find();
    const ipfs = await connectIPFS();

    const postsWithContent = await Promise.all(
      posts.map(async (post) => {
        const file = await ipfs.cat(post.ipfsHash);
        const content = new TextDecoder().decode(file);
        return { ...post, content };
      })
    );

    res.json(postsWithContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/blog-posts/:id/upvote', async (req, res) => {
  try {
    const post = await BlogPosts.findById(req.params.id);
    post.upvotes += 1;

    const ipfs = await connectIPFS();
    const { cid } = await ipfs.add(JSON.stringify({ upvotes: post.upvotes }));
    post.ipfsHash = cid.toString();

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
