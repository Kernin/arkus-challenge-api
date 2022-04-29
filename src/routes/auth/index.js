module.exports = (app) => {
  const user = require("../../controllers/user");
  const router = require("express").Router();

  router.post("/", user.login);

  app.use("/api/auth", router);
};