module.exports = (app) => {
  const team = require("../../controllers/team");
  const router = require("express").Router();

  router.post("/", team.create);

  app.use("/api/team", router);
};
