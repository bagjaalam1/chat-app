module.exports = (app) => {
    const router = require("express").Router();
    const controller = require("../controllers/login.controller");
  
    router.get("/login", controller.getRequestToken);
    router.get("/callback", controller.getAccessToken);
  
    app.use("/oauth", router);
    return router;
  };