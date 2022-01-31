import express from 'express';

import AuthController from '../controllers/auth.controller';

const router = express.Router();

//router.post('/', AuthController.signUp);
router.get('/', AuthController.signIn);
//router.get('/refreshtoken', AuthController.refreshAccessToken);

export default router;
