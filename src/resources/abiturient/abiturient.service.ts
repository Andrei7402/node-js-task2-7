 import abiturientRepo from './abiturient.memory.repository';
 import { TAbiturient, TAbiturientModel } from './abiturient.type';

 import examRepo from '../exam/exam.memory.repository';
 
 const getAll = async (): Promise<TAbiturientModel[]> => abiturientRepo.getAll();
 
 const getById = async (id: string): Promise<TAbiturientModel | null> => abiturientRepo.getById(id);
 
 const createAbiturinet = async ({ lastName, firstName, numCertificate  }: TAbiturient): Promise<TAbiturientModel> =>
   abiturientRepo.createAbiturinet({ lastName, firstName, numCertificate  });
 
 const deleteById = async (id: string): Promise<TAbiturientModel | null> => {
   const abiturientDeletable = await getById(id);
   abiturientRepo.deleteById(id);
   examRepo.deleteByAbiturientId(id);
 
   return abiturientDeletable;
 };
 
 const updateById = async (abiturient: TAbiturientModel): Promise<TAbiturientModel | null> =>
   abiturientRepo.updateById(abiturient);
 
 export default { getAll, getById, createAbiturinet, deleteById, updateById };