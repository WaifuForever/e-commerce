import { Request, Response } from 'express';
import knex from '../database/db';
import jwt from '../utils/jwt.util';
import { ISignIn } from '../interfaces/user.interface';
import { matchPassword } from '../utils/password.util';
import { getMessage } from '../utils/message.util';

async function signIn(req: Request, res: Response) {
    const [hashType, hash] = req.headers.authorization!.split(' ');

    if (hashType !== 'Basic') {
        return res.jsonUnauthorized(null, null, null);
    }

    let [email, password] = Buffer.from(hash, 'base64').toString().split(':');

    const user: Array<ISignIn> = await knex('users')
        .where({ email: email })
        .select({
            _id: '_id',
            password: 'password',
            tokenVersion: 'tokenVersion',
        });
    if (user.length === 0) {
        return res.jsonUnauthorized(null, null, null);
    }

    const match = matchPassword(password, user[0].password!);
    delete user[0].password;
    password = '';
    if (!match) {
        return res.jsonBadRequest(null, null, null);
    } else {
        const token = jwt.generateJwt(
            {
                _id: user[0]._id,
                tokenVersion: user[0].tokenVersion,
            },
            1,
        );
        const refreshToken = jwt.generateJwt(
            {
                _id: user[0]._id,
                tokenVersion: user[0].tokenVersion,
            },
            2,
        );

        req.headers.authorization = `Bearer ${token}`;
        /*res.cookie('jid', refreshToken, {
            httpOnly: true,
            path: '/refresh-token',
        });*/

        user[0].password = undefined;
        return res.jsonOK(user[0], getMessage('user.valid.sign_in.success'), {
            token,
        });
    }
}

export default { signIn };
