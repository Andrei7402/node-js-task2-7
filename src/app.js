const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const teacherRouter = require('./resources/teacher/teacher.router');
const abiturientRouter = require('./resources/abiturient/abiturient.router');
const examRouter = require('./resources/exam/exam.router');

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

app.use('/teacher', teacherRouter);
app.use('/abiturient', abiturientRouter);
app.use('/abiturient/:abiturientId/exam', examRouter);

module.exports = app;
