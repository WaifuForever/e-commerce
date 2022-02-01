import { randomUUID } from 'crypto';
export const product = {
    user_id: '',
    description: 'A very good choice if you ask me',
    price: 25.5,
    name: 'Product1',
    _id: randomUUID(),
    token: '',
};

export const fake_product = {
    user_id: '',
    description: 'A',
    price: -25.5,
    name: 'Product2',
    _id: '',
    token: '',
};
