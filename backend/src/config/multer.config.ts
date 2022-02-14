import { Request, Response, NextFunction } from 'express';
import path from 'path';
import multer from 'multer';
import { randomBytes } from 'crypto';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { decrypt } from '../utils/password.util';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const folderName =
    process.env.NODE_ENV === 'dev' ? 'uploads/' : 'uploads2/';

export const files = {
    storage: multer.diskStorage({
        destination: (
            req: Request,
            file: Express.Multer.File,
            cb: DestinationCallback,
        ) => {
            cb(null, path.resolve(__dirname, '..', '..', folderName));

            let dir = './' + folderName;
            if (!fs.existsSync(dir)) return false;
            //fs.mkdirSync(dir);

            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        },
        filename: (
            req: Request,
            file: Express.Multer.File,
            cb: FileNameCallback,
        ) => {
            randomBytes(16, (err, hash) => {
                if (err) cb(err, file.filename);

                var filename = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, filename);
            });
        },
    }),
    limits: {
        fileSize: 3 * 1024 * 1024,
    },
    fileFilter: (
        req: Request,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback,
    ) => {
        const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            var message = `${file.originalname} is invalid. Only accept png/jpeg/jpg.`;
            cb(new Error(message));
        }
    },
};
