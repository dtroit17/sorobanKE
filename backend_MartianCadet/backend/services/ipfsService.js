
// backend/services/ipfsService.js
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

exports.uploadToIPFS = async (data) => {
  try {
    const { path } = await ipfs.add(JSON.stringify(data));
    return path;
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw error;
  }
};
