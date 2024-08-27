import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpvoteButton from './UpvoteButton';

const BlogPost = ({ post }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const response = await axios.get(`https://ipfs.io/ipfs/${post.ipfsHash}`);
      setContent(response.data);
    };
    fetchContent();
  }, [post.ipfsHash]);

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <UpvoteButton postId={post.id} />
      <p>Upvotes: {post.upvotes}</p>
      <p>Downvotes: {post.downvotes}</p>
    </div>
  );
};

export default BlogPost;
