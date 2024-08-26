import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CampaignDetail from './CampaignDetail';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('/api/crowdfunding').then(response => setCampaigns(response.data));
  }, []);

  return (
    <div>
      {campaigns.map(campaign => (
        <CampaignDetail key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};

export default CampaignList;
