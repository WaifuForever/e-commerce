import fs from 'fs';
import path from 'path';
import knex from '../../src/database/db';
import {
    up,
    down,
} from '../../src/database/migrations/20220129190225_create_table_users';

async function dropAllCollections() {
    await down(knex);
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
        await up(knex);
    });

    // Disconnect Mongoose
    afterAll(async () => {
        await dropAllCollections();
        await dropTestUploadFolder();
    });
}

setupDB();
