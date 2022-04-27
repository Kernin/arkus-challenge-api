module.exports = (app) => {
  const user = require("../../controllers/user");
  const router = require("express").Router();

  router.post("/", user.create);
  router.get("/", user.findAll);
  router.put("/", user.update);

  app.use("/api/user", router);
};
