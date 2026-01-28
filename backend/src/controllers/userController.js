const { pool } = require('../config/initDb');
const { hashPassword } = require('../utils/auth');

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT id, username, email, full_name, created_at FROM users ORDER BY created_at DESC'
      );

      res.json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        'SELECT id, username, email, full_name, created_at FROM users WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Get user by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Create new user
  createUser: async (req, res) => {
    try {
      const { username, email, password, full_name } = req.body;

      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username, email, and password are required'
        });
      }

      // Check if user already exists
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE username = $1 OR email = $2',
        [username, email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Username or email already exists'
        });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const result = await pool.query(
        'INSERT INTO users (username, email, password, full_name) VALUES ($1, $2, $3, $4) RETURNING id, username, email, full_name, created_at',
        [username, email, hashedPassword, full_name || username]
      );

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Create user error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { email, full_name, password } = req.body;

      // Check if user exists
      const userExists = await pool.query(
        'SELECT id FROM users WHERE id = $1',
        [id]
      );

      if (userExists.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      let updateQuery = 'UPDATE users SET updated_at = CURRENT_TIMESTAMP';
      const params = [];
      let paramCount = 1;

      if (email) {
        updateQuery += `, email = $${paramCount}`;
        params.push(email);
        paramCount++;
      }

      if (full_name) {
        updateQuery += `, full_name = $${paramCount}`;
        params.push(full_name);
        paramCount++;
      }

      if (password) {
        const hashedPassword = await hashPassword(password);
        updateQuery += `, password = $${paramCount}`;
        params.push(hashedPassword);
        paramCount++;
      }

      updateQuery += ` WHERE id = $${paramCount} RETURNING id, username, email, full_name, updated_at`;
      params.push(id);

      const result = await pool.query(updateQuery, params);

      res.json({
        success: true,
        message: 'User updated successfully',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if user exists
      const userExists = await pool.query(
        'SELECT id FROM users WHERE id = $1',
        [id]
      );

      if (userExists.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      await pool.query('DELETE FROM users WHERE id = $1', [id]);

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

module.exports = userController;
