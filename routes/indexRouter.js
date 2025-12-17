const { Router } = require("express");

const indexRouter = Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/log-in");
}

indexRouter.get("/", isAuthenticated, (req, res) => {
  res.redirect("/dashboard");
});

module.exports = indexRouter;
