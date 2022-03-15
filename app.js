import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import getRoutes from './routes/user.js';
import './config/database.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * session config
 */
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: Number(process.env.SESSION_LIFETIME),
      sameSite: true,
    },
  }),
);

app.use('/api/v1', getRoutes);

app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
