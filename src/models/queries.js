const pool = require("./pool");

async function getMessages() {
  try {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getMessages,
};
