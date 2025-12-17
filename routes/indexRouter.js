const { Router } = require("express");
const isAuthenticated = require("../middleware/auth");

const indexRouter = Router();

indexRouter.get("/", isAuthenticated, (req, res) => {
  res.redirect("/dashboard");
});

module.exports = indexRouter;
