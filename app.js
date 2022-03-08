import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import getRoutes from './routes/index.js';
import './config/database.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * session config
 */
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({mongoUrl: }),
    cookie: {
      maxAge: Number(process.env.SESSION_LIFETIME),
      sameSite: true,
    },
  }),
);

app.use('/api', getRoutes);

app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
