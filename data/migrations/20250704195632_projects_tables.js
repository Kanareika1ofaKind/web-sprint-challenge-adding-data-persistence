/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', (table) => {

      table.increments('project_id')
        .primary();
      table.string('project_name')
        .notNullable();
      table.string('project_description');
      table.boolean('project_completed')
        .defaultTo(false);
    })
    .createTable('resources', (table) => {
      table.increments('resource_id');
      table.string('resource_name')
        .unique()
        .notNullable();
      table.string('resource_description')
    })
    .createTable('tasts', (table) => {
      table.increments('task_id');
      table.string('task_description')
        .notNullable();
      table.string('task_notes');
      table.boolean('task_completed');
      table.integer('project_id')
      .unsigned()
      .references('project_id')
      .inTable('projects')
      .onDelete('RESTRICT');
    
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('tasks')
  .dropTableIfExists('resources')
  .dropTableIfExists('projects')

  

};

// -[]`task_id` - primary key
//   - []`task_description` - required
//   - []`task_notes` - optional
//   - []`task_completed` - the database defaults it to`false`(integer 0) if not provided
//   - []`project_id` - required and points to an actual`project_id` in the`projects` table

//  - [] A ** resource assignment ** connects a resource and a project, and is stored in a`project_resources` table.You decide what columns to use.
