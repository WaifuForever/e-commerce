import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../utils/password.util';

export async function seed(knex: Knex): Promise<void> {
    const random = (n: number) => {
        return Math.floor(Math.random() * n);
    };

    // prettier-ignore
    const users = [
            { _id: uuidv4(), email: 'fakeemail1@gmail.com', name: 'Alex', password: await hashPassword('password@3123') },
            { _id: uuidv4(), email: 'fakeemail2@gmail.com', name: 'Bernard', password: await hashPassword('password@3123') },
            { _id: uuidv4(), email: 'fakeemail3@gmail.com', name: 'Charles', password: await hashPassword('password@3123') }
        ]

    // prettier-ignore
    const products = [
            { _id: uuidv4(), description: 'it is new', name: 'Product1', price: 1.55, user_id: users[random(users.length)]._id },
            { _id: uuidv4(), description: 'it is bad', name: 'Product2', price: 5.50, user_id: users[random(users.length)]._id },
            { _id: uuidv4(), description: 'it is old', name: 'Product3', price: 8.55, user_id: users[random(users.length)]._id }
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
