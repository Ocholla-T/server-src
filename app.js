import express from 'express';
import { getRoutes } from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', getRoutes);

const PORT = 8080;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
