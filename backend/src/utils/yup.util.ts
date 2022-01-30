import * as yup from 'yup';
import { LooseObject } from '../interfaces/yup.interface';
import { getMessage } from '../utils/message.util';


export const rules: LooseObject= {
    email: yup.string().email(),
    name: yup.string().min(3).max(20),
    password: yup
        .string()
        .min(8, getMessage('user.invalid.password.short'))
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            getMessage('user.invalid.password.weak'),
        ),
    sign_in_password: yup
        .string()
        .min(8, getMessage('user.invalid.password.short')),
    _id: yup.string().uuid(getMessage('invalid.uuid')),
    user_value: yup
        .string()
        .lowercase()
        .matches(/(^email$|^name$|^password$)/),
};
