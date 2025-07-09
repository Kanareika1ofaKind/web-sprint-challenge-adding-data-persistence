// build your `/api/tasks` router here


const express = require('express');
const router = express.Router();

const Tasks = require('./model.js'); // import the Resource model


// GET all tasks

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Tasks.getAll(); // call the getAll method from the model
        res.status(200).json(tasks); // respond with the list of tasks
    } catch (error) {
        next(error); // pass any errors to the error handler
    }
});

router.get('/:task_id', async (req, res, next) => {

    const { task_id } = req.params; // get the task_id from the request parameters
    try {
        const task = await Tasks.findById(task_id); // call the findById method from the model
        res.status(200).json(task); // respond with the found task
    } catch (error) {
        next(error); // pass any errors to the error handler
    }
});


router.post('/', async (req, res, next) => {

    const { task_description, task_notes, task_completed, project_id } = req.body; // destructure the request body

    if (!task_description || !project_id) { // validate required fields
        return res.status(400).json({ message: 'task_description and project_id are required' });
    }

    try {

        const newTask = { // create a new task object
            task_description,
            task_notes: task_notes || null, // ensure task_notes is null if not provided
            task_completed: task_completed ? true : false, // ensure boolean value
            project_id
        };

        const createdTask = await Tasks.create(newTask); // call the create method from the model

        return res.status(201).json(createdTask); // respond with the created task

    } catch (error) {
        next(error); // pass any errors to the error handler
    }

});

module.exports = router; // export the router to be used in server.js

