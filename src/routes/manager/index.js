const jwtAuth = require("../jwtAuth");

module.exports = (app) => {
  const manager = require("../../controllers/manager");
  const router = require("express").Router();

  jwtAuth(router);

  router.post("/", manager.create);
  router.delete("/", manager.delete);
  router.get("/",manager.findAllAvailableUsers);

  app.use("/api/manager", router);
};
