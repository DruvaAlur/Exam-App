const jwt = require("jsonwebtoken");
class JWTPayload {
  static secratekey = "strongPassword";
  constructor(user) {
    this.username = user.credentials.username;
    this.role = user.role;
  }
  createToken() {
    return jwt.sign(JSON.stringify(this), JWTPayload.secratekey);
  }
  static verifyCookie(token) {
    return jwt.verify(token, JWTPayload.secratekey);
  }
  static isValidUser(req, resp) {
    const myToken = req.cookies["myToken"];
    // console.log(myToken);
    if (!myToken) {
      resp.status(401).send("Login required");
      return false;
    }

    const newPayload = JWTPayload.verifyCookie(myToken);
    // console.log(newPayload.isActive);
    // if (!newPayload.isActive) {
    //   resp.status(400).send("user not active");
    //   return false;
    // }

    if (newPayload.username != req.params.username) {
      resp.status(401).send("unauthorized access");
      return false;
    }
    return true;
  }

  static isValidAdmin(req, resp) {
    const myToken = req.cookies["myToken"];
    // console.log(myToken);
    // console.log(myToken);
    if (!myToken) {
      return resp.status(401).send("Admin Login Required");
    }

    const newPayload = JWTPayload.verifyCookie(myToken);

    if (newPayload.role != "admin") {
      resp.status(401).send("Admin Login Required");
      return false;
    }
    // console.log(newPayload);
    // console.log(req.params.username + "+++++++++++++++++++");

    // if (newPayload.username != req.params.username) {
    //   resp.status(401).send("unauthorized access");
    //   return false;
    // }
    return true;
  }
}
module.exports = { JWTPayload };
