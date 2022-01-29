import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../utils/password.util';


export async function seed(knex: Knex): Promise<void> {
  
    // prettier-ignore
    const data = [
            { _id: uuidv4(), email: 'fakeemail1@gmail.com', name: 'George0', password: await hashPassword('password@3123') },
            { _id: uuidv4(), email: 'fakeemail2@gmail.com', name: 'George1', password: await hashPassword('password@3123') },
            { _id: uuidv4(), email: 'fakeemail3@gmail.com', name: 'George2', password: await hashPassword('password@3123') }
        ]

    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert(data);
}
