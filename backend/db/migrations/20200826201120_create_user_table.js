
exports.up = function(knex) {
  return knex.schema.createTable('city', function(table) {
      table.increments();
      table.string('name').notNullable().unique('name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('restaurants', function(table) {
      table.increments();
      table.integer('city_id').unsigned().index().references('id').inTable('city').onDelete('CASCADE');
      table.string('name').notNullable().unique('name');
      table.string('type').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
       
    })
    .createTable('foods', function(table) {
        table.increments();
        table.integer('restaurant_id').unsigned().index().references('id').inTable('restaurants');
        table.string('name').notNullable().unique('name');
        table.string('imagePath').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('foods').dropTable('restaurants').dropTable('city');
};
