const pool = require("../db/pool");

async function getDashboard(req, res) {
  try {
    const { rows: messages } = await pool.query(
      "SELECT messages.id, messages.title, messages.body, messages.created_at, users.username FROM messages JOIN users ON messages.user_id = users.id ORDER BY messages.created_at DESC"
    );

    res.render("dashboard", { user: req.user, messages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function postMessage(req, res) {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).send("Title and body are required.");
  }

  try {
    const query =
      "INSERT INTO messages (title, body, user_id) VALUES ($1, $2, $3) RETURNING id";
    const values = [title, body, req.user.id];
    await pool.query(query, values);

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = { getDashboard, postMessage };
