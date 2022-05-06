const { request } = require("express");
const Account = require("../../models/account");
const Manager = require("../../models/manager");
const Team = require("../../models/team")

exports.create = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(request.body);
  const { account: newAccount } = request.body;
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
        assignManager(data.id);
        createTeam(data.id)
      }
    }
  });

  const assignManager = (id) => {
    const { manager: managerEmail } = request.body;
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

  const createTeam =(id)=>{
    const {team:{name,members}} = request.body
    const today = new Date()
    const newTeam = members.map(({value:email})=>new Team({
      email,
      account_id:id,
      init_date: today,
      end_date: '0',
      name
    }))

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
      } else response.send({message: 'Account created successfully'});
    });
  }
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
  Account.findById(request.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found Account with id ${request.params.id}.`,
        });
      } else {
        response.status(500).send({
          message: "Error retrieving Account with id " + request.params.id,
        });
      }
    } else response.send({ account: data });
  });
};

exports.findAllAssigned = (request, response) => {
  Account.getAllAssigned((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found account with id {id} .`,
        });
      } else {
        response.status(500).send({
          message:
            err.message || "Some error occurred while retrieving accounts.",
        });
      }
    } else response.send(data);
  });
};

exports.update = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(request.body);
  const { id } = request.body;
  Account.updateById(new Account(request.body), (err, data) => {
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
    } else response.send(data);
  });
};
