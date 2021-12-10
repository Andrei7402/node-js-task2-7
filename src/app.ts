import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import teacherRouter from './resources/teacher/teacher.router';
import abiturientRouter from './resources/abiturient/abiturient.router';
import examRouter from './resources/exam/exam.router';

import { logging, errorHandling } from '../src/resources/middlewares';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logging);
app.use('/teacher', teacherRouter);
app.use('/abiturient', abiturientRouter);
app.use('/abiturient/:abiturientId/exam', examRouter);
app.use(errorHandling);

export default app;