require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("node:path");
const passport = require("./config/passport");
const pool = require("./db/pool");
const pgSession = require("connect-pg-simple")(session);

const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const loginRouter = require("./routes/loginRouter");
const logoutRouter = require("./routes/logoutRouter");

const app = express();

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.use("/dashboard", dashboardRouter);
app.use("/log-in", loginRouter);
app.use("/log-out", logoutRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`The server is listening on port ${PORT}!`);
});
