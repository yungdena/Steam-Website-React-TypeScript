import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import AppRouter from './routes';
import connectDB from './config/database';

const app = express();

const allowedOrigins = [
  "https://steam-website-react-type-script.vercel.app/",
  "http://127.0.0.1:5173/",
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
        if (origin) {
          if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
          } 
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      exposedHeaders: ["Access-Control-Allow-Origin"],
      credentials: true,
  };

app.use(cors(corsOptions));

const router = new AppRouter(app);
connectDB();

app.set('port', process.env.API_URL || 4200);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

router.init();

const port = app.get('port');
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
