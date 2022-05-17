const jwtAuth = require("../jwtAuth");

module.exports = (app) => {
  const account = require("../../controllers/account");
  const router = require("express").Router();

  jwtAuth(router);
  
  router.post("/", account.create);
  router.get("/", account.findAll);
  router.get("/:id", account.findOne)
  router.put("/", account.update);
  router.delete("/:account_id", account.delete);

  app.use("/api/account", router);
};