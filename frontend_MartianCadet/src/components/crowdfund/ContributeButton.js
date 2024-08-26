import React from 'react';
import axios from 'axios';

const ContributeButton = ({ campaignId }) => {
  const handleContribute = async () => {
    await axios.post(`/api/crowdfunding/${campaignId}/contribute`);
  };

  return <button onClick={handleContribute}>Contribute</button>;
};

export default ContributeButton;
