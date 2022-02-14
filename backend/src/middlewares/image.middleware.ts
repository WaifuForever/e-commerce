import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { IUser } from '../interfaces/user.interface';
import { getMessage } from '../utils/message.util';
import { product_rules as rules } from '../utils/yup.util';
import { LooseObject } from '../interfaces/yup.interface';

async function findById(req: Request, res: Response, next: NextFunction) {
    const yupObject = yup.object().shape({
        _id: rules._id.required(),
    });

    yupObject
        .validate(req.body, { stripUnknown: true })
        .then(() => next())
        .catch((err: any) => {
            return res.jsonBadRequest(
                null,
                getMessage('default.badRequest'),
                err.errors,
            );
        });
}

export default {  findById };
