const db = require('../config/db');
const fs = require('fs');
const path = require('path');

const FALLBACK_USERS_PATH = path.join(__dirname, '..', 'data', 'users.json');

const DB_UNAVAILABLE_ERRORS = new Set([
  'ER_ACCESS_DENIED_ERROR',
  'ECONNREFUSED',
  'PROTOCOL_CONNECTION_LOST',
  'ER_BAD_DB_ERROR',
  'ER_NO_SUCH_TABLE'
]);

function getFallbackUser(userId) {
  try {
    const raw = fs.readFileSync(FALLBACK_USERS_PATH, 'utf8');
    const users = JSON.parse(raw);
    return users.find((user) => user.id === userId) || null;
  } catch (error) {
    console.error('Fallback data read failed:', error.message);
    return null;
  }
}

exports.getProfile = async (req, res) => {
  const userId = Number(req.params.id);
  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({ message: 'Invalid user id' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT id, username, email, bio FROM users WHERE id = ?', 
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    if (DB_UNAVAILABLE_ERRORS.has(error.code)) {
      console.warn(`Database unavailable (${error.code}). Returning fallback profile.`);
      const fallbackUser = getFallbackUser(userId);
      if (!fallbackUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(fallbackUser);
    }

    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
