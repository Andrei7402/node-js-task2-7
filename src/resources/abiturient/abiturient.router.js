const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const Abiturient = require('./abiturient.model');

const abiturientService = require('./abiturient.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const abiturient = await abiturientService.getAll();

    res.json(menu.map(Abiturient.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { id, lastName, firstName, numCertificate } = req.body;

    const abiturient = await abiturientService.createMenu({ id, lastName, firstName, numCertificate});

    if (abiturient) {
      res.status(StatusCodes.CREATED).json(Abiturient.toResponse(abiturient));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'ABIRUTIENT_NOT_CREATE', msg: 'Abiturient not create' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const abiturient = await abiturientService.getById(id);

    if (abiturient) {
      res.json(Abiturient.toResponse(abiturient));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ABIRUTIENT_NOT_FOUND', msg: 'Abiturient not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const {  lastName, firstName, numCertificate } = req.body;

    const abiturient = await abiturientService.updateById({ id, lastName, firstName, numCertificate });

    if (abiturient) {
      res.status(StatusCodes.OK).json(Abiturient.toResponse(abiturient));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ABIRUTIENT_NOT_FOUND', msg: 'Abiturient not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const abiturient = await abiturientService.deleteById(id);

    if (!abiturient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ABIRUTIENT_NOT_FOUND', msg: 'Abiturient not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'ABIRUTIENT_DELETED', msg: 'The Abiturient has been deleted' });
  })
);

module.exports = router;
