
import React, { createContext, useState, useEffect } from 'react';
import connectIPFS from '../config/database';

export const IPFSContext = createContext();

export const IPFSProvider = ({ children }) => {
  const [ipfs, setIpfs] = useState(null);

  useEffect(() => {
    const initIPFS = async () => {
      const ipfsInstance = await connectIPFS();
      setIpfs(ipfsInstance);
    };
    initIPFS();
  }, []);

  return (
    <IPFSContext.Provider value={{ ipfs }}>
      {children}
    </IPFSContext.Provider>
  );
};
