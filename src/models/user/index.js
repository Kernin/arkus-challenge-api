const sql = require("../db.js");

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.english_level = user.english_level;
  this.url_cv = user.url_cv;
  this.tech_knowledge = user.tech_knowledge;
  this.role = user.role;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

User.getAll = (result) => {
  const query = "SELECT * FROM user";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
};

module.exports = User;
