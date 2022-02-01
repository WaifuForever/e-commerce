import express from 'express';

import ProductController from '../controllers/product.controller';

import { auth as Authorize } from '../middlewares/auth.middleware';
//import UserMiddleware from '../middlewares/user.middleware';

const router = express.Router();

router.post('/', Authorize(), ProductController.create);
router.get('/findOne', ProductController.findOne);

router.get('/', ProductController.list);
router.put('/', Authorize(), ProductController.update);

router.delete('/', Authorize(), ProductController.remove);

export default router;
