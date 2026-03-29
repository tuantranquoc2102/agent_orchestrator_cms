import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl">{post.title}</h2>
      <Link to={`/posts/${post.id}`} className="text-blue-500">Read more</Link>
    </div>
  );
};

export default PostCard;