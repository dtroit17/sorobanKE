// This route handles the logic for fetching and completing courses, with descriptions stored on IPFS.

const express = require('express');
const connectIPFS = require('../config/database');
const Courses = require('../collections/Courses');

const router = express.Router();

router.get('/courses', async (req, res) => {
  try {
    const courses = await Courses.find();
    const ipfs = await connectIPFS();

    const coursesWithDescription = await Promise.all(
      courses.map(async (course) => {
        const file = await ipfs.cat(course.ipfsHash);
        const description = new TextDecoder().decode(file);
        return { ...course, description };
      })
    );

    res.json(coursesWithDescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/courses/:id/complete', async (req, res) => {
  try {
    const course = await Courses.findById(req.params.id);
    course.completed = true;

    const ipfs = await connectIPFS();
    const { cid } = await ipfs.add(JSON.stringify({ completed: true }));
    course.ipfsHash = cid.toString();

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
