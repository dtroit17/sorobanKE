//This file handles the API requests to the backend and IPFS.

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});

export const fetchFromIPFS = async (ipfsHash) => {
  try {
    const response = await axios.get(`https://ipfs.io/ipfs/${ipfsHash}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    throw error;
  }
};

export const addToIPFS = async (data) => {
  try {
    const response = await axios.post('https://ipfs.infura.io:5001/api/v0/add', data);
    return response.data.Hash;
  } catch (error) {
    console.error('Error adding to IPFS:', error);
    throw error;
  }
};

export default api;
