import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';

import Abiturient from './abiturient.model';
import { TAbiturient } from './abiturient.type';

import abiturientService from './abiturient.service';
import catchErrors from '../../common/catchErrors';

const router = Router();

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const boards = await abiturientService.getAll();

    res.json(boards.map(Abiturient.toResponse));
  }),
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const { lastName, firstName, numCertificate  }: TAbiturient = req.body;

    const abiturient = await abiturientService.createAbiturinet({ lastName, firstName, numCertificate  });

    if (abiturient) {
      res.status(StatusCodes.CREATED).json(Abiturient.toResponse(abiturient));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'ABITURIENT_NOT_CREATE', msg: 'Abiturient not create' });
    }
  }),
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const abiturient = await abiturientService.getById(id || '');

    if (abiturient) {
      res.json(Abiturient.toResponse(abiturient));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'ABITURIENT_NOT_FOUND', msg: 'Abiturient not found' });
    }
  }),
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { lastName, firstName, numCertificate  } = req.body;

    const abiturient = await abiturientService.updateById({ id: id || '', lastName, firstName, numCertificate });

    if (abiturient) {
      res.status(StatusCodes.OK).json(Abiturient.toResponse(abiturient));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'ABITURIENT_NOT_FOUND', msg: 'Abiturient not found' });
    }
  }),
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const abiturient = await abiturientService.deleteById(id || '');

    if (!abiturient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ABITURIENT_NOT_FOUND', msg: 'Abiturient not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'ABITURIENT_DELETED', msg: 'The abiturient has been deleted' });
  }),
);

export default router;