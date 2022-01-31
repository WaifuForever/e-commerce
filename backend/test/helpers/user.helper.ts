import supertest from 'supertest';

import { app } from '../../src/config/express.config';
import { getMessage } from '../../src/utils/message.util';
import jwt from '../../src/utils/jwt.util';
import { user, fake_user } from '../mocks/user.mock';

let activationToken: string;
const itif = (condition: boolean) => (condition ? it : it.skip);
const email = false;

const createUser = (payload: any) => {
    it('POST /sign-up', async () => {
        await supertest(app)
            .post('/users')
            .send(payload)
            .expect(200)
            .then(response => {
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                activationToken = response.body.metadata;
                expect(response.body).toEqual({
                    message: getMessage('user.valid.sign_up.success'),
                    data: { name: user.name, email: user.email },
                    metadata: activationToken,
                    status: 200,
                });
            });
    });

    itif(email)('POST /authentication/activate/:tky', async () => {
        await supertest(app)
            .post('/authentication/activate/' + activationToken)
            .expect(200)
            .then(response => {
                // Check type and length
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                expect(response.body).toEqual({
                    message: getMessage('user.valid.sign_up.success'),
                    data: null,
                    metadata: {},
                    status: 200,
                });
            });
        user.active = true;
    });

    it('GET /sign-in', async () => {
        await supertest(app)
            .get('/auth')
            .auth(payload.email, payload.password)
            .expect(200)
            .then(response => {
                // Check type and length
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                user.token = response.body.metadata.token;
                user._id = response.body.data._id;

                expect(response.body).toMatchObject({
                    message: getMessage('user.valid.sign_in.success'),
                    data: sign_in(payload),
                    metadata: {},
                    status: 200,
                });
            });
    });

    it('GET /users/findOne', async () => {
        await supertest(app)
            .get(`/users/findOne?_id=${payload._id}`)
            .send({})
            .expect(200)
            .then(response => {
                // Check type and length
                expect(
                    typeof response.body === 'object' &&
                        !Array.isArray(response.body) &&
                        response.body !== null,
                ).toBeTruthy();

                expect(response.body).toMatchObject({
                    message: getMessage('default.success'),
                    data: schema(payload),
                    metadata: {},
                    status: 200,
                });
            });
    });
};

const schema = (payload: { _id: string; name: string; email: string }) => {
    return {
        _id: payload._id,
        name: payload.name,
        email: payload.email,
    };
};

const sign_in = (payload: { _id: string; tokenVersion: number }) => {
    return {
        tokenVersion: payload.tokenVersion,
        _id: payload._id,
    };
};

export { createUser, schema };
