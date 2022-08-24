const { Questions } = require("../../view/Questions");
const User = require("../../View/User");
const { Tests } = require("../../View/Tests");
const { JWTPayload } = require("../../view/Authentication.js");
const questions = require("../../data");
function createQuestion(req, resp) {
  // console.log(User.allUsers);
  if (!JWTPayload.isValidAdmin(req, resp)) {
    // return resp.status(400).send("not valid admin");
  }
  const { tech, details, complexity, options, correctAnswer } = req.body;
  if (
    (tech == null || details == null || complexity == null,
    correctAnswer == null)
  ) {
    return resp.status(400).send("please send all required parameters");
  }
  console.log(options);
  const newQuestion = Questions.createQuestion(
    tech,
    details,
    complexity,
    options,
    correctAnswer
  );
  // console.log(User.allUsers);

  let [index, isTestExists] = Tests.findTechIndex(tech);
  if (!isTestExists) {
    const newTest = new Tests(tech);
    Tests.allTests.push(newTest);
    Tests.allTests[Tests.allTests.length - 1].createQuestions(newQuestion);
    for (let i = 0; i < User.allUsers.length; i++) {
      User.allUsers[i].updateTest(Tests.allTests[Tests.allTests.length - 1]);
    }
  }
  // index = Tests.allTests.length - 1;
  // console.log(index);
  else {
    Tests.allTests[index].createQuestions(newQuestion);

    for (let i = 0; i < User.allUsers.length; i++) {
      User.allUsers[i].updateTest(Tests.allTests[index]);
    }
  }
  resp.status(201).send("Questions created");
}
// const findTest = (arrayToBeSearched, technology) => {
//   let isTestPresent = false;
//   let indexOfTest = -1;

//   for (let i in arrayToBeSearched) {
//     if (arrayToBeSearched[i].technology == technology) {
//       isTestPresent = true;
//       indexOfTest = i;
//       break;
//     }
//   }
//   return [isTestPresent, indexOfTest];
// };
function deleteQuestion(req, resp) {
  if (!JWTPayload.isValidAdmin(req, resp)) {
    // return resp.status(400).send("not valid admin");
  }
  const { questionNo } = req.body;
  // console.log(User.allUsers.length + "}}");
  let a = Questions.deleteQuestion(questionNo - 1);
  // console.log(User.allUsers.length + ";';';';");
  // for (let i = 0; i < User.allUsers.length; i++) {
  //   User.allUsers[i].updateTest(questions[questionNo - 1]);
  // }
  resp.status(401).send(a);
}
function getQuestions(req, resp) {
  if (!JWTPayload.isValidUser(req, resp)) {
    // return resp.status(400).send("not valid admin");
  }
  const { username } = req.params;
  const techName = req.body.techName;
  const [isUserExists, indexOfUser] = User.findUser(username);
  if (!isUserExists) {
    return resp.status(401).send("User not exists");
  }
  const [isTechExists, indexOfTech] =
    User.allUsers[indexOfUser].findTech(techName);
  if (!isTechExists) {
    return resp.status(401).send("selected Tests tech is not in your stack");
  }
  resp
    .status(201)
    .send(User.allUsers[indexOfUser].tests[indexOfTech].questions);
}
function getAllQuestions(req, resp) {
  resp.status(201).send(questions);
}
function toogleActiveFlagOfQuestion(req, resp) {
  const questionId = req.body.questionId;
  const [isQuestionExists, questionIndex] = Questions.findQues(questionId);
  if (!isQuestionExists) {
    return resp.status(401).send("Question doesnt exists");
  }
  questions[questionIndex].isActive = !questions[questionIndex].isActive;
  resp.status(201).send("toogle successfull");
}
module.exports = {
  createQuestion,
  deleteQuestion,
  getQuestions,
  getAllQuestions,
  toogleActiveFlagOfQuestion,
};
