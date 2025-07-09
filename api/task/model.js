// build your `Task` model here


const db = require('../../data/dbConfig.js'); // import the database configuration


async function getAll() {

    // Retrieve all tasks from the database
    const tasks = await db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes',
            't.task_completed',
            't.project_id',
            'p.project_name',
            'p.project_description' // include project name for context
        );
    return tasks.map(task => ({
        task_id: task.task_id,
        task_description: task.task_description,
        task_notes: task.task_notes || null, // ensure null if not provided
        task_completed: Boolean(task.task_completed), // ensure boolean value
        project_id: task.project_id,
        project_name: task.project_name, // include project name for context
        project_description: task.project_description || null // ensure null if not provided
    }));

}

async function findById(task_id) {

    // Find a task by its ID
    const task = await db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes',
            't.task_completed',
            't.project_id',
            'p.project_name',
            'p.project_description' // include project name for context
        )
        .where('t.task_id', task_id)
        .first(); // Get the first matching record
    if (!task) {
        return null; // Return null if no task found
    }
    return {
        task_id: task.task_id,
        task_description: task.task_description,
        task_notes: task.task_notes || null, // ensure null if not provided
        task_completed: Boolean(task.task_completed), // ensure boolean value
        project_id: task.project_id,
        project_name: task.project_name, // include project name for context
        project_description: task.project_description || null // ensure null if not provided
    };

}





async function create(taskData) {

    const { task_description, task_notes, task_completed, project_id } = taskData;

    if (!task_description || !project_id) {
        throw new Error('task_description and project_id are required'); // Validate required fields
    }

    // Insert the new task into the database
    const [id] = await db('tasks').insert({
        task_description,
        task_notes: task_notes || null,
        task_completed: task_completed ? true : false, // ensure boolean value
        project_id
    });

    const newTask = await findById(id); // Retrieve the newly created task by ID

    return newTask

}

module.exports = {
    getAll,
    findById,
    create
}