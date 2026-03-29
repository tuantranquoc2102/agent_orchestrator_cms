import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { logout, user } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex justify-between">
          <Link to="/" className="text-lg">Home</Link>
          {user ? (
            <button onClick={logout} className="bg-red-500 p-2">Logout</button>
          ) : (
            <Link to="/login" className="bg-blue-500 p-2">Login</Link>
          )}
        </nav>
      </header>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;