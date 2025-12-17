const { Router } = require("express");
const { getDashboard } = require("../controllers/dashboardControllers");

const dashboardRouter = Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/log-in");
}

dashboardRouter.get("/", isAuthenticated, getDashboard);

module.exports = dashboardRouter;
