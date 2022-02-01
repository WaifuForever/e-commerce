import * as yup from 'yup';
import { AnyObject } from 'yup/lib/object';

export interface LooseObject {
    [key: string]:  yup.StringSchema<string | undefined, AnyObject, string | undefined> | yup.NumberSchema<number | undefined, AnyObject, number | undefined> 
}