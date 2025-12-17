const { Router } = require("express");
const { getDashboard } = require("../controllers/dashboardControllers");
const isAuthenticated = require("../middleware/auth");

const dashboardRouter = Router();

dashboardRouter.get("/", isAuthenticated, getDashboard);

module.exports = dashboardRouter;
