const { v4: uuid } = require('uuid');

class Exam {
  constructor({
    id = uuid(),
    subject = 'SUBJECT',
    abiturientId = null,
    teacherId = null,
    date = 'DATE',
    score = 2,
  } = {}) {
    this.id = id;
    this.subject = subject;
    this.abiturientId = abiturientId;
    this.teacherId = teacherId;
    this.date = date;
    this.score = score;
  }

  static toResponse(exam) {
    const { id, subject, abiturientId, teacherId, date, score } = exam;
    return { id, subject, abiturientId, teacherId, date, score };
  }
}

module.exports = Exam;
