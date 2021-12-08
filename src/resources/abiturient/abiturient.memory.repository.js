const Abiturient = require('./abiturient.model');

const getAll = async () => Abiturient;

const getById = async (id) => Abiturient.find((abiturient) => abiturient.id === id);

const createBoard = async ({ id, lastName, firstName, numCertificate}) => {
  const menu = new Menu({ id, lastName, firstName, numCertificate });
  Abiturient.push(abiturient);
  return menu;
};

const deleteById = async (id) => {
  const abiturientPosition = Abiturient.findIndex((abiturient) => abiturient.id === id);

  if (abiturientPosition === -1) return null;

  const abiturientDeletable = Abiturient[abiturientPosition];

  Abiturient.splice(abiturientPosition, 1);
  return abiturientDeletable;
};

const updateById = async ({ id, lastName, firstName, numCertificate }) => {
  const abiturientPosition = Abiturient.findIndex((abiturient) => abiturient.id === id);

  if (abiturientPosition === -1) return null;

  const oldAbiturient = Abiturient[abiturientPosition];
  const newAbiturient = { ...oldAbiturient, lastName, firstName, numCertificate };

  Abiturient.splice(abiturientPosition, 1, newAbiturient);
  return newAbiturient;
};

module.exports = {
  Abiturient,
  getAll,
  getById,
  createBoard,
  deleteById,
  updateById,
};
