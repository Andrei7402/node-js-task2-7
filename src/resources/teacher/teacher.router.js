const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const Teacher = require('./teacher.model');

const teacherService = require('./teacher.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await teacherService.getAll();

    res.json(teacher.map(Teacher.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { lastName, firstName, degree } = req.body;

    const teacher = await teacherService.createTeacher({ lastName, firstName, degree });

    if (teacher) {
      res.status(StatusCodes.CREATED).json(Teacher.toResponse(teacher));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'TEACHER_NOT_CREATE', msg: 'Teacher not create' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const teacher = await teacherService.getById(id);

    if (teacher) {
      res.json(Teacher.toResponse(teacher));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TEACHER_NOT_FOUND', msg: 'Teacher not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { lastName, firstName, degree } = req.body;

    const teacher = await teacherService.updateById({id, lastName, firstName, degree });

    if (teacher) {
      res.status(StatusCodes.OK).json(Teacher.toResponse(teacher));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TEACHER_NOT_FOUND', msg: 'Teacher not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const teacher = await teacherService.deleteById(id);

    if (!teacher) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TEACHER_NOT_FOUND', msg: 'Teacher not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'TEACHER_DELETED', msg: 'The teacher has been deleted' });
  })
);

module.exports = router;
