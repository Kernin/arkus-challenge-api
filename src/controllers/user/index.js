const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.create = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const user = new User({
    ...request.body,
  });
  User.create(user, (err, data) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        response.status(400).send({
          message: "User already exists.",
        });
      } else {
        response.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      }
    } else response.send(data);
  });
};

exports.findAll = (request, response) => {
  let email = request.query.email;
  User.getAll(email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found User with id ${email} .`,
        });
      } else {
        response.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      }
    } else response.send({users:data});
  });
};

exports.update = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(request.body);
  const { email } = request.body;
  User.updateById(new User(request.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found User with id ${email} .`,
        });
      } else {
        response.status(500).send({
          message: `Error updating User with id ${email}`,
        });
      }
    } else response.send(data);
  });
};

exports.delete = (request, response) => {
  User.remove(request.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found User with email ${request.params.email}.`,
        });
      } else {
        response.status(500).send({
          message: `Could not delete User with email ${request.params.email}`,
        });
      }
    } else response.send({ message: `User was deleted successfully!` });
  });
};

exports.login = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const { email: currentEmail, password: currentPassword } = request.body;
  User.findById(currentEmail, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found User with email ${currentEmail}.`,
        });
      } else {
        response.status(500).send({
          message: err.message || "Some error occurred while loging.",
        });
      }
    } else {
      const { email, password } = data;
      if (email === currentEmail && password === currentPassword) {
        const payload ={
          check: true
        }
        const masterKey = process.env.MASTER_KEY
        const token = jwt.sign(payload,masterKey,{expiresIn: 1440})
        data.token=token

        response.send(data);
      } else {
        response.status(400).send({
          message: "Wrong credentials.",
        });
      }
    }
  });
};
