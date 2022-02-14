import { Knex } from 'knex';

const table = 'images';

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`DROP TABLE IF EXISTS "${table}" CASCADE`);
    return knex.schema.createTable(table, (table: Knex.TableBuilder) => {
        table.uuid('_id').primary().notNullable().unique();
        table.string('filename').notNullable();
        table.integer('size').notNullable();
        table
            .uuid('product_id')
            .notNullable()
            .references('_id')
            .inTable('products');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(table);
}
