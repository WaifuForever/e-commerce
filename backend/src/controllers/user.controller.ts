import { Request, Response } from 'express';

import knex from '../database/db';
import { IUser } from '../database/interfaces/user.interface';
import { getMessage } from '../utils/message.util';
import { hashPassword } from '../utils/password.util';

async function create(req: Request, res: Response) {
    try {
        const { name, email, password }: IUser = req.body;

        const result = await knex('users').insert({
            name: name,
            email: email,
            password: await hashPassword(password),
        });

        return res.jsonOK(result, getMessage('user.valid.sign_up.sucess'), {});
    } catch (error) {
        return res.jsonBadRequest(error, null, null);
    }
}

async function findOne(req: Request, res: Response) {
    const { _id } = req.query;
    try {
        const result = await knex('users').where('_id', _id?.toString());

        return res.jsonOK(result, null, {});
    } catch (err) {
        console.log(err);
        return res.jsonBadRequest({ err: err }, null, null);
    }
}

async function list(req: Request, res: Response) {
    try {
        const result = await knex('users');

        return res.jsonOK(result, null, {});
    } catch (err) {
        console.log(err);
        return res.jsonBadRequest({ err: err }, null, null);
    }
}

async function update(req: Request, res: Response) {
    const { _id, name } = req.body;

    try {
        const result = await knex('users').where('_id', _id).update({
            name: name,
        });
        return res.jsonOK(result, null, {});
    } catch (err) {
        console.log(err);
        return res.jsonBadRequest({ err: err }, null, null);
    }
}

async function remove(req: Request, res: Response) {
    const { _id } = req.query;

    try {
        await knex('users').where('_id', _id?.toString()).delete();
        return res.jsonOK(null, null, {});
    } catch (err) {
        console.log(err);
        return res.jsonBadRequest({ err: err }, null, null);
    }
}

export default { create, findOne, list, update, remove };
