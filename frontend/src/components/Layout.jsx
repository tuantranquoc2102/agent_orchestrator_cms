import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <nav>
          <Link to="/dashboard" className="mr-4">Dashboard</Link>
          <button onClick={logout} className="bg-red-500 p-2">Logout</button>
        </nav>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;