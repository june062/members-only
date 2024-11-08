const pool = require("./pool");

async function getAnonymousMessages() {
  try {
    const { rows } = await pool.query(
      "SELECT messages.id, title, message,TO_CHAR(sent, 'Month DD, YYYY') AS sent FROM messages"
    );
    return rows;
  } catch (error) {
    return error;
  }
}
async function getMessagesNotAnonymous() {
  try {
    const { rows } = await pool.query(
      "SELECT messages.id, username, title, message, TO_CHAR(sent, 'Month DD, YYYY') AS sent FROM messages JOIN users ON messages.message_userid = users.id"
    );

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
async function retrievePassword(username) {
  const { rows } = await pool.query(
    "SELECT password FROM users WHERE username = $1",
    [username]
  );
  return rows[0];
}

async function createMessage(title, message, sent, user) {
  try {
    await pool.query(
      "INSERT INTO messages(title, message, sent, message_userid) VALUES($1,$2,$3,$4)",
      [title, message, sent, Number(user)]
    );
  } catch (error) {
    return error;
  }
}

async function deleteMessage(messageID) {
  try {
    await pool.query("DELETE FROM messages WHERE id = $1", [Number(messageID)]);
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAnonymousMessages,
  getMessagesNotAnonymous,
  addUser,
  retrievePassword,
  createMessage,
  deleteMessage,
};
