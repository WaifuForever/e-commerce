import supertest from 'supertest';

import knex from '../../../../src/database/db';
import { app } from '../../../../src/config/express.config';
import jwt from '../../../../src/utils/jwt.util';
import { image, fake_image } from '../../../mocks/image.mock';
import { product, fake_product } from '../../../mocks/product.mock';
import { getMessage } from '../../../../src/utils/message.util';
import { user } from '../../../mocks/user.mock';

const itif = (condition: boolean) => (condition ? it : it.skip);

describe('Images', () => {
   
    let mockToken = jwt.generateJwt(
        {
            _id: user._id,
            tokenVersion: 0,
        },
        1,
    );

    it ('POST /images', async () => {
        await knex('users').insert({
            _id: user._id,
            email: user.email,
            name: user.name,
            password: user.password,
        });
    
        await knex('products').insert(
            {
                _id: product._id,
                description: product.description,
                name: product.name,
                price: product.price,
                user_id: user._id
            });
    
        await supertest(app)
            .post('/images')    
            .field({product_id: product._id})              
            .attach('imgCollection', image.dir + image.name)
            .set('Authorization', 'Bearer ' + mockToken)
            .expect(200)
            .then(response => {
                // Check type and length
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();              
                    
                expect(response.body).toMatchObject({
                    message: getMessage('image.store.success') + '1',
                    data: null,
                    metadata: {},
                    status: 200,
                });
            });
    });
});
