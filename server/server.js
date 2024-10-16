const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const bcrypt = require('bcrypt');
const Users = require('./models/user');
const authRouter = require('./routes/authRoutes');
const adminRouter = require('./routes/adminRoutes');
const instructorRouter = require('./routes/instructorRoutes');

/**
 * CONSTANTS
 */
const PORT = process.env.PORT || 5000;

/**
 * CONNECT TO DATABASE
 */
connectDB();

/**
 * CREATING EXPRESS APP
 */
const app = express();

/**
 * MIDDLEWARE
 */
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/instructor', instructorRouter);

app.listen(PORT, async () => {
    /**
     * CREATE DEFAULT ADMIN
     */
    try {
        const admin = await Users.findOne({ email: 'admin@gmail.com' });
        if (!admin) {
            await Users.create({
                email: 'admin@gmail.com',
                password: await bcrypt.hash('Admin@123', 10),
                role: 'admin'
            });
            console.log('Admin created successfully');
        } else {
            console.log('Admin already exists');
        }

        /**
         * CREATE DEFAULT INSTRUCTORS
         */
        const instructors = [
            { name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', password: 'Instructor@Rahul123' },
            { name: 'Priya Gupta', email: 'priya.gupta@gmail.com', password: 'Instructor@Priya456' },
            { name: 'Aarav Patel', email: 'aarav.patel@gmail.com', password: 'Instructor@Aarav789' },
            { name: 'Ananya Reddy', email: 'ananya.reddy@gmail.com', password: 'Instructor@Ananya101' },
            { name: 'Vikram Singh', email: 'vikram.singh@gmail.com', password: 'Instructor@Vikram202' }
        ];

        for (const instructor of instructors) {
            const existingInstructor = await Users.findOne({ email: instructor.email });

            if (!existingInstructor) {
                await Users.create({
                    name: instructor.name,
                    email: instructor.email,
                    password: await bcrypt.hash(instructor.password, 10),
                    role: 'instructor'
                });
                console.log(`Instructor ${instructor.name} created successfully`);
            } else {
                console.log(`Instructor ${instructor.name} already exists`);
            }
        }

    } catch (err) {
        console.error(err);
    }

    console.log(`Server started listening at ${PORT}`);
});
