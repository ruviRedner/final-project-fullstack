import express, { Request, Response } from 'express';
import 'dotenv/config';
import { connectDB } from './config/db';
import cors from 'cors';
import http from 'http';





import 'dotenv/config';

const PORT = process.env.PORT || 3000;

export const app = express();
export const server = http.createServer(app);

app.use(cors());
connectDB();
app.use(express.json());



app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send('pong')});




server.listen(PORT, () => console.log(`Listening on port ${PORT},visit http://localhost:${PORT}`));