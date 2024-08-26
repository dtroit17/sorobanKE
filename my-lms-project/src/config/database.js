const IPFS = require('ipfs-core');

const connectIPFS = async () => {
  try {
    const ipfs = await IPFS.create();
    console.log('IPFS node is ready');
    return ipfs;
  } catch (err) {
    console.error('Error starting IPFS node:', err);
    process.exit(1);
  }
};

module.exports = connectIPFS;
