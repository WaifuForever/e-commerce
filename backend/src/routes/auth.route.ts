import express from 'express';

import AuthController from '../controllers/auth.controller';
import UserMiddleware from '../middlewares/user.middleware';

const router = express.Router();

//router.post('/', AuthController.signUp);
router.get('/', UserMiddleware.signIn, AuthController.signIn);
//router.get('/refreshtoken', AuthController.refreshAccessToken);

export default router;
