import { TTeacherModel, TTeacher } from './teacher.type';
import Teacher from './teacher.model';

const TEACHER: TTeacherModel[] = [];

const getAll = async (): Promise<TTeacherModel[]> => TEACHER;

const getById = async (id: string): Promise<TTeacherModel | null> =>
TEACHER.find((teacher) => teacher.id === id) || null;

const createUser = async ({ lastName, firstName, degree}: TTeacher): Promise<TTeacherModel> => {
  const teacher = new Teacher({ lastName, firstName, degree });
  TEACHER.push(teacher);
  return teacher;
};

const deleteById = async (id: string): Promise<TTeacherModel | null> => {
  const teacherPosition = TEACHER.findIndex((teacher) => teacher.id === id);

  if (teacherPosition === -1) return null;

  const teacherDeletable = TEACHER[teacherPosition];

  TEACHER.splice(teacherPosition, 1);
  return teacherDeletable!;
};

const updateById = async ({
  id,
  lastName,
  firstName,
  degree,
}: TTeacherModel): Promise<TTeacherModel | null> => {
  const teacherPosition = TEACHER.findIndex((teacher) => teacher.id === id);

  if (teacherPosition === -1) return null;

  const oldTeacher = TEACHER[teacherPosition];
  const newTeacher = { ...oldTeacher, lastName,firstName, degree, id };

  TEACHER.splice(teacherPosition, 1, newTeacher);
  return newTeacher!;
};

export default {
  TEACHER,
  getAll,
  getById,
  createUser,
  deleteById,
  updateById,
};