module.exports = (app) => {
  const router = require("express").Router();
  const controller = require("../controllers/users.controller");

  router.post("/user", controller.createUser);

  app.use("/api", router);
  return router;
};
