const uuid = require("uuid");
const User = require("./User");
// const User = require("./User");
const questions = require("../data");
class Questions {
  static allQuestions = [];
  static questionNumber = 1;
  constructor(tech, details, complexity, options, correctAnswer) {
    this.questionNumber = Questions.questionNumber++;
    this.tech = tech;
    this.id = uuid.v4();
    this.details = details;
    this.complexity = complexity;
    this.correctAnswer = correctAnswer;
    this.selectedAnswer;
    this.isActive = true;
    this.options = options;
    this.score = 0;
    this.outOfMark = 0;
    this.negativeMark = 0.25 * this.outOfMark;
  }
  static createQuestion(tech, details, complexity, options, correctAnswer) {
    // console.log(User.allUsers.length + "}");
    const newQuestion = new Questions(
      tech,
      details,
      complexity,
      options,
      correctAnswer
    );

    if (complexity >= 8) {
      Questions.updateMarks(newQuestion, 10);
    } else if (complexity > 4) {
      Questions.updateMarks(newQuestion, 6);
    } else {
      Questions.updateMarks(newQuestion, 2);
    }
    // for (let i = 0; i < User.allUsers.length; i++) {
    //   User.allUsers[i].updateTest(newQuestion);
    // }
    questions.push(newQuestion);
    return newQuestion;
  }
  markQuestion(choosenOption) {
    this.selectedAnswer = choosenOption;

    if (choosenOption == this.correctAnswer) {
      this.score += this.outOfMark;
      return this.outOfMark;
    }
    this.score += this.negativeMark;
    return this.negativeMark;
  }
  static updateMarks(newQuestion, compMarks) {
    newQuestion.outOfMark = newQuestion.outOfMark + compMarks;
    newQuestion.negativeMark = -newQuestion.outOfMark * 0.25;
  }
  static deleteQuestion(questionNum) {
    // console.log(User.allUsers.length + "?");
    let [isQuestionExists, index] = Questions.findQuestion(questionNum + 1);

    if (!isQuestionExists) {
      return "question not found";
    }
    // console.log(questions[questionNum]);
    questions[questionNum].isActive = false;
    // console.log(User.allUsers.length + "???");

    return "Question deleted";
  }
  static findQuestion(questionNum) {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].questionNumber == questionNum) {
        return [true, i];
      }
    }
    return [false, null];
  }
  static findQues(questionId) {
    for (let i = 0; i < questions.length; i++) {
      console.log(questions[i].id);
      console.log(questionId);
      if (questions[i].id == questionId) {
        return [true, i];
      }
    }
    return [false, null];
  }
  insertQuestion(question) {
    if (this.tech == question.tech) {
      this.question.push(question);
      this.outOfScore += question.outOfMark;
    }
  }
  return;
}
module.exports = { Questions };
