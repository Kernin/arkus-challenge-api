const Manager = require("../../../models/manager");
const Team = require("../../../models/team");

module.exports.assignManager = function (id, managerEmail, response) {
  const newManager = new Manager({ email: managerEmail, id });
  Manager.create(newManager, (err, data) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        response.status(400).send({
          message: "Manager already assigned.",
        });
      } else {
        response.status(500).send({
          message:
            err.message || "Some error occurred while creating the Manager.",
        });
      }
    }
  });
};

module.exports.createTeam = function (id, name, members, response) {
  const today = new Date();
  const newTeam = members.map(
    ({ value: email }) =>
      new Team({
        email,
        account_id: id,
        init_date: today,
        end_date: "0",
        name,
      })
  );

  Team.create(newTeam, (err, data) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        response.status(400).send({
          message: "Team already exists.",
        });
      } else {
        response.status(500).send({
          message:
            err.message || "Some error occurred while creating the Team.",
        });
      }
    } else response.send({ message: "Account created successfully" });
  });
};

module.exports.updateManager = function (id, managerEmail, response) {
  Manager.updateByAccountId(id, managerEmail, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found Manager with id ${id} .`,
        });
      } else {
        response.status(500).send({
          message: `Error updating Manager with id ${id}`,
        });
      }
    }
  });
};

module.exports.updateTeam = function (id, name, members, response) {
  const today = new Date();
  const newTeam = members.map(
    ({ value: email }) =>
      new Team({
        email,
        account_id: id,
        init_date: today,
        end_date: "0",
        name,
      })
  );
  Team.updateTeam(newTeam, name, id, (err, data) => {
    if (err) {
      response.status(500).send({
        message: err.message || "Some error occurred while creating the Team.",
      });
    } else response.send({ message: "Account updated successfully" });
  });
};
