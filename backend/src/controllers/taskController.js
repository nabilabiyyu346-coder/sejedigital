const pool = require('../config/database'); // Fixed

const getAllTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1 OR user_id IS NULL', [userId]); // Simple access, adjust if needed
    res.json({ success: true, tasks: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1 AND (user_id = $2 OR user_id IS NULL)', [id, userId]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Task not found or unauthorized' });
    res.json({ success: true, task: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createTask = async (req, res) => {
  const { title, description, status, user_id } = req.body;
  if (!title) return res.status(400).json({ success: false, message: 'Title required' });
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING id',
      [title, description, status || 'todo', user_id || null]
    );
    res.status(201).json({ success: true, taskId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, user_id } = req.body;
  const currentUserId = req.user.id;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, user_id = $4 WHERE id = $5 AND (user_id = $6 OR user_id IS NULL) RETURNING id',
      [title, description, status, user_id, id, currentUserId]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Task not found or unauthorized' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const currentUserId = req.user.id;
  if (!status) return res.status(400).json({ success: false, message: 'Status required' });
  try {
    const result = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 AND (user_id = $3 OR user_id IS NULL) RETURNING id',
      [status, id, currentUserId]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Task not found or unauthorized' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const currentUserId = req.user.id;
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND (user_id = $2 OR user_id IS NULL)',
      [id, currentUserId]
    );
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Task not found or unauthorized' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, updateTaskStatus, deleteTask };