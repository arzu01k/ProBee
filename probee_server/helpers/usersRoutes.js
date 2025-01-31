const express = require('express');
const user = require('../models/usersModel');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)

    try {
        const userData = await user.findOne({ username: username });

        if (userData) {
            const isPasswordValid = await bcrypt.compare(password, userData.password);
            if (isPasswordValid) {
                res.status(200).json({ message: 'Login successful', userData });
            } else {
                res.status(400).json({ message: 'Invalid username or password' });
            }
        } else {
            res.status(400).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/students', async (req, res) => {
    try {
        console.log("Fetching students...");
        const students = await user.find({ role: 'Student' });
        console.log("Fetched students:", students);
        res.status(200).json(students);
    } catch (error) {
        console.error("Error in /students route:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await user.findById(req.params.id);
        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(400).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;