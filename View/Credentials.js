const bcrypt = require("bcrypt");
// const { User } = require("./User");
class Credentials {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  static async createCredentials(username, password) {
    const newpassword = await bcrypt.hash(password, 10);
    const newCredentials = new Credentials(username, newpassword);
    return newCredentials;
  }

  static async comparePassword(password, encryptedPassword) {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
module.exports = { Credentials };
