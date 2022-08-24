const User = require("../../View/User");
const { JWTPayload } = require("../../View/Authentication");
function attemptTestQBQ(req, resp) {
  // find user and call attemp test and mark test attempted

  const { username, techName } = req.params;
  const { questionNum, choosenOption } = req.body;
  let [isUserExists, userIndex] = User.findUser(username);
  // console.log(isUserExists);
  if (!isUserExists) {
    // return resp.status(201).send("user doesnt exists");
  }
  let [isTechExists, testIndex] = User.allUsers[userIndex].findTech(techName);
  if (!isTechExists) {
    return resp.status(201).send("User doest have specified tech in his stack");
  }
  let [score, outofscore] = User.allUsers[userIndex].attemptTest(
    testIndex,
    questionNum - 1,
    choosenOption
  );
  resp
    .status(401)
    .send(
      "Score:" +
        score.toString() +
        " " +
        "Out of Score:" +
        outofscore.toString()
    );
}
function attemptTest(req, resp) {
  if (!JWTPayload.isValidUser(req, resp)) {
    // return resp.status(400).send("not valid admin");
    return;
  }
  let score = 0;
  let outofscore = 0;
  const { username, techName } = req.params;
  let { markedOptions } = req.body;
  console.log("_________******_________");
  console.log(username);
  console.log(techName);
  console.log(markedOptions);
  let [isUserExists, userIndex] = User.findUser(username);
  // console.log(isUserExists);
  if (!isUserExists) {
    return resp.status(201).send("user doesnt exists");
  }

  let [isTechExists, testIndex] = User.allUsers[userIndex].findTech(techName);
  if (!isTechExists) {
    return resp.status(201).send("User doest have specified tech in his stack");
  }
  if (User.allUsers[userIndex].tests[testIndex].isAttempted) {
    return resp.status(401).send("Test already atempted");
  }
  if (
    markedOptions.length !=
    User.allUsers[userIndex].tests[testIndex].questions.length
  ) {
    return resp.status(401).send("please mark all options");
  }
  // console.log(markedOptions);
  for (let i = 0; i < markedOptions.length; i++) {
    let [tmpscore, tmpoutofscore] = User.allUsers[userIndex].attemptTest(
      testIndex,
      i,
      markedOptions[i]
    );
    score = score + tmpscore;
    outofscore = outofscore + tmpoutofscore;
  }
  User.allUsers[userIndex].tests[testIndex].isAttempted = true;
  resp
    .status(201)
    .send(
      "Score:" +
        score.toString() +
        " " +
        "Out of Score:" +
        outofscore.toString()
    );
}
function getTests(req, resp) {
  const { username } = req.params;
  console.log(username);
  let [isUserExists, userIndex] = User.findUser(username);
  // console.log(isUserExists);
  if (!isUserExists) {
    return resp.status(401).send("user doesnt exists");
  }
  console.log(User.allUsers[userIndex].tests);
  resp.status(201).send(User.allUsers[userIndex].tests);
}
module.exports = { attemptTestQBQ, attemptTest, getTests };
