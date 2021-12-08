const abiturientRepo = require('./abiturient.memory.repository');
const examRepo = require('../exam/exam.memory.repository');

const getAll = () => abiturientRepo.getAll();
const getById = (id) => abiturientRepo.getById(id);
const createAbiturient = ({ id, lastName, firstName, numCertificate }) =>
abiturientRepo.createAbiturient({ id, lastName, firstName, numCertificate });
const deleteById = async (id) => {
  const abiturientDeletable = await getById(id);
  abiturientRepo.deleteById(id);
  examRepo.deleteByAbiturientId(id);            

  return abiturientDeletable;
};
const updateById = ({ id, lastName, firstName, numCertificate }) =>
  menuRepo.updateById({id, lastName, firstName, numCertificate });

module.exports = { getAll, getById, createAbiturient, deleteById, updateById };
