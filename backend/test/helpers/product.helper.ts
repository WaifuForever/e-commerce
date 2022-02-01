import supertest from 'supertest';

import knex from '../../src/database/db';
import { app } from '../../src/config/express.config';
import { getMessage } from '../../src/utils/message.util';
import { product, fake_product } from '../mocks/product.mock';
import { IFindOne } from '../../src/interfaces/product.interface';
import { user } from '../mocks/user.mock';

let activationToken: string;
const itif = (condition: boolean) => (condition ? it : it.skip);

const createProduct = (payload: any, token: string | null) => {
    it('POST /products', async () => {
        await knex('users').insert({
            _id: user._id,
            email: user.email,
            name: user.name,
            password: user.password,
        });
        await supertest(app)
            .post('/products')
            .send(payload)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .then(response => {
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();
                payload._id = response.body.data._id;
                expect(response.body).toEqual({
                    message: getMessage('product.create.success'),
                    data: schema(payload),
                    metadata: {},
                    status: 200,
                });
            });
    });

    it('GET /products/findOne', async () => {
        await supertest(app)
            .get(`/products/findOne?_id=${payload._id}`)
            .send({})
            .expect(200)
            .then(response => {
                // Check type and length
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();
                console.log(response.body);
                expect(response.body).toMatchObject({
                    message: getMessage('product.findOne.success'),
                    data: schema(payload),
                    metadata: {},
                    status: 200,
                });
            });
    });
};

const schema = (payload: {
    user_id?: string;
    description: string;
    price: number;
    name: string;
    _id: string;
    token?: string;
}) => {
    return {
        _id: payload._id,
        name: payload.name,
        description: payload.description,
        price: payload.price,
    };
};

export { createProduct, schema };
