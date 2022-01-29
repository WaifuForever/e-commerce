declare namespace Express {
    export interface Response {
        jsonOK?: any;
        jsonBadRequest?: any;
        jsonUnauthorized?: any;
        jsonNotFound?: any;
        jsonServerError?: any;
    }
    export interface Request {
        user_id?: any;
    }
}
