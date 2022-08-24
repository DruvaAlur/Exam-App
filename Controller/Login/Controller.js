const User = require("../../View/User");
const { JWTPayload } = require("../../View/Authentication.js");
const { Credentials } = require("../../View/Credentials.js");
async function login(req, resp) {
  const { username, password } = req.body;
  // console.log(username);
  if (username == null || password == null) {
    resp.status(400).send("please send all required parameters");
    return;
  }

  let [isUserExists, indexOfUser] = User.findUser(username);
  // console.log(User.allUsers);
  // console.log(isUserExists + "////////////////////");
  // console.log(isUserExists);
  // if (!isUserExists) {
  //   resp.status(400).send("user not exists");
  // }
  // console.log(User.allUsers);

  if (
    !isUserExists ||
    !(await Credentials.comparePassword(
      password,
      User.allUsers[indexOfUser].credentials.password
    ))
  ) {
    return resp.status(400).send("Invalid Credentials");
  }
  const newPayload = new JWTPayload(User.allUsers[indexOfUser]);
  // console.log(newPayload);
  const newToken = newPayload.createToken();
  // console.log(newToken);
  resp.cookie("myToken", newToken);
  // console.log(User.allUsers);
  return resp.status(200).send(User.allUsers[indexOfUser]);
}
module.exports = { login };
