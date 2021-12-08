const { v4: uuid } = require('uuid');

class Teacher {
  constructor({
    id = uuid(),
    lastName = 'LASTNAME',
    firstName = 'FIRSTNAME',
    degree = 'DEGREE',
  } = {}) {
    this.id = id;
    this.lastName = lastName;
    this.firstName =firstName;
    this.degree = degree;
  }

  static toResponse(teacher) {
    const { id, lastName, firstName, degree } = teacher;
    return { id, name, login };
  }
}

module.exports = Teacher;
