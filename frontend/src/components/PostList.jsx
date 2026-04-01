import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="border p-4 mb-2">
          <Link to={`/posts/${post.id}`} className="text-blue-500">{post.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;