const examRepo = require('./exam.memory.repository');

const getAll = () => examRepo.getAll();
const getById = (id) => examRepo.getById(id);
const createExam = ({
  id, 
  subject,
  abiturientId,
  teacherId,
  date, 
  score,
}) =>
  examRepo.createExam({
  id, 
  subject,
  abiturientId,
  teacherId,
  date, 
  score,
  });
const deleteById = (id) => examRepo.deleteById(id);
const updateById = ({
  id, 
  subject,
  abiturientId,
  teacherId,
  date, 
  score,
}) =>
  examRepo.updateById({
  id, 
  subject,
  abiturientId,
  teacherId,
  date, 
  score,
  });

module.exports = { getAll, getById, createExam, deleteById, updateById };
