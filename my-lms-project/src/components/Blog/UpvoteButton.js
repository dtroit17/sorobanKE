import React from 'react';
import axios from 'axios';

const UpvoteButton = ({ postId }) => {
  const handleUpvote = async () => {
    await axios.post(`/api/blog-posts/${postId}/upvote`);
  };

  return <button onClick={handleUpvote}>Upvote</button>;
};

export default UpvoteButton;