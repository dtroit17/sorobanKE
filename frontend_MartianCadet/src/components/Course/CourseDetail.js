import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompleteButton from './CompleteButton';

const CourseDetail = ({ course }) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchDescription = async () => {
      const response = await axios.get(`https://ipfs.io/ipfs/${course.ipfsHash}`);
      setDescription(response.data);
    };
    fetchDescription();
  }, [course.ipfsHash]);

  return (
    <div>
      <h1>{course.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <CompleteButton courseId={course.id} />
      <p>Completed: {course.completed ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default CourseDetail;
