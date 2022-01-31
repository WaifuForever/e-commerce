import express from 'express';
import { getMessage } from '../utils/message.util';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    return res.jsonOK(null, getMessage('default.return'), null);
});

export default router;
