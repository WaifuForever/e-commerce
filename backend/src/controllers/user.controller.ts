import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import knex from '../database/db';
import { IFindOne, IUser } from '../interfaces/user.interface';
import { getMessage } from '../utils/message.util';
import { hashPassword } from '../utils/password.util';

const selection: IFindOne = {
    _id: '_id',
    name: 'name',
    email: 'email',
};

async function create(req: Request, res: Response) {
    try {
        const { name, email, password }: IUser = req.body;

        const result = await knex('users').insert({
            _id: uuidv4(),
            name: name,
            email: email,
            password: await hashPassword(password),
        });

        return res.jsonOK(
            { name: name, email: email },
            getMessage('user.valid.sign_up.success'),
            {},
        );
    } catch (error) {
        console.log(error);
        return res.jsonBadRequest(error, null, null);
    }
}

async function findOne(req: Request, res: Response) {
    const { _id } = req.query;
    try {
        const user: Array<IFindOne> = await knex('users')
            .where('_id', _id?.toString())
            .select(selection);
        return res.jsonOK(user[0], null, {});
    } catch (err) {
        console.log(err);
        return res.jsonBadRequest({ err: err }, null, null);
    }
}

async function list(req: Request, res: Response) {
    try {
        const users: Array<IFindOne> = await knex('users').select(selection);

        return res.jsonOK(
            users,
            getMessage('user.list.success') + users.length,
            {},
        );
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
