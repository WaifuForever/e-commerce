import express from 'express';
import { getMessage } from '../utils/message.util';


import ImageController from '../controllers/image.controller';
import { auth as Authorize} from '../middlewares/auth.middleware';
import ImageMiddleware from '../middlewares/image.middleware';
import UploadMiddleware from '../middlewares/upload.middleware';

const router = express.Router();

router.post('/', Authorize(), UploadMiddleware.upload_many, ImageController.create);

export default router;
