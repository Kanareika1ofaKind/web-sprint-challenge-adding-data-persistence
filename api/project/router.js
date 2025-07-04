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
    res.status(500).json({ message: 'Error retrieving projects', error });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.getById(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project', error });
  }
});

router.post('/', async (req, res) => {
  const projectData = req.body;
  try {
    const newProject = await Projects.create(projectData);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const projectData = req.body;
  try {
    const updatedProject = await Projects.update(id, projectData);
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Projects.remove(id);
    if (deletedProject) {
      res.status(200).json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
}
);
module.exports = router; // export the router to be used in the server file