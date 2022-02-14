import { Knex } from 'knex';

const table = 'users';

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`DROP TABLE IF EXISTS "${table}" CASCADE`);
    return knex.schema.createTable(table, (table: Knex.TableBuilder) => {
        table.uuid('_id').primary().notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('name').notNullable();
        table.integer('tokenVersion').notNullable().defaultTo(0);
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(table);
}
