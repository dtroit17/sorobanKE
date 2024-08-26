import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseDetail from './CourseDetail';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/api/courses').then(response => setCourses(response.data));
  }, []);

  return (
    <div>
      {courses.map(course => (
        <CourseDetail key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;