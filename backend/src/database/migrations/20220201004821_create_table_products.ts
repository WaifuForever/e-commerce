import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', (table: Knex.TableBuilder) => {
        table.uuid('_id').primary().notNullable().unique();       
        table.string('description').notNullable();
        table.string('name').notNullable();
        table.float('price').notNullable();
        table
        .uuid('user_id')
        .notNullable()
        .references('_id')
        .inTable('users');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('products');
}
