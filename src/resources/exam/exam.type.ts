export interface TExam {
    subject : string;
    date: number;
    score : string;
    abiturientId: string | null;
    teacherId: string | null;
  }
  
  export interface TExamModel extends TExam {
    id: string;
  }