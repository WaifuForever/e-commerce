import express from 'express';

import ProductController from '../controllers/product.controller';

import { auth as Authorize } from '../middlewares/auth.middleware';
import ProductMiddleware from '../middlewares/product.middleware';
import UploadMiddleware from '../middlewares/upload.middleware';

const router = express.Router();

router.post(
    '/',
    Authorize(),
    //UploadMiddleware.upload_many,
    ProductMiddleware.create,
    ProductController.create,
);
router.get('/findOne', ProductMiddleware.findById, ProductController.findOne);

router.get('/', ProductController.list);
router.put(
    '/',
    Authorize(),
    ProductMiddleware.update,
    ProductController.update,
);

router.delete(
    '/',
    Authorize(),
    ProductMiddleware.findById,
    ProductController.remove,
);

export default router;
