import { v4 as uuid } from 'uuid';

import { TExamModel, TExam } from './exam.type';

class Exam {
 
  id: string;

  subject: string;

  date: number;

  score: string;

  abiturientId: string | null;

  teacherId: string | null;


  constructor({
    subject = 'SUBJECT',
    date = 22.02,
    score = 'SCORE',
    abiturientId = null,
    teacherId = null,

  }: Partial<TExam> = {}) {
    this.id = uuid();
    this.subject = subject;
    this.date = date;
    this.score = score;
    this.abiturientId = abiturientId;
    this.teacherId = teacherId;
    
  }

  static toResponse(task: TExamModel): TExamModel {
    const { id, subject, date, score, abiturientId, teacherId } = task;
    return {id, subject, date, score, abiturientId, teacherId};
  }
}

export default Exam;