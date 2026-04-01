import React, { useState } from 'react';
import api from '../services/api';

const PostForm = ({ onPostCreated }) => {
  const [postData, setPostData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/posts', postData);
      onPostCreated(response.data);
      setPostData({ title: '', content: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={postData.title}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border"
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={postData.content}
        onChange={handleChange}
        className="block w-full mb-4 p-2 border"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2">Create Post</button>
    </form>
  );
};

export default PostForm;