const { Credentials } = require("./Credentials");
const { Stack } = require("./Stack");
const { Tests } = require("./Tests");
const { _ } = require("lodash");
class User {
  static allUsers = [];
  static id = 1;
  constructor(credentials, fname, lname, role, exper, stack, country, test) {
    this.id = User.id++;
    this.credentials = credentials;
    this.fname = fname;
    this.lname = lname;
    this.role = role;
    this.exper = exper;
    this.country = country;
    this.stack = stack;
    this.tests = test;
    this.score = 0;
    this.outOfScore = 0;
    this.isActive = true;
  }
  static async createAdmin() {
    const username = "druva123";
    const password = "druva@123";
    const fname = "druva";
    const lname = "alur";
    const role = "admin";
    const exper = "2";
    const frontend = "react";
    const backend = "node";
    const database = "mongo db";
    const country = "India";

    // console.log(Credential.createCredential(userName, password));
    const newCredential = await Credentials.createCredentials(
      username,
      password
    );

    let newStack = new Stack(frontend, backend, database);
    // console.log(newCredential.userName);

    // console.log(admin);
    let test = Tests.getTest(newStack);
    const admin = new User(
      newCredential,
      fname,
      lname,
      role,
      exper,
      newStack,
      country,
      test
    );
    User.allUsers.push(admin);
    // User.allUsers.push(admin);
    // console.log(User.allUsers);
    return admin;
  }
  async createUser(
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
  ) {
    for (let i = 0; i < User.allUsers.length; i++) {
      if (User.allUsers[i].credentials.username == username) {
        return "Username already exists";
      }
    }
    let newCredentials = await Credentials.createCredentials(
      username,
      password
    );
    // console.log(newCredentials);
    let newStack = new Stack(frontend, backend, database);

    // user.addtest
    let test = Tests.getTest(newStack);
    let newUser = new User(
      newCredentials,
      fname,
      lname,
      role,
      exper,
      newStack,
      country,
      test
    );
    // console.(newUser);
    User.allUsers.push(newUser);

    return newUser;
  }
  createTest(stack) {
    const test1 = Tests.createTest(stack.frontend);
    const test2 = Tests.createTest(stack.backend);
    const test3 = Tests.createTest(stack.database);
    Tests.allTests.push(test1);
    Tests.allTests.push(test2);
    Tests.allTests.push(test3);
    this.tests.push();
    this.tests.push();
    this.tests.push();
  }
  // addTests(){
  //   for(let i in testArray){
  //     if(testArray[i].technology == this.stack.frontend
  //         || testArray[i].technology == this.stack.backend
  //         || testArray[i].technology == this.stack.database){
  //       let newTest = new Test(testArray[i].technology)
  //       for(let j in testArray[i].questions){
  //         newTest.addQuestion(testArray[i].questions[j])
  //       }
  //       newTest.outOfScore = newTest.calculateOutOfScore()
  //       this.tests.push(newTest)
  //     }
  //     if(this.tests.length==3){
  //       break
  //     }
  //   }
  //   return
  // }
  // updateTest(test) {
  //   this.tests = [];
  //   if (
  //     this.stack.frontend == test.tech ||
  //     this.stack.backend == test.tech ||
  //     this.stack.database == test.tech
  //   ) {
  //     // console.log("??????????????????????????");
  //     this.tests.push(_.cloneDeep(test));
  //   }
  // }
  updateTest(test) {
    if (this.stack.frontend == test.tech) {
      if (this.tests[0] != null) {
        if (!this.tests[0].isAttempted) {
          this.tests[0] = _.cloneDeep(test);
        }
      } else {
        this.tests[0] = _.cloneDeep(test);
      }
    }
    if (this.stack.backend == test.tech) {
      if (this.tests[1] != null) {
        if (!this.tests[1].isAttempted) {
          this.tests[1] = _.cloneDeep(test);
        }
      } else {
        this.tests[1] = _.cloneDeep(test);
      }
    }
    if (this.stack.database == test.tech) {
      if (this.tests[2] != null) {
        if (!this.tests[2].isAttempted) {
          this.tests[2] = _.cloneDeep(test);
        }
      } else {
        this.tests[2] = _.cloneDeep(test);
      }
    }
  }
  findTech(techName) {
    console.log("in findtech");
    if (
      !(
        this.stack.frontend == techName ||
        this.stack.backend == techName ||
        this.stack.database == techName
      )
    ) {
      return [false, null];
    }
    console.log(techName);
    console.log("in findtech1");
    console.log(this.tests[0].tech);
    for (let i = 0; i < this.tests.length; i++) {
      if (this.tests[i].tech == techName) {
        return [true, i];
      }
    }
    return [false, null];
  }
  static findUser(username) {
    // console.log(username + "+++++++++++++++++++++++");
    // console.log(User.allUsers);
    for (let i = 0; i < User.allUsers.length; i++) {
      //   console.log(User.allUsers[i].credentials.username);
      //   console.log(username);
      if (User.allUsers[i].credentials.username == username) {
        return [true, i];
      }
    }
    return [false, null];
  }
  static getAllUsers() {
    let users = [];
    for (let i = 0; i < User.allUsers.length; i++) {
      if (User.allUsers[i].role != "admin") {
        users.push(User.allUsers[i]);
      }
    }
    return users;
  }
  attemptTest(testNum, questionNum, choosenOption) {
    // console.log(this.tests[testNum]);
    // if(!this.tests[testNum].areQuestions()){
    //     return false
    // }
    // console.log(this.tests[testNum]);questionNum,choosenOption
    // console.log(this.tests[testNum]);
    let [score, outofscore] = this.tests[testNum].attemptQuestion(
      questionNum,
      choosenOption
    );
    this.score += score;
    this.outOfScore += outofscore;
    // console.log(score);
    // console.log(outofscore);
    return [score, outofscore];
  }
  // static findTest(techName){
  //   for(let i=0;i<Tests.allTests.length;i++){
  //     if(Tests.allTests[i].tech==techName){
  //       return i
  //     }
  //   }
  // }
}
module.exports = User;
