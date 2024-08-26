// This hook handles the logic for upvoting a blog post and storing the upvote count on IPFS

import { useState } from 'react';
import axios from 'axios';
import connectIPFS from '../config/database';

const useUpvote = (postId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const upvote = async () => {
    setLoading(true);
    setError(null);

    try {
      const ipfs = await connectIPFS();
      const { data: post } = await axios.get(`/api/blog-posts/${postId}`);
      const updatedUpvotes = post.upvotes + 1;

      const { cid } = await ipfs.add(JSON.stringify({ upvotes: updatedUpvotes }));
      const ipfsHash = cid.toString();

      await axios.post(`/api/blog-posts/${postId}/upvote`, { ipfsHash });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { upvote, loading, error };
};

export default useUpvote;
