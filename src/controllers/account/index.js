const Account = require("../../models/account");
const Manager = require("../../models/manager");
const utils = require("./utils");
const Team = require("../../models/team");

exports.create = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const {
    account: newAccount,
    manager: managerEmail,
    team: { name, members },
  } = request.body;
  const { has_team: hasTeam } = newAccount;
  const account = new Account(newAccount);

  Account.create(account, (err, data) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        response.status(400).send({
          message: "Account already exists.",
        });
      } else {
        response.status(500).send({
          message:
            err.message || "Some error occurred while creating the Account.",
        });
      }
    } else {
      if (hasTeam === "false") {
        response.send(data);
      } else {
        utils.assignManager(data.id, managerEmail, response);
        utils.createTeam(data.id, name, members, response);
      }
    }
  });
};

exports.delete = (request, response) => {
  Account.remove(request.params.account_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found Account with id ${request.params.account_id}.`,
        });
      } else {
        response.status(500).send({
          message: `Could not delete User with id ${request.params.account_id}`,
        });
      }
    } else response.send({ message: `Account was deleted successfully!` });
  });
};

exports.findAll = (request, response) => {
  Account.getAll((err, data) => {
    if (err) {
      response.status(500).send({
        message:
          err.message || "Some error occurred while retrieving accounts.",
      });
    } else response.send({ accounts: data });
  });
};

exports.findOne = (request, response) => {
  const { id } = request.params;
  let result = {};
  Account.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found Account with id ${id}.`,
        });
      } else {
        response.status(500).send({
          message: "Error retrieving Account with id " + id,
        });
      }
    } else {
      const { has_team: hasTeam } = data;
      result.account = data;

      if (hasTeam === "true") {
        findManager(id, result);
      } else {
        response.send(result);
      }
    }
  });

  const findManager = (id, result) => {
    Manager.getAccountManager(id, (err, data) => {
      if (err) {
        response.status(500).send({
          message:
            err.message || "Some error occurred while retrieving manager.",
        });
      } else {
        result.manager = data;
        findTeamMembers(id, result);
      }
    });
  };

  const findTeamMembers = (id, result) => {
    Team.getTeamMembers(id, (err, data) => {
      if (err) {
        response.status(500).send({
          message:
            err.message || "Some error occurred while retrieving team members.",
        });
      } else {
        result.team = data;
        findTeamName(id, result);
      }
    });
  };

  const findTeamName = (id, result) => {
    Team.getTeamName(id, (err, data) => {
      if (err) {
        response.status(500).send({
          message:
            err.message || "Some error occurred while retrieving team's name.",
        });
      } else {
        result.team_name = data;
        response.send(result);
      }
    });
  };
};

exports.update = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const {
    account,
    action,
    manager: managerEmail,
    team: { name, members },
  } = request.body;
  const { id } = account;
  Account.updateById(new Account(account), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found Account with id ${id} .`,
        });
      } else {
        response.status(500).send({
          message: `Error updating Account with id ${id}`,
        });
      }
    } else {
      if (action === "update") {
        utils.updateManager(id, managerEmail, response);
        utils.updateTeam(id, name, members, response);
      } else {
        utils.assignManager(id, managerEmail, response);
        utils.createTeam(id, name, members, response);
      }
    }
  });
};
