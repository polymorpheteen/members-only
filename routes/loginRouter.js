const { Router } = require("express");
const passport = require("passport");

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  res.render("log-in-form");
});

loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/log-in",
  })
);

module.exports = loginRouter;
