const Users = require('../models/user');
const Course = require('../models/course');
const Lecture = require('../models/lectures');
const asyncHandler = require('express-async-handler');

const getSchedule = asyncHandler(async (req, res) => {
    const { userId } = res.decodedData; // Extract userId from the decoded JWT

    try {
        // Fetch all lectures for the instructor with the matching userId
        const lectures = await Lecture.find({ instructor: userId }) // Only lectures where instructor matches userId
            .populate({
                path: 'course', // Populate the course details
                select: 'name' // Select only the name field from the Course model
            });

        // Format the response to include course name and date
        const schedule = lectures.map(lecture => ({
            courseName: lecture.course?.name || 'Course not found', // Provide default if course is missing
            date: lecture.date,
        }));

        // Respond with the schedule
        res.status(200).json(schedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message }); // Handle server errors
    }
});

module.exports = {
    getSchedule
};
