const sql = require("../db.js");

const Account = function (account) {
  this.id = account.id;
  this.name = account.name;
  this.client_name = account.client_name;
  this.manager_name = account.manager_name;
  this.manager_email = account.manager_email;
  this.team_name = account.team_name;
};

Account.create = (newAccount, result) => {
  const { name: accountName, client_name: clientName } = newAccount;
  sql.query(
    "INSERT INTO account SET name = ?, client_name = ?",
    [accountName, clientName],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created account: ", {  ...newAccount,id: res.insertId });
      result(null, { ...newAccount,id: res.insertId,  });
    }
  );
};

Account.remove = (accountId, result) => {
  sql.query("DELETE FROM account WHERE id = ?", accountId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted account with id: ", accountId);
    result(null, res);
  });
};

Account.getAll = (result) => {
  let query = `SELECT m.id, m.name, m.client_name, m.manager_name, m.email, m.team_name FROM (
    SELECT a.id, u.name as manager_name, ac.email, ac.account_id, a.name, a.client_name, t.name as team_name
    FROM accountmanager as ac, account as a, user as u, team as t
    WHERE ac.account_id = a.id AND ac.email = u.email AND t.account_id = a.id
  ) as m

UNION

SELECT DISTINCT m.id, m.name, m.client_name, Null as manager_name, Null as email, Null as team_name FROM (
    SELECT a.id, u.name as manager_name, ac.email, ac.account_id, a.name, a.client_name, t.name as team_name
    FROM accountmanager as ac, account as a, user as u, team as t
    WHERE ac.account_id != a.id AND ac.email != u.email AND t.account_id != a.id
  ) as m GROUP BY m.id`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("accounts: ", res);
    result(null, res);
  });
};

Account.findById = (id, result) => {
  const query = `SELECT a.name, a.client_name, team.has_team FROM account as a, (
    SELECT IF(COUNT(1) = 1, 'true', 'false') AS has_team
    FROM team
    WHERE account_id = '${id}'
) as team WHERE id = '${id}'`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found account: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Account.getAllAssigned = (result) => {
  let query =
    "SELECT m.id, m.name, m.client_name, m.manager_name, m.email, m.team_name FROM (" +
    "SELECT a.id, u.name as manager_name, ac.email, ac.account_id, a.name, a.client_name, t.name as team_name " +
    "FROM accountmanager as ac, account as a, user as u, team as t " +
    "WHERE ac.account_id = a.id AND ac.email = u.email AND t.account_id = a.id" +
    ") as m";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("accounts: ", res);
    result(null, res);
  });
};

Account.updateById = (account, result) => {
  const { name: accountName, client_name: clientName, id } = account;
  sql.query(
    "UPDATE account SET name = ?, client_name = ? WHERE id = ?",
    [accountName, clientName, id],
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
      console.log("updated account: ", { id, ...account });
      result(null, { ...account });
    }
  );
};

module.exports = Account;
