const sql = require("../db.js");

const Manager = function (user) {
  this.email = user.email;
  this.account_id = user.id;
};

Manager.create = (newManager, result) => {
  sql.query("INSERT INTO accountmanager SET ?", newManager, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("manager assigned: ", { id: res.insertId, ...newManager });
    result(null, { id: res.insertId, ...newManager });
  });
};

Manager.getAvailableUsers = (result) => {
  let query = `SELECT name, email FROM user WHERE 
  NOT EXISTS (
    SELECT email FROM accountmanager WHERE user.email = accountmanager.email)
    AND user.role != 'super_admin'`;
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

Manager.getAccountManager = (accountId, result) => {
  let query = `SELECT u.name, u.email FROM user AS u 
  WHERE EXISTS 
  (SELECT ac.account_id FROM accountmanager as ac 
    WHERE ac.account_id ='${accountId}'  AND ac.email = u.email)`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("manager: ", res[0]);
    result(null, res[0]);
  });
};

Manager.remove = (manager, result) => {
  const { email, account_id: accountId } = manager;

  sql.query(
    "DELETE FROM accountmanager WHERE email = ? AND account_id = ?",
    [email, accountId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted manager with email: ", email);
      result(null, res);
    }
  );
};

module.exports = Manager;
