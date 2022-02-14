import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

import { files } from '../config/multer.config';

const upload = multer(files).array('imgCollection', 5);

function upload_many(req: Request, res: Response, next: NextFunction) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log({MulterError: err})
            return res.jsonBadRequest(null, null, err);
        } else if (err) {
            console.log({AnyError: err})
            // An unknown error occurred when uploading.
            return res.jsonBadRequest(null, null, err);
        }
        // Everything went fine.
        next();
    });
}

export default {
    upload_many,
};
