const pool = require('../config/database'); // Fixed
const { hashPassword } = require('../config/auth');

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, created_at FROM users');
    res.json({ success: true, users: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Required fields missing' });
  try {
    const hashed = await hashPassword(password);
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashed]
    );
    res.status(201).json({ success: true, userId: result.rows[0].id });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ success: false, message: 'Email already exists' });
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    let query = 'UPDATE users SET name = $1, email = $2';
    const params = [name, email];
    if (password) {
      const hashed = await hashPassword(password);
      query += ', password_hash = $3';
      params.push(hashed);
    }
    query += ' WHERE id = $' + (params.length + 1);
    params.push(id);
    const result = await pool.query(query, params);
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };