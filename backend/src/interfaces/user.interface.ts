export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface ISignIn {
    _id: string;
    tokenVersion: number;
    email: string;
    password: string | undefined;
}

export interface IFindOne {
    _id: string;
    email: string;
    name: string;
}

export interface ISignInArray extends Array<ISignIn> {}
