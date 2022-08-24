const { Questions } = require("./Questions");
const uuid = require("uuid");
const questions = require("../data");
class Tests {
  static testNo = 1;
  static allTests = [];
  constructor(tech) {
    this.id = uuid.v4();
    this.testNo = Tests.testNo++;
    this.tech = tech;
    this.questions = [];
    this.outOfScore = 0;
    this.score = 0;
    this.isAttempted = false;
  }
  static createTest(tech) {
    const newTest = new Tests(tech);

    newTest.createQuestions();
    return newTest;
  }
  createQuestions() {
    // console.log(questions);
    this.questions = [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].tech == this.tech) {
        this.questions.push(questions[i]);
      }
    }
  }
  attemptQuestion(questionNum, choosenOption) {
    // console.log("|||||||||||||||||||||||");
    // console.log(questionNum + "======");
    // console.log(choosenOption + "}}}}}}");
    this.score += this.questions[questionNum].markQuestion(choosenOption);
    this.outOfScore += this.questions[questionNum].outOfMark;

    return [this.score, this.outOfScore];
  }

  static findTechIndex(tech) {
    for (let i = 0; i < Tests.allTests.length; i++) {
      if (Tests.allTests[i].tech == tech) {
        return [i, true];
      }
    }
    return [null, false];
  } // areQuestions() {
  //   if (this.questions.length == 0) {
  //     return false;
  //   }
  //   return true;
  // }
  startTest() {
    this.isAttempted = true;
  }

  static getTest(stack) {
    let newTest = [];
    // console.log(Tests.allTest);
    for (let i = 0; i < Tests.allTests.length; i++) {
      if (
        Tests.allTests[i].tech == stack.frontend ||
        Tests.allTests[i].tech == stack.backend ||
        Tests.allTests[i].tech == stack.dataBase
      )
        newTest.push(Tests.allTests[i]);
    }
    return newTest;
  }

  // addQuestion(question) {
  //   this.questions.push(
  //     new Question(
  //       question.technology,
  //       question.detail,
  //       question.options,
  //       question.correctOption + 1,
  //       question.complexity
  //     )
  //   );
  //   return;
  // }
}
module.exports = { Tests };
