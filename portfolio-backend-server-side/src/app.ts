import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import { router } from './routes';

const app = express();

// Middleware
dotenv.config();
app.use(express.json());
app.use(compression()); // Compresses response bodies for faster delivery
app.use(cookieParser()); // Parse Cookie header and populate req.cookies

app.use(
    cors({
        origin: 'https://portfolio-client-site.vercel.app',
        credentials: true,
    })
);

app.use('/api/v1', router);

// Default route for testing
app.get('/', (_req, res) => {
    res.send('Portfolio API is running');
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
