const { Router } = require("express");
const {
  getDashboard,
  postMessage,
  editProfile,
} = require("../controllers/dashboardControllers");
const isAuthenticated = require("../middleware/auth");

const dashboardRouter = Router();

dashboardRouter.get("/", isAuthenticated, getDashboard);

dashboardRouter.post("/", isAuthenticated, postMessage);

dashboardRouter.put("/", isAuthenticated, editProfile);

module.exports = dashboardRouter;
