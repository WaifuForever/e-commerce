declare namespace Express {
    export interface Request {
        auth?: string;
        new_token?: string;
    }
    export interface Response {
        jsonOK?: any;
        jsonBadRequest?: any;
        jsonUnauthorized?: any;
        jsonNotFound?: any;
        jsonServerError?: any;
    }
}
