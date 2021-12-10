   export interface TAbiturient {
    lastName: string;
    firstName: string;
    numCertificate: number;
  }
  
  export interface TAbiturientPartial extends Partial<TAbiturient> {}
  
  export interface TAbiturientModel extends TAbiturient {
    id: string;
  }