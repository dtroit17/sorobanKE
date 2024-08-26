import React from 'react';
import axios from 'axios';

const CompleteButton = ({ courseId }) => {
  const handleComplete = async () => {
    await axios.post(`/api/courses/${courseId}/complete`);
  };

  return <button onClick={handleComplete}>Complete Course</button>;
};

export default CompleteButton;
