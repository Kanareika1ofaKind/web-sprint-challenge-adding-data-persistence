// build your `/api/projects` router here

const express = require('express');
const router = express.Router();

const Projects = require('./model.js'); // import the model

// GET all projects

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.getAll();
        res.status(200).json(projects);
    } catch (error) {
        next({ status: 500, message: 'Error retrieving projects', error }); // pass error to the error handler
    }
});

router.get('/:prod_id', async (req, res, next) => {
    const { prod_id } = req.params;
    try {
        const project = await Projects.getById(prod_id);
        if (project) {
            res.status(200).json(project);
        } else {

            next({ status: 404, message: 'Project not found' }); // pass error to the error handler
        }
    } catch (error) {
        next({ status: 500, message: 'Error retrieving project', error }); // pass error to the error handler
    }
});

router.post('/', async (req, res, next) => {

    //"project_name":"bar","project_description":null,"project_completed":false}
    const { project_name, project_description, project_completed } = req.body;

    if (!project_name) {
        next({ status: 400, message: 'Project name is required' }); // pass error to the error handler
    }

    try {
        const newProject = {
            project_name,
            project_description: project_description || null, // default to null if not provided
            project_completed: project_completed || false // default to false if not provided
        };
        const createdProject = await Projects.create(newProject);
        if (createdProject) {
            res.status(201).json(createdProject); // return the created project
        }
        else {
            next({ status: 500, message: 'Error creating project' }); // pass error to the error handler
        }

    } catch (error) {
        next({ status: 500, message: 'Error creating project', error }); // pass error to the error handler
    }
});

module.exports = router; // export the router to be used in the server file

