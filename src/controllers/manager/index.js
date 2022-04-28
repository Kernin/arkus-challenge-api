const Manager = require("../../models/manager");

exports.create = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const manager = new Manager(request.body);
  Manager.create(manager, (err, data) => {
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
    } else response.send(data);
  });
}

exports.delete = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const manager = new Manager(request.body);
  Manager.remove(manager, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found Manager with email ${manager.email}.`,
        });
      } else {
        response.status(500).send({
          message: `Could not delete Manager with email ${manager.email}`,
        });
      }
    } else response.send({ message: `Manager was deleted successfully!` });
  });
}