// build your `Project` model here

const db = require('../../data/dbConfig.js'); // import the database configuration

// get all projects
async function getAll() {
    const projects = await db('projects');

    return projects.map(({project_completed, ...res})=> ({
        ...res, // spread operator to include all properties
        project_completed: Boolean(project_completed) // convert to boolean
    }));


}

// get project by id
async function getById(prod_id) {
    const project = await db('projects').where({ project_id: prod_id }).first();

    return {
        ...project, // spread operator to include all properties
        project_completed: Boolean(project.project_completed) // convert to boolean
    };

   
}


// create a new project

async function create(projectData) {

    const { project_name, project_description, project_completed } = projectData; // destructure the project data

    if (!project_name) { // check if project_name is provided
        throw new Error('Project name is required!'); // throw an error if project_name is not provided
    }

    const [id] = await db('projects').insert(projectData); // insert the project and get the id
    return getById(id); // return the created project by id

}



module.exports = {
    getAll,
    getById,
    create
};



