const Users = require('../models/user');
const Course = require('../models/course')
const Lecture = require('../models/lectures')
const asyncHandler = require('express-async-handler');
const getInstructors = asyncHandler(async (req, res) => {
    try {
        const instructors = await Users.find({ role: 'instructor' });

        if (!instructors || instructors.length === 0) {
            return res.status(404).json({ message: 'No instructors found' });
        }

        res.status(200).json(instructors);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


const addCourse = asyncHandler(async (req, res) => {
    const { name, level, description, image } = req.body;

    // Validate input
    if (!name || !level || !description || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new course
        const newCourse = new Course({
            name,
            level,
            description,
            image,
        });

        const savedCourse = await newCourse.save();

        res.status(201).json({ created:true, course: savedCourse });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const getCoursesInstructors = asyncHandler(async (req, res) => {
    try {
        // Fetch all courses
        const courses = await Course.find(); 
        
        // Fetch all instructors
        const instructors = await Users.find({ role: 'instructor' });

        // Check if data is found
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: 'No courses found' });
        }

        if (!instructors || instructors.length === 0) {
            return res.status(404).json({ message: 'No instructors found' });
        }

        // Respond with both courses and instructors
        res.status(200).json({ courses, instructors });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


const addLecture = asyncHandler(async (req, res) => {
    // Destructure the necessary fields from the request body
    const { course, instructor, date } = req.body;
  
    // Validate the input data
    if (!course || !instructor || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    try {

      const courseExists = await Course.findById(course);
      if (!courseExists) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      const instructorExists = await Users.findOne({email:instructor});
      if (!instructorExists) {
        return res.status(404).json({ message: 'Instructor not found' });
      }

      console.log(instructorExists);
      
      const lecture = await Lecture.create({
        course:course,
        instructor:instructorExists._id,
        date:date,
      });
  
      res.status(201).json(lecture);
    } catch (error) {

      res.status(500).json({ message: error.message });
    }
  });


module.exports = {
    getInstructors,
    addCourse,
    getCoursesInstructors,
    addLecture
};
