// This hook handles the logic for marking a course as complete and storing the completion status on IPFS.

import { useState } from 'react';
import axios from 'axios';
import connectIPFS from '../config/database';

const useCompleteCourse = (courseId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const completeCourse = async () => {
    setLoading(true);
    setError(null);

    try {
      const ipfs = await connectIPFS();
      const { cid } = await ipfs.add(JSON.stringify({ completed: true }));
      const ipfsHash = cid.toString();

      await axios.post(`/api/courses/${courseId}/complete`, { ipfsHash });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { completeCourse, loading, error };
};

export default useCompleteCourse;
