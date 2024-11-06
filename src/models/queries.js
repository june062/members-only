const pool = require("./pool");

async function getMessages() {
  try {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
  } catch (error) {
    return error;
  }
}

async function addUser(username, password, member, admin) {
  await pool.query(
    "INSERT INTO users(username,password, member, admin) VALUES($1,$2,$3,$4)",
    [username, password, member, admin]
  );
}

module.exports = {
  getMessages,
  addUser,
};
