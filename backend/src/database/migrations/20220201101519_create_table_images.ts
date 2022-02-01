import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('images', (table: Knex.TableBuilder) => {
        table.uuid('_id').primary().notNullable().unique();   
        table.string('filename').notNullable();    
        table.integer('size').notNullable(); 
        table
        .uuid('product_id')
        .notNullable()
        .references('_id')
        .inTable('product');						  
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('images');
}

