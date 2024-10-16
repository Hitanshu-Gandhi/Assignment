const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'instructor' },
  date: Date
});

// Check conditions before saving
lectureSchema.pre('save', async function (next) {
  const startOfDay = new Date(this.date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(this.date);
  endOfDay.setHours(23, 59, 59, 999);

  const existingLecture = await this.constructor.findOne({
    instructor: this.instructor,
    date: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  });

  if (existingLecture) {
    const error = new Error('Instructor is already assigned to a lecture on this date');
    error.status = 400; // Set a status code for the error
    return next(error);
  }

  next();
});

// Add a unique compound index
lectureSchema.index({ instructor: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('lecture', lectureSchema);