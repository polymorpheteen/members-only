const { Router } = require("express");
const { postSignUp } = require("../controllers/signupControllers");

const signupRouter = Router();

signupRouter.get("/", (req, res) => {
  res.render("sign-up-form");
});

signupRouter.post("/", postSignUp);

module.exports = signupRouter;
