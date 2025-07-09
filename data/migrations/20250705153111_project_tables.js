/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('projects', (table) => {
            table.increments('project_id'); // Primary key
            table.string('project_name')
                .notNullable(); // Project name, required
            table.string('project_description'); // Project description, optional
            table.boolean('project_completed')
                .notNullable()
                .defaultTo(false); // Project completion status, default to false
        })
        .createTable('resources', (table) => {
            table.increments('resource_id'); // Primary key
            table.string('resource_name')
                .unique() // Resource name, must be unique
                .notNullable(); // Resource name, required
            table.string('resource_description'); // Resource description, optional
        })
        .createTable('tasks', (table) => {
            table.increments('task_id'); // Primary key
            table.string('task_description')
                .notNullable(); // Task description, required
            table.string('task_notes'); // Task notes, optional
            table.boolean('task_completed')
                .notNullable()
                .defaultTo(false); // Task completion status, default to false
            table.integer('project_id')
                .unsigned()
                .notNullable() // Foreign key to projects, required
                .references('project_id')
                .inTable('projects'); // Foreign key to projects
        })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tasks') // Drop tasks table first due to foreign key dependency
        .dropTableIfExists('resources') // Drop resources table
        .dropTableIfExists('projects'); // Drop projects table
  
};
