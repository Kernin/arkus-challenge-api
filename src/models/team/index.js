const { query } = require("express");
const sql = require("../db.js");

const Team = function (member) {
  this.email = member.email;
  this.account_id = member.account_id;
  this.init_date = member.init_date;
  this.end_date = member.end_date;
  this.name = member.name;
};

Team.create = (newTeam, result) => {
  const values = newTeam.map((member) => Object.values(member));
  console.log(values);
  const query =
    "INSERT IGNORE INTO team (email, account_id, init_date, end_date, name) VALUES ?";

  sql.query(query, [values], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created team: ", { id: res.insertId, ...newTeam });
    result(null, { id: res.insertId, ...newTeam });
  });
};

module.exports = Team;
