const { Questions } = require("../../view/Questions");
const User = require("../../View/User");
const { JWTPayload } = require("../../view/Authentication.js");

async function createUser(req, resp) {
  const isValidAdmin = JWTPayload.isValidAdmin(req, resp);

  if (!isValidAdmin) {
    return;
  }
  const {
    username,
    password,
    fname,
    lname,
    role,
    exper,
    frontend,
    backend,
    database,
    country,
  } = req.body;
  if (
    username == null ||
    password == null ||
    lname == null ||
    fname == null ||
    role == null ||
    exper == null ||
    frontend == null ||
    backend == null ||
    database == null ||
    country == null
  ) {
    return resp.status(400).send("please send all required parameters");
  }
  let newUser = await admin.createUser(
    username,
    password,
    fname,
    lname,
    role,
    exper,
    frontend,
    backend,
    database,
    country
  );

  resp.status(201).send(newUser);
}
function getUsers(req, resp) {
  if (!JWTPayload.isValidAdmin(req, resp)) {
    // return resp.status(400).send("not valid admin");
  }
  resp.status(201).send(User.getAllUsers());
}
function updateUser(req, resp) {
  if (!JWTPayload.isValidUser(req, resp)) {
    // return resp.status(400).send("not valid user");
  }
  const { username } = req.params;
  const { newusername } = req.body;
  let [isUserExists, indexOfUser] = User.findUser(newusername);
  if (isUserExists) {
    return resp
      .status(201)
      .send("given new username already exists choose other");
  }
  [isUserExists, indexOfUser] = User.findUser(username);

  if (!isUserExists) {
    return resp.status(201).send("user not exists");
  }

  User.allUsers[indexOfUser].credentials.username = newusername;
  return resp.status(201).send(newusername);
}
function getUserScore(req, resp) {
  if (!JWTPayload.isValidUser(req, resp)) {
    // return resp.status(400).send("not valid admin");
  }
  const { username } = req.params;
  const [isUserExists, indexOfUser] = User.findUser(username);
  if (!isUserExists) {
    return resp.status(201).send("user not exists");
  }
  resp
    .status(401)
    .send(
      "User score: " +
        User.allUsers[indexOfUser].score.toString() +
        "out of: " +
        User.allUsers[indexOfUser].outOfScore.toString()
    );
}
function getTestScore(req, resp) {
  if (!JWTPayload.isValidUser(req, resp)) {
    // return resp.status(400).send("not valid admin");
  }
  const { username, techName } = req.params;

  const [isUserExists, indexOfUser] = User.findUser(username);
  if (!isUserExists) {
    return resp.status(201).send("user not exists");
  }
  let [isTechExists, TechIndex] = User.allUsers[indexOfUser].findTech(techName);
  if (!isTechExists) {
    return resp
      .status(401)
      .send("User doent have specified tech in their stack");
  }
  // console.log(TechIndex);
  // console.log(User.allUsers[indexOfUser].tests[0]);
  resp
    .status(401)
    .send(
      "User score: " +
        User.allUsers[indexOfUser].tests[TechIndex].score.toString() +
        "out of: " +
        User.allUsers[indexOfUser].tests[TechIndex].outOfScore.toString()
    );
}
function getTechStack() {
  const { username } = req.params;
  let [isUserExists, userIndex] = User.findUser(username);
  if (!isUserExists) {
    return resp.status(401).send("user doesnt exists");
  }
  console.log(User.allUsers[userIndex].stack);
  let tempstack = [];
  console.log(User.allUsers[userIndex].stack);
  tempstack.push(
    User.allUsers[userIndex].stack.frontend,
    User.allUsers[userIndex].stack.backend,
    User.allUsers[userIndex].stack.database
  );
  return resp.status(201).send(tempstack);
}
module.exports = {
  createUser,
  getUsers,
  getUserScore,
  getTestScore,
  updateUser,
  getTechStack,
};
