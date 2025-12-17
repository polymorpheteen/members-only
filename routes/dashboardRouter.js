const { Router } = require("express");
const {
  getDashboard,
  postMessage,
} = require("../controllers/dashboardControllers");
const isAuthenticated = require("../middleware/auth");

const dashboardRouter = Router();

dashboardRouter.get("/", isAuthenticated, getDashboard);

dashboardRouter.post("/", isAuthenticated, postMessage);

module.exports = dashboardRouter;
