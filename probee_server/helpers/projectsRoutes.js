const express = require('express')
const res = require('express/lib/response')
const project = require('../models/projectsModel')
const router =  express.Router()

router.post('/create', async (req, res) => {
    try {
        console.log("Project data received:", req.body);
        const newProject = new project({
            name: req.body.name,
            description: req.body.description,
            students: req.body.students,
        });
        const savedProject = await newProject.save();
        res.status(201).json({ message: 'Project created successfully', project: savedProject });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: 'Failed to create project', error: error.message });
    }
});

router.get('/:id', async (req, res)=> {
    try {
        const data = await project.findById(req.params.id)
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/byUsername/:username/:role', async (req, res) => {
    try {
        const { username, role } = req.params;
        let data;

        if (role === "Instructor") {
            data = await project.find({});
        } else if (role === "Student") {
            data = await project.find({ students: { $in: [username] } });
        } else {
            return res.status(400).json({ message: "Invalid role specified" });
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router