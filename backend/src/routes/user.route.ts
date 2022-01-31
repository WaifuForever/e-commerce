import express from 'express';

import UserController from '../controllers/user.controller';

import { auth as Authorize} from '../middlewares/auth.middleware';
import UserMiddleware from '../middlewares/user.middleware';

const router = express.Router();

router.post('/', UserMiddleware.create, UserController.create);
router.get('/findOne', UserMiddleware.findById, UserController.findOne);

router.get('/', UserController.list);
router.put('/', Authorize(), UserMiddleware.update,  UserController.update);

router.delete('/', Authorize(), UserMiddleware.findById, UserController.remove);

export default router;
