const Exam = require('./exam.model');

const getAll = async () => Exam;

const getById = async (id) => Exam.find((exam) => exam.id === id);

const createTask = async ({
  id, 
  subject,
  abiturientId,
  teacherId,
  date, 
  score,
}) => {
  const exam = new Exam({
    id, 
    subject,
    abiturientId,
    teacherId,
    date, 
    score,
  });
  Exam.push(exam);
  return exam;
};

const deleteById = async (id) => {
  const abiturientPosition = Exam.findIndex((exam) => exam.id === id);

  if (abiturientPosition === -1) return null;

  const examDeletable = Exam[abiturientPosition];

  Exam.splice(abiturientPosition, 1);
  return examDeletable;
};

const updateById = async ({
  id, 
  subject,
  abiturientId,
  teacherId,
  date, 
  score,
}) => {
  const abiturientPosition = Exam.findIndex((exam) => exam.id === id);

  if (abiturientPosition === -1) return null;

  const oldAbiturient = Exam[abiturientPosition];
  const newAbiturient = {
    ...oldMenu, 
    subject,
    abiturientId,
    teacherId,
    date, 
    score,
  };

  Exam.splice(abiturientPosition, 1, newAbiturient);
  return newAbiturient;
};

const removeExamById = async (id) => {
  const teacherExam = Exam.filter((exam) => exam.teacherId === id);

  await Promise.allSettled(
    teacherExam.map(async (exam) => updateById({ id: exam.id, teacherId: null }))
  );
};

const deleteByAbiturientId = async (abiturientId) => {
  const abiturientExam = Exam.filter((exam) => exam.abiturientId === abiturientId);

  await Promise.allSettled(abiturientExam.map(async (exam) => deleteById(exam.id)));
};

module.exports = {
  Exam,
  getAll,
  getById,
  createTask,
  deleteById,
  updateById,
  removeExamById,
  deleteByAbiturientId,
};
