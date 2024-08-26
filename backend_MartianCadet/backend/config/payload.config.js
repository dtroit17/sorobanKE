// backend/config/payload.config.js
const { exec } = require('child_process');
const ipfsService = require('../services/ipfsService');

module.exports = {
  collections: [
    {
      slug: 'interactions',
      fields: [
        {
          name: 'user',
          type: 'text',
        },
        {
          name: 'interactionType',
          type: 'text',
        },
      ],
      hooks: {
        afterChange: [
          async ({ doc }) => {
            const { user, interactionType } = doc;
            // Upload interaction data to IPFS
            const ipfsHash = await ipfsService.uploadToIPFS({ user, interactionType });
            // Call Soroban smart contract
            exec(`soroban-cli invoke --contract NftContract --method mint_nft --args ${user} ${interactionType} ${ipfsHash}`, (error, stdout, stderr) => {
              if (error) {
                console.error(`Error: ${error.message}`);
                return;
              }
              if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
              }
              console.log(`Stdout: ${stdout}`);
            });
          },
        ],
      },
    },
  ],
};
