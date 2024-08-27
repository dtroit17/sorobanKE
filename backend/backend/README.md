
# Martian Cadet Platform

## Overview

The Martian Cadet Platform is a web application that integrates Payload CMS for blogs and LMS creation, IPFS for decentralized storage, Soroban smart contracts for NFT minting 
and crowdfunding, and a modern, intuitive, and responsive design with a space exploration theme.


## Setup

### Prerequisites

- Node.js
- MongoDB
- IPFS
- Soroban CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/space-exploration-platform.git
   cd space-exploration-platform

Install backend dependencies:
cd backend
npm install

Install frontend dependencies (if any):
cd ../frontend
npm install

Start MongoDB:
mongod --dbpath /path/to/your/db

Start the backend server:
cd backend
npm start

Open frontend/index.html in your browser.
Configuration
Payload CMS
The payload.config.js file in the backend/config directory configures Payload CMS to handle interactions and upload data to IPFS.

IPFS Service
The ipfsService.js file in the backend/services directory handles uploading data to IPFS.

Soroban Smart Contracts
The contracts directory contains the Soroban smart contracts for NFT minting and crowdfunding.

Usage
Interactions
Users can interact with the platform by reading blogs, using the LMS, exploring NFTs, and interacting with smart contracts. Each interaction is recorded and uploaded to IPFS.

Crowdfunding
Users can create crowdfunding campaigns, contribute to campaigns, and withdraw funds. All campaign data is uploaded to IPFS and managed by Soroban smart contracts.

API Endpoints
Interactions
Record Interaction: POST /api/interactions
Request Body: { "user": "user123", "interactionType": "blog" }
Response: { "interaction": { ... }, "ipfsHash": "Qm..." }
Crowdfunding
Create Campaign: POST /api/crowdfunding/create
Request Body: { "creator": "user123", "goal": 1000 }
Response: { "message": "Campaign Created", "output": "..." }
Contribute to Campaign: POST /api/crowdfunding/contribute
Request Body: { "campaignId": "campaign123", "contributor": "user123", "amount": 100 }
Response: { "message": "Contribution Received", "output": "..." }
Withdraw Funds: POST /api/crowdfunding/withdraw
Request Body: { "campaignId": "campaign123", "creator": "user123" }
Response: { "message": "Funds Withdrawn", "output": "..." }
Testing
Run the tests using the following command:

cd backend
npm test

Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.
