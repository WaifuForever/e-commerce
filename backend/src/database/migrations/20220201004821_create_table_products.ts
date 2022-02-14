import { Knex } from 'knex';

const table = 'products';

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`DROP TABLE IF EXISTS "${table}" CASCADE`);
    return knex.schema.createTable(table, (table: Knex.TableBuilder) => {
        table.uuid('_id').primary().notNullable().unique();
        table.string('description').notNullable();
        table.string('name').notNullable();
        table.float('price').notNullable().checkPositive();
        table.uuid('user_id').notNullable().references('_id').inTable('users');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(table);
}
