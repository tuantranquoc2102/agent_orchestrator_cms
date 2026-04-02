import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 text-white p-4">
        <nav>
          <Link to="/products" className="mr-4">Products</Link>
          <Link to="/orders" className="mr-4">Orders</Link>
          <button onClick={handleLogout} className="bg-red-500 p-2">Logout</button>
        </nav>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;