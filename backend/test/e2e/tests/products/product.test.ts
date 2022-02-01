import supertest from 'supertest';


import { app } from '../../../../src/config/express.config';
import jwt from '../../../../src/utils/jwt.util';
import { product, fake_product } from '../../../mocks/product.mock';
import { createProduct, schema } from '../../../helpers/product.helper';
import { getMessage } from '../../../../src/utils/message.util';
import { user } from '../../../mocks/user.mock';

const itif = (condition: boolean) => (condition ? it : it.skip);

describe('Products', () => {
    
    let mockToken = jwt.generateJwt(
        {
            _id: user._id,
            tokenVersion: 0,
        },
        1,
    );

    createProduct(product, mockToken);

    it ('GET /products', async () => {
        await supertest(app)
            .get('/products')
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
                expect(
                    response.body.message.startsWith(
                        getMessage('product.list.success'),
                    ),
                ).toBeTruthy();

                expect(response.body).toMatchObject({
                    message: getMessage('product.list.success') + '1',
                    data: [schema(product)],
                    metadata: {},
                    status: 200,
                });
            });
    });
});
