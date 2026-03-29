import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [postData, setPostData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/posts', postData);
      navigate('/posts');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Create Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required className="border p-2 mb-4 w-full" />
        <textarea name="content" placeholder="Content" onChange={handleChange} required className="border p-2 mb-4 w-full" />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;