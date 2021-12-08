const Teacher = require('./teacher.model');

const getAll = async () => Teacher;

const getById = async (id) => Teacher.find((teacher) => teacher.id === id);

const createTeacher = async ({ lastName, firstName, degree }) => {
  const teacher = new Teacher({ lastName, firstName, degree});
  Teacher.push(teacher);
  return teacher;
};

const deleteById = async (id) => {
  const teacherPosition = Teacher.findIndex((teacher) => teacher.id === id);

  if (teacherPosition === -1) return null;

  const teacherDeletable = Teacher[teacherPosition];

  Teacher.splice(teacherPosition, 1);
  return teacherDeletable;
};

const updateById = async ({ id, lastName, firstName, degree}) => {
  const teacherPosition = Users.findIndex((teacher) => teacher.id === id);

  if (teacherPosition === -1) return null;

  const oldTeacher = Teacher[teacherPosition];
  const newTeacher = { ...oldUser, lastName, firstName, degree };

  Teacher.splice(teacherPosition, 1, newTeacher);
  return newTeacher;
};

module.exports = {
  Teacher,
  getAll,
  getById,
  createTeacher,
  deleteById,
  updateById,
};
