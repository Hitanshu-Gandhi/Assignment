const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/user');
const asyncHandler = require('express-async-handler');

// Access JWT secret from env
const JWT_SECRET = process.env.JWT_SECRET;

// Login Handler
const loginHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await Users.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.status(200).json({
        auth: true,
        token: token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

module.exports = {
    loginHandler,
};
