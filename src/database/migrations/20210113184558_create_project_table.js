
exports.up = knex => knex.schema.createTable('project', table => {
    table.increments('id')
    table.text('title')

    //relacionamento
    table.integer('user_id')
    .references('users.id')
    .notNullable()
    .onDelete('CASCADE')
 
    table.timestamps(true, true)
   })
 
 exports.down = knex=> knex.schema.droptable('project')

 
 