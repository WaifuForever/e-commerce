import fs from 'fs';
import path from 'path';
import knex from '../../src/database/db';
import { up as setUsers } from '../../src/database/migrations/20220129190225_create_table_users';
import { up as setProducts } from '../../src/database/migrations/20220129190225_create_table_users';

async function dropAllCollections() {
    knex.schema.dropTable('products');
    knex.schema.dropTable('users');
}

async function deleteAllData() {
    await knex('products').del();
    await knex('users').del();
}

async function dropTestUploadFolder() {
    let reqPath = path.resolve(path.dirname(''), 'uploads2');
    fs.rmdirSync(reqPath, { recursive: true });
}

function setupDB() {
    beforeAll(async () => {
        let dir = path.resolve(path.dirname(''), 'uploads2');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        const hasUsers = await knex.schema.hasTable('users');
        const hasProducts = await knex.schema.hasTable('products');
        if (!hasUsers) await setUsers(knex);
        if (!hasProducts) await setProducts(knex);
    });

    // Disconnect Mongoose
    afterAll(async () => {
        await deleteAllData();
        //await dropAllCollections();
        await dropTestUploadFolder();
    });
}

setupDB();
