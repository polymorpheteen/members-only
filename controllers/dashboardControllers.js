const pool = require("../db/pool");

async function getDashboard(req, res) {
  try {
    const { rows: messages } = await pool.query(
      "SELECT * FROM messages WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.render("dashboard", { user: req.user, messages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = { getDashboard };
