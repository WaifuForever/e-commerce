import express from 'express';
import cors from 'cors';
// import cookieParser from 'cookie-parser';

import corsOptionsDelegate from './cors.config';
import limiter from './limiter.config';

import { response } from '../middlewares/response.middleware';

import appRoute from '../routes/app.route';
import authRoute from '../routes/auth.route';
import imageRoute from '../routes/image.route';
import productRoute from '../routes/product.route';
import userRoute from '../routes/user.route';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static('uploads'));

//app.use(cookieParser());
app.use(cors(corsOptionsDelegate));
app.use(limiter); // limiting all requests
app.use(response);
app.use(appRoute);
app.use('/auth', authRoute);
app.use('/images', imageRoute);
app.use('/products', productRoute);
app.use('/users', userRoute);

export { app };
