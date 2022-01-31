import supertest from 'supertest';

import { app } from '../../../../src/config/express.config';
import { user, fake_user } from '../../../mocks/user.mock';
import { createUser, schema } from '../../../helpers/user.helper';
import { getMessage } from '../../../../src/utils/message.util';

const itif = (condition: boolean) => (condition ? it : it.skip);

describe('Session createUser', () => {
    let state = true;
    it('GET /', async () => {
        await supertest(app)
            .get('/')
            .expect(200)
            .then(response => {
                // Check type and length

                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                expect(response.body).toEqual({
                    message: getMessage('default.return'),
                    data: null,
                    metadata: {},
                    status: 200,
                });
            });
    });

    createUser(user);

    it('GET /users', async () => {
        await supertest(app)
            .get('/users')
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
                        getMessage('user.list.success'),
                    ),
                ).toBeTruthy();

                expect(response.body).toMatchObject({
                    message: getMessage('user.list.success') + '1',
                    data: [schema(user)],
                    metadata: {},
                    status: 200,
                });
            });
    });

    itif(state)('GET /sign-in Fake Email', async () => {
        await supertest(app)
            .get('/auth')
            .auth(fake_user.email, user.password)
            .expect(401)
            .then(response => {
                // Check type and length
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();
                console.log(response.body);
                expect(response.body).toEqual({
                    message: getMessage('default.unauthorized'),
                    data: null,
                    metadata: {},
                    status: 401,
                });
            });
    });

    itif(state)('GET /sign-in Weak Password', async () => {
        await supertest(app)
            .get('/auth')
            .auth(fake_user.email, fake_user.password)
            .expect(401)
            .then(response => {
                // Check type and length
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                expect(response.body).toEqual({
                    message: getMessage('default.unauthorized'),
                    data: null,
                    metadata: {},
                    status: 401,
                });
            });
    });
});
