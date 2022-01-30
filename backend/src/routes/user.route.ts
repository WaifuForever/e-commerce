import express from 'express';

import UserController from '../controllers/user.controller';

//import TeamMiddleware from '../middleware/team.middleware';

const router = express.Router();

router.post('/', UserController.create);
router.get('/findOne', UserController.findOne);

router.get('/', UserController.list);
router.put('/', UserController.update);

router.delete('/', UserController.remove);

export default router;
