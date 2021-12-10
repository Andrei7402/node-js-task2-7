import Exam from './exam.model';
import { TExam, TExamModel } from './exam.type';

const EXAM: TExamModel[] = [];

const getAll = async (): Promise<TExamModel[]> => EXAM;

const getById = async (id: string): Promise<TExamModel | null> =>
  EXAM.find((exam) => exam.id === id) || null;

const createExam = async ({
  subject,
  score,
  date,
  abiturientId,
  teacherId,
}: TExam): Promise<TExamModel> => {
  const exam = new Exam({
    subject,
    score,
    date,
    abiturientId,
    teacherId,
  });
  EXAM.push(exam);
  return exam;
};

const deleteById = async (id: string): Promise<TExamModel | null> => {
  const abiturientPosition = EXAM.findIndex((exam) => exam.id === id);

  if (abiturientPosition === -1) return null;

  const examDeletable = EXAM[abiturientPosition]!;

  EXAM.splice(abiturientPosition, 1);
  return examDeletable;
};

const updateById = async ({ id, ...payload }: Partial<TExamModel>): Promise<TExamModel | null> => {
  const abiturientPosition = EXAM.findIndex((exam) => exam.id === id);

  if (abiturientPosition === -1) return null;

  const oldAbiturient = EXAM[abiturientPosition]!;
  const newAbiturient = { ...oldAbiturient, ...payload };

  EXAM.splice(abiturientPosition, 1, newAbiturient);
  return newAbiturient;
};

const removeUserById = async (id: string): Promise<void> => {
  const teacherExam = EXAM.filter((exam) => exam.teacherId === id);

  await Promise.allSettled(teacherExam.map(async (exam) => updateById({ id: exam.id, teacherId: null })));
};

const deleteByAbiturientId = async (abiturientId: string): Promise<void> => {
  const abiturinetExam = EXAM.filter((exam) =>exam.abiturientId === abiturientId);

  await Promise.allSettled(abiturinetExam.map(async (exam) => deleteById(exam.id)));
};

export default {
  EXAM,
  getAll,
  getById,
  createExam,
  deleteById,
  updateById,
  removeUserById,
  deleteByAbiturientId,
};