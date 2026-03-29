import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="mb-4 text-xl">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="border p-2 mb-4 w-full" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border p-2 mb-4 w-full" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="border p-2 mb-4 w-full" />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;