import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import knex from '../database/db';
import { Payload } from '../interfaces/jwt.interface';

import jwt from '../utils/jwt.util';
import { encrypt } from '../utils/password.util';
import { getMessage } from '../utils/message.util';

export const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [, token] = req.headers.authorization
                ? req.headers.authorization.split(' ')
                : [, ''];

            let payload: any = null;
            try {
                payload = jwt.verifyJwt(token, 1);
            } catch (err) {
                //Invalid Token
                return res.jsonUnauthorized(err, null, null);
            }

            if (process.env.NODE_ENV === 'test') {
                req.auth = encrypt(payload._id);
                next();
            } else {
                knex('users')
                    .where('_id', payload._id?.toString())
                    .then(result => {
                        let current_time = Date.now().valueOf() / 1000;
                        if (
                            (payload.exp - payload.iat) / 2 >
                            payload.exp - current_time
                        ) {
                            let newToken = jwt.generateJwt(
                                {
                                    _id: payload.id,
                                    tokenVersion: payload.tokenVersion,
                                },
                                1,
                            );
                            req.new_token = `Bearer ${newToken}`;
                            console.log(`New Token: ${newToken}`);
                        } else {
                            console.log('Token not expired');
                        }

                        payload = null;
                        next();
                    })
                    .catch(err => {
                        console.log(err);
                        return res.jsonBadRequest({ err: err }, null, null);
                    });
            }
        } catch (err) {
            return res.jsonUnauthorized(null, null, null);
        }
    };
}
