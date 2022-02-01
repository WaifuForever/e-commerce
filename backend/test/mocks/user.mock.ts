import { randomUUID } from 'crypto';

export const user = {
    email: 'as' + `${process.env.TEST_GMAIL}`,
    password: `${process.env.TEST_GMAIL_PASS}`,
    active: false,
    tokenVersion: 0,
    name: 'Seth',
    _id: randomUUID(),
    token: '',
};

export const fake_user = {
    email: `25 + ${process.env.TEST_GMAIL}`,
    password: `${process.env.TEST_GMAIL_PASS_2}`,
    name: 'Matt',
};
