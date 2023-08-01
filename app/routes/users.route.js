module.exports = (app) => {
  const router = require("express").Router();
  const controller = require("../controllers/users.controller");

  router.post("/register", controller.createUser);
  router.post("/user", controller.usernameValidation)

  app.use("/api", router);
  return router;
};
