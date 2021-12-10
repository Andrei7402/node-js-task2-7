import teacherRepo from './teacher.memory.repository';
import examRepo from '../exam/exam.memory.repository';
import { TTeacher, TTeacherModel } from './teacher.type';

const getAll = async (): Promise<TTeacherModel[]> => teacherRepo.getAll();

const getById = async (id: string): Promise<TTeacherModel | null> => teacherRepo.getById(id);

const createTeacher = async (user: TTeacher): Promise<TTeacherModel> => teacherRepo.createUser(user);

const deleteById = async (id: string): Promise<TTeacherModel | null> => {
  const teacherDeletable = await getById(id);
  teacherRepo.deleteById(id);
  examRepo.removeUserById(id);

  return teacherDeletable;
};

const updateById = async (user: TTeacherModel): Promise<TTeacherModel | null> =>
  teacherRepo.updateById(user);

export default { getAll, getById, createTeacher, deleteById, updateById };