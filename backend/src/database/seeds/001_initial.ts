import { Knex } from 'knex';
import { randomUUID } from 'crypto';
import { hashPassword } from '../../utils/password.util';

export async function seed(knex: Knex): Promise<void> {
    const random = (n: number) => {
        return Math.floor(Math.random() * n);
    };

    // prettier-ignore
    const users = [
            { _id: randomUUID(), email: 'fakeemail1@gmail.com', name: 'Alex', password: await hashPassword('password@3123') },
            { _id: randomUUID(), email: 'fakeemail2@gmail.com', name: 'Bernard', password: await hashPassword('password@3123') },
            { _id: randomUUID(), email: 'fakeemail3@gmail.com', name: 'Charles', password: await hashPassword('password@3123') }
        ]

    // prettier-ignore
    const products = [
            { _id: randomUUID(), description: 'it is new', name: 'Product1', price: 1.55, user_id: users[random(users.length)]._id },
            { _id: randomUUID(), description: 'it is bad', name: 'Product2', price: 5.50, user_id: users[random(users.length)]._id },
            { _id: randomUUID(), description: 'it is old', name: 'Product3', price: 8.55, user_id: users[random(users.length)]._id }
        ]

    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert(users);

    // Deletes ALL existing entries
    await knex('products').del();

    // Inserts seed entries
    await knex('products').insert(products);
}
