import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';

import Exam from './exam.model';
import examService from './exam.service';
import catchErrors from '../../common/catchErrors';

const router = Router({ mergeParams: true });

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const exam = await examService.getAll();

    res.json(exam.map(Exam.toResponse));
  }),
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const { abiturientId } = req.params;
    const { subject, date, score, teacherId } = req.body;

    const exam = await examService.createExam({
      subject,
      score,
      date,
      abiturientId: abiturientId || '',
      teacherId,
    });

    if (exam) {
      res.status(StatusCodes.CREATED).json(Exam.toResponse(exam));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }),
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const exam = await examService.getById(id || '');

    if (exam) {
      res.json(Exam.toResponse(exam));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'EXAM_NOT_FOUND', msg: 'Exam not found' });
    }
  }),
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { abiturientId } = req.params;
    const { subject, date, score, teacherId } = req.body;

    const exam = await examService.updateById({
      id: id || '',
      subject,
      score,
      date,
      teacherId,
      abiturientId: abiturientId || '',
      
    });

    if (exam) {
      res.status(StatusCodes.OK).json(Exam.toResponse(exam));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'EXAM_NOT_FOUND', msg: 'Exam not found' });
    }
  }),
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const exam = await examService.deleteById(id || '');

    if (exam) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'EXAM_DELETED', msg: 'The exam has been deleted' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'EXAM_NOT_FOUND', msg: 'Exam not found' });
    }
  }),
);

export default router;