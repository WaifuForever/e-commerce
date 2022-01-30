import express from 'express';

import UserController from '../controllers/user.controller';
import UserMiddleware from '../middlewares/user.middleware';

const router = express.Router();

router.post('/', UserMiddleware.create, UserController.create);
router.get('/findOne', UserMiddleware.findById, UserController.findOne);

router.get('/', UserController.list);
router.put('/', UserMiddleware.update,  UserController.update);

router.delete('/', UserMiddleware.findById, UserController.remove);

export default router;
