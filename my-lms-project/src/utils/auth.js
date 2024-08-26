// This files handles the authentication logic, including login, logout, and token management.

import axios from 'axios';

const authApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});

export const login = async (email, password) => {
  try {
    const response = await authApi.post('/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setAuthHeader = () => {
  const token = getToken();
  if (token) {
    authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete authApi.defaults.headers.common['Authorization'];
  }
};

export default authApi;
