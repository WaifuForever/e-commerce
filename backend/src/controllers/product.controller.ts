import { Request, Response } from 'express';
import { randomUUID } from 'crypto';

import knex from '../database/db';
import { IFindOne, IProduct } from '../interfaces/product.interface';
import { getMessage } from '../utils/message.util';
import { decrypt } from '../utils/password.util';

const selection: IFindOne = {
    _id: '_id',
    name: 'name',
    description: 'description',
    price: 'price',
};

async function create(req: Request, res: Response) {
    try {
        const product: IProduct = {
            _id: randomUUID(),
            name: req.body.name as string,
            description: req.body.description as string,
            price: req.body.price as number,
            user_id: decrypt(req.auth!),
        };

        await knex('products').insert(product);
        delete product.user_id;

        return res.jsonOK(product, getMessage('product.create.success'), {});
    } catch (error) {
        console.log(error);
        return res.jsonBadRequest(error, null, null);
    }
}

async function findOne(req: Request, res: Response) {
    const { _id } = req.query;

    try {
        const product: Array<IFindOne> = await knex('products')
            .where({ _id: _id?.toString() })
            .select(selection);
        console.log(product);
        return res.jsonOK(
            product[0],
            getMessage('product.findOne.success'),
            {},
        );
    } catch (err) {
        console.log(err);
        return res.jsonBadRequest({ err: err }, null, null);
    }
}

async function list(req: Request, res: Response) {
    try {
        const products: Array<IFindOne> = await knex('products').select(
            selection,
        );

        return res.jsonOK(
            products,
            getMessage('product.list.success') + products.length,
            {},
        );
    } catch (err) {
        console.log(err);
        return res.jsonBadRequest({ err: err }, null, null);
    }
}

async function update(req: Request, res: Response) {
    const { _id } = req.body;
    delete req.body._id;
    try {
        const result = await knex('products')
            .where('_id', _id)
            .update(req.body);
        return res.jsonOK(result, getMessage('product.update.success'), {});
    } catch (err) {
        console.log(err);
        return res.jsonBadRequest({ err: err }, null, null);
    }
}

async function remove(req: Request, res: Response) {
    const { _id } = req.query;

    try {
        await knex('products').where('_id', _id?.toString()).delete();
        return res.jsonOK(null, null, {});
    } catch (err) {
        console.log(err);
        return res.jsonBadRequest({ err: err }, null, null);
    }
}

export default { create, findOne, list, update, remove };
