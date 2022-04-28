module.exports = (app) => {
  const manager = require("../../controllers/manager");
  const router = require("express").Router();

  router.post("/", manager.create);
  router.delete("/", manager.delete);

  app.use("/api/manager", router);
};
