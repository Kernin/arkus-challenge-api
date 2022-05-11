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

Team.getAll = (result) => {
  const query = `SELECT a.name as account_name,u.name as user_name, t.email, t.name as team_name, t.init_date, t.end_date 
  FROM team as t, user as u, account as a 
  WHERE t.email = u.email and a.id = t.account_id`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("teams: ", res);
    result(null, res);
  });
};

Team.getTeamMembers = (id, result) => {
  const query = `SELECT u.name, u.email FROM user AS u 
  WHERE EXISTS 
  (SELECT t.account_id FROM team as t 
    WHERE t.account_id ='${id}'  AND t.email = u.email 
    AND t.end_date = '0000-00-00 00:00:00')`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("team members: ", res);
    result(null, res);
  });
};

Team.getTeamName = (id, result) => {
  const query = `SELECT DISTINCT name FROM team WHERE account_id ='${id}'`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("team's name: ", res[0]);
    result(null, res[0]);
  });
};

Team.updateTeam = (newTeam, teamName, accountId, result) => {
  const values = newTeam.map((member) => Object.values(member));
  const emails = newTeam.map(({ email }) => email);
  let query = `UPDATE team SET name = ?  WHERE account_id = ?`;
  sql.query(query, [teamName, accountId]);
  const endDate = new Date();

  query = `UPDATE team SET end_date = ? 
  WHERE email NOT IN (?) AND account_id = ? `;
  sql.query(query, [endDate, emails, accountId]);

  query = `INSERT IGNORE INTO team (email, account_id, init_date, end_date, name) VALUES ?`;

  sql.query(query, [values], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("updated team: ", { id: res.insertId, ...newTeam });
    result(null, { id: res.insertId, ...newTeam });
  });
};

module.exports = Team;
