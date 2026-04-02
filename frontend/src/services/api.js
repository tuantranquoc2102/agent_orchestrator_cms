import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (data) => {
  return await api.post('/auth/register', data);
};

export const login = async (data) => {
  return await api.post('/auth/login', data);
};

export const logout = async () => {
  return await api.post('/auth/logout');
};

export const fetchProducts = async () => {
  return await api.get('/products');
};

export const fetchProductById = async (id) => {
  return await api.get(`/products/${id}`);
};

export const createOrder = async (data) => {
  return await api.post('/orders', data);
};

export const fetchOrders = async () => {
  return await api.get('/orders');
};