import Abiturient from './abiturient.model';
import { TAbiturientModel, TAbiturient } from './abiturient.type';

const ABITURIENT: TAbiturientModel[] = [];

const getAll = async (): Promise<TAbiturientModel[]> => ABITURIENT;

const getById = async (id: string): Promise<TAbiturientModel | null> =>
ABITURIENT.find((abiturient) => abiturient.id === id) || null;

const createAbiturinet = async ({ lastName, firstName, numCertificate  }: TAbiturient): Promise<TAbiturientModel> => {
  const abiturient = new Abiturient({ lastName, firstName, numCertificate  });
  ABITURIENT.push(abiturient);
  return abiturient;
};

const deleteById = async (id: string): Promise<TAbiturientModel | null> => {
  const abiturientPosition = ABITURIENT.findIndex((abiturient) => abiturient.id === id);

  if (abiturientPosition === -1) return null;

  const abiturientDeletable = ABITURIENT[abiturientPosition]!;

  ABITURIENT.splice(abiturientPosition, 1);
  return abiturientDeletable;
};

const updateById = async ({ id, lastName, firstName, numCertificate }: TAbiturientModel): Promise<TAbiturientModel | null> => {
  const abiturientPosition = ABITURIENT.findIndex((abiturient) => abiturient.id === id);

  if (abiturientPosition === -1) return null;

  const oldAbiturient = ABITURIENT[abiturientPosition]!;
  const newAbiturient = { ...oldAbiturient, lastName, firstName, numCertificate };

  ABITURIENT.splice(abiturientPosition, 1, newAbiturient);
  return newAbiturient;
};

export default {
  ABITURIENT,
  getAll,
  getById,
  createAbiturinet,
  deleteById,
  updateById,
};