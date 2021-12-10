import examRepo from './exam.memory.repository';
import { TExamModel, TExam } from './exam.type';

const getAll = async (): Promise<TExamModel[]> => examRepo.getAll();

const getById = async (id: string): Promise<TExamModel | null> => examRepo.getById(id);

const createExam = async ({
  subject,
    score,
    date,
    abiturientId,
    teacherId,
}: TExam): Promise<TExamModel> =>
  examRepo.createExam({
    subject,
    score,
    date,
    abiturientId,
    teacherId,
  });

const deleteById = async (id: string): Promise<TExamModel | null> => examRepo.deleteById(id); 

const updateById = async (task: TExamModel): Promise<TExamModel | null> => examRepo.updateById(task);

export default { getAll, getById, createExam, deleteById, updateById };