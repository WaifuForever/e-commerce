import { Request, Response } from 'express';

import knex from '../database/db';
import { IUser } from '../database/interfaces/user.interface';
import { hashPassword } from '../utils/password.util';

async function create(req: Request, res: Response) {
    try {
        const { name, email, password }: IUser = req.body;

        await knex('users').insert({
            name: name,
            email: email,
            password: await hashPassword(password)
        });

        return res.status(201).json('User added!!');
    } catch (error) {
        return res.json(error);
    }
}

async function findOne(req: Request, res: Response) {
    const { _id } = req.query;
    try {
        const result = await knex('users').where('_id', _id?.toString());

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: err, message: 'Error' });
    }
}

async function list(req: Request, res: Response) {
    try {
        const result = await knex('users');

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: err, message: 'Error' });
    }
}

async function update(req: Request, res: Response) {
    const { _id, name } = req.body;

    try {
        await knex('users').where('_id', _id).update({
            name: name,
        });
        return res.json('User updated');
    } catch (err) {
        console.log(err);
        return res.json({ err: err, message: 'Error' });
    }
}

async function remove(req: Request, res: Response) {
    const { _id } = req.query;

    try {
        await knex('users').where('_id', _id?.toString()).delete();
        return res.status(201);
    } catch (err) {
        console.log(err);
        return res.json({ err: err, message: 'Error' });
    }
}

export default { create, findOne, list, update, remove };
