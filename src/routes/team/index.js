const jwtAuth = require("../jwtAuth");

module.exports = (app) => {
  const team = require("../../controllers/team");
  const router = require("express").Router();

  jwtAuth(router);

  router.post("/", team.create);
  router.get("/", team.findAll);

  app.use("/api/team", router);
};
