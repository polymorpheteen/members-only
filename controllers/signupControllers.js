const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

async function postSignUp(req, res, next) {
  const { first_name, last_name, username, password, confirm_password } =
    req.body;

  if (
    !first_name ||
    !last_name ||
    !username ||
    !password ||
    !confirm_password
  ) {
    return res.status(400).send("All fields are required");
  }

  if (password !== confirm_password) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, username";
    const values = [first_name, last_name, username, hashedPassword];

    const result = await pool.query(query, values);
    const newUser = result.rows[0];

    req.login(newUser, (err) => {
      if (err) return next(err);
      return res.redirect("/dashboard");
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).send("Username already exists");
    }
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = { postSignUp };
