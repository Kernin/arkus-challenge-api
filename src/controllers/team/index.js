const Team = require("../../models/team");

exports.create = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(request.body);
  const { team } = request.body;
  const teamArr = team.map((member) => new Team(member));

  Team.create(teamArr, (err, data) => {
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
    } else response.send(data);
  });
};
