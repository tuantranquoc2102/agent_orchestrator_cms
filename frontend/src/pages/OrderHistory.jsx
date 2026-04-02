import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchOrders();
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Order History</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id} className="border-b py-2">
            Order ID: {order.id} - Total: ${order.total_amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;