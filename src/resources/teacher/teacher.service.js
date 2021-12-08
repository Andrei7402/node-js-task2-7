const teacherRepo = require('../teacher/teacher.memory.repository');

const getAll = () => teacherRepo.getAll();
const getById = (id) => teacherRepo.getById(id);
const createTeacher = ({ lastName, firstName, degree }) =>
teacherRepo.createTeacher({ lastName, firstName, degree });
const deleteById = async (id) => {
  const teacherDeletable = await getById(id);
  teacherRepo.deleteById(id);
  teacherRepo.removeTeacherById(id);

  return teacherDeletable;
};
const updateById = ({ id, lastName, firstName, degree }) =>
teacherRepo.updateById({ id, lastName, firstName, degree });

module.exports = { getAll, getById, createTeacher, deleteById, updateById };
