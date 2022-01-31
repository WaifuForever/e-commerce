export interface IUser {
    name: string,
    email: string,
    password: string
}

export interface ISignIn {
    _id: string;
    tokenVersion: number,
    email: string,
    password: string | undefined
}