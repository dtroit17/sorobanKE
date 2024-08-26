import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContributeButton from './ContributeButton';

const CampaignDetail = ({ campaign }) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchDescription = async () => {
      const response = await axios.get(`https://ipfs.io/ipfs/${campaign.ipfsHash}`);
      setDescription(response.data);
    };
    fetchDescription();
  }, [campaign.ipfsHash]);

  return (
    <div>
      <h1>{campaign.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <ContributeButton campaignId={campaign.id} />
      <p>Goal: {campaign.goal}</p>
      <p>Raised: {campaign.raised}</p>
    </div>
  );
};

export default CampaignDetail;
