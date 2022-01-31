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

    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

    const user: ISignIn = await knex('users')
        .where({ email: email })
        .select({
            _id: '_id',
            password: 'password',
            tokenVersion: 'tokenVersion',
        });

    const match = matchPassword(password, user.password!);

    if (!match) {
        return res.jsonBadRequest(null, null, null);
    } else {
        const token = jwt.generateJwt(
            {
                _id: user._id,
                tokenVersion: user.tokenVersion,
            },
            1,
        );
        const refreshToken = jwt.generateJwt(
            {
                _id: user._id,
                tokenVersion: user.tokenVersion,
            },
            2,
        );

        req.headers.authorization = `Bearer ${token}`;
        /*res.cookie('jid', refreshToken, {
            httpOnly: true,
            path: '/refresh-token',
        });*/

        user.password = undefined;
        return res.jsonOK(user, getMessage('user.valid.sign_in.success'), {
            token,
        });
    }
}

export default { signIn };
