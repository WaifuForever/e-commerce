import express from 'express';
import cors from 'cors';
// import cookieParser from 'cookie-parser';

import corsOptionsDelegate from './cors.config';
import limiter from './limiter.config';

import { response } from '../middlewares/response.middleware';

import userRoute from '../routes/user.route';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static('uploads'));

//app.use(cookieParser());
app.use(cors(corsOptionsDelegate));
app.use(limiter); // limiting all requests
app.use(response);
app.use('/users', userRoute);

export { app };
