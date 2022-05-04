const { request } = require("express");
const Account = require("../../models/account");

exports.create = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const account = new Account(request.body);

  Account.create(account, (err,data)=>{
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
    } else response.send(data);
  })
}

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
   Account.getAll((err,data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found account with id {id} .`,
        });
      } else {
        response.status(500).send({
          message: err.message || "Some error occurred while retrieving accounts.",
        });
      }
    } else response.send({accounts:data});
   })
}

exports.findOne = (request, response) => {
  Account.findById(request.params.id, (err, data)=>{
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found Account with id ${request.params.id}.`
        });
      } else {
        response.status(500).send({
          message: "Error retrieving Account with id " + request.params.id
        });
      }
    } else response.send({account:data});
  })
}

exports.findAllAssigned  = (request, response) => {
  Account.getAllAssigned((err,data) => {
   if (err) {
     if (err.kind === "not_found") {
       response.status(404).send({
         message: `Not found account with id {id} .`,
       });
     } else {
       response.status(500).send({
         message: err.message || "Some error occurred while retrieving accounts.",
       });
     }
   } else response.send(data);
  })
}

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
}
