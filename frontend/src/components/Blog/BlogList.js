import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogPost from './BlogPost';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/blog-posts').then(response => setPosts(response.data));
  }, []);

  return (
    <div>
      {posts.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;