import { v4 as uuid } from 'uuid';

import { TTeacherModel } from './teacher.type';

class Teacher {

  id: string;

  lastName: string;

  firstName: string;

  degree: string;

  constructor({
    id = uuid(),
    lastName = 'LASTNAME',
    firstName = 'FIRSTNAME',
    degree = 'DEGREE',
  } = {}) {
    this.id = id;
    this.lastName =lastName;
    this.firstName = firstName;
    this.degree = degree;
  }

  static toResponse(teacher: TTeacherModel) {
    const { id, lastName, firstName, degree } = teacher;
    return { id, lastName, firstName, degree};
  }
}

export default Teacher;