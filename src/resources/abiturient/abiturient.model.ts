import { v4 as uuid } from 'uuid';

import { TAbiturientModel, TAbiturientPartial } from './abiturient.type';

class Abiturient {
  id: string;

  lastName: string;

  firstName: string;

  numCertificate: number;

  constructor({ lastName = 'LASTNAME', firstName = 'FIRSTNAME', numCertificate = 1 }: TAbiturientPartial = {}) {
    this.id = uuid();
    this.lastName = lastName;
    this.firstName = firstName;
    this.numCertificate = numCertificate;
  }
  
  static toResponse(abiturient: TAbiturientModel): TAbiturientModel {
    const { id, lastName, firstName, numCertificate } = abiturient;
    return { id, lastName, firstName, numCertificate  };
  }
}

export default Abiturient;
