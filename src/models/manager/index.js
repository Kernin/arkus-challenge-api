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
