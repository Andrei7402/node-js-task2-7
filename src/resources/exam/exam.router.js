const { StatusCodes } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const Exam = require('./exam.model');

const examService = require('./exam.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const exam = await examService.getAll();

    res.json(exam.map(Exam.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { abiturientId } = req.params;
    const {id, subject, teacherId, date, score } = req.body;

    const exam = await examService.createExam({
      id, 
      subject,
      abiturientId,
      teacherId,
      date, 
      score,
    });

    if (exam) {
      res.status(StatusCodes.CREATED).json(Exam.toResponse(exam));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const exam = await examService.getById(id);

    if (exam) {
      res.json(Exam.toResponse(exam));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_FOUND', msg: 'Exam not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id, abiturientId } = req.params;
    const { subject, teacherId, date, score } = req.body;

    const task = await tasksService.updateById({
      id, 
      subject,
      abiturientId,
      teacherId,
      date, 
      score,
    });

    if (exam) {
      res.status(StatusCodes.OK).json(Exam.toResponse(exam));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_FOUND', msg: 'Exam not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const exam = await examService.deleteById(id);

    if (exam) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'EXAM_DELETED', msg: 'The exam has been deleted' });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_FOUND', msg: 'Exam not found' });
    }
  })
);

module.exports = router;
