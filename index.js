const User = require("./View/User");
const { Questions } = require("./View/Questions.js");
const {
  attemptTestQBQ,
  attemptTest,
  getTests,
} = require("./Controller/Test/Controller");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const {
  createUser,
  getUsers,
  getUserScore,
  getTestScore,
  updateUser,
  getTechStack,
} = require("./Controller/User/Controller.js");
const {
  createQuestion,
  deleteQuestion,
  getQuestions,
  getAllQuestions,
  toogleActiveFlagOfQuestion,
} = require("./Controller/Questions/Controller.js");
const { login } = require("./Controller/Login/Controller.js");
const { logout } = require("./Controller/Logout/Controller.js");
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

async function createAdmin() {
  admin = await User.createAdmin();
}
app.post("/api/v1/updateUser/:username", (req, resp) => {
  updateUser(req, resp);
});

app.post("/api/v1/getTechStack/:username", (req, resp) => {
  getTechStack(req, resp);
});
app.post("/api/v1/getTests/:username", (req, resp) => {
  console.log("in tests");
  getTests(req, resp);
});

app.post("/api/v1/createUser/:username", async (req, resp) => {
  await createUser(req, resp);
});

app.get("/api/v1/getUsers", (req, resp) => {
  getUsers(req, resp);
});

app.post("/api/v1/getQuestions/:username", (req, resp) => {
  getQuestions(req, resp);
});
app.get("/api/v1/getAllQuestions", (req, resp) => {
  getAllQuestions(req, resp);
});
app.get("/api/v1/getUserScore/:username", (req, resp) => {
  getUserScore(req, resp);
});

app.get("/api/v1/getTestScore/:username/:techName", (req, resp) => {
  getTestScore(req, resp);
});

app.post("/api/v1/toogleActiveFlagOfQuestion", (req, resp) => {
  toogleActiveFlagOfQuestion(req, resp);
});

app.post("/api/v1/login", (req, resp) => {
  console.log("in login");
  login(req, resp);
});

app.post("/api/v1/logout", (req, resp) => {
  logout(req, resp);
});

app.post("/api/v1/createQuestions", (req, resp) => {
  createQuestion(req, resp);
});

app.post("/api/v1/attemptTestQBQ/:username/:techName", (req, resp) => {
  attemptTestQBQ(req, resp);
});

app.post("/api/v1/attemptTest/:username/:techName", (req, resp) => {
  attemptTest(req, resp);
});

app.post("/api/v1/deleteQuestion", (req, resp) => {
  deleteQuestion(req, resp);
});

app.listen(8800, async () => {
  await createAdmin();
  console.log("app started at port 8800");
});
