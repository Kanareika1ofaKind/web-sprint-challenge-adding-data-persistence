// build your `Project` model here
const db = require('../../data/dbConfig.js'); // import the database configuration

// get all projects
async function getAll() {
  const projects = await db('projects');
  return projects;
}

// get project by id
async function getById(id) {
  const project = await db('projects').where({ id }).first();
  return project;
}

// create a new project

async function create(projectData) {
  const [id] = await db('projects').insert(projectData);
  return getById(id); // return the newly created project
}

// update a project by id

async function update(id, projectData) {
  const count = await db('projects').where({ id }).update(projectData);
  if (count) {
    return getById(id); // return the updated project
  } else {
    return null; // project not found
  }
}


// delete a project by id
async function remove(id) {
  const count = await db('projects').where({ id }).del();
  return count > 0; // return true if a project was deleted
}
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};



