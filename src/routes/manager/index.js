module.exports = (app) => {
  const user = require("../../controllers/manager");
  const router = require("express").Router();

  router.post("/", user.create);
  router.delete("/", user.delete);

  app.use("/api/manager", router);
};
