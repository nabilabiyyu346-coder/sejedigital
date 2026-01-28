const { pool } = require('../config/initDb');

const taskController = {
  // Get all tasks
  getAllTasks: async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT 
          t.id, 
          t.title, 
          t.description, 
          t.status, 
          t.assigned_to,
          t.created_by,
          u_assigned.username as assigned_to_username,
          u_assigned.full_name as assigned_to_fullname,
          u_created.username as created_by_username,
          t.created_at, 
          t.updated_at 
        FROM tasks t
        LEFT JOIN users u_assigned ON t.assigned_to = u_assigned.id
        LEFT JOIN users u_created ON t.created_by = u_created.id
        ORDER BY t.created_at DESC
      `);

      res.json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Get all tasks error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Get task by ID
  getTaskById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(`
        SELECT 
          t.id, 
          t.title, 
          t.description, 
          t.status, 
          t.assigned_to,
          t.created_by,
          u_assigned.username as assigned_to_username,
          u_assigned.full_name as assigned_to_fullname,
          u_created.username as created_by_username,
          t.created_at, 
          t.updated_at 
        FROM tasks t
        LEFT JOIN users u_assigned ON t.assigned_to = u_assigned.id
        LEFT JOIN users u_created ON t.created_by = u_created.id
        WHERE t.id = $1
      `, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Get task by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Create new task
  createTask: async (req, res) => {
    try {
      const { title, description, assigned_to } = req.body;
      const created_by = req.user.id;

      // Validate input
      if (!title) {
        return res.status(400).json({
          success: false,
          message: 'Task title is required'
        });
      }

      // If assigned_to is provided, validate user exists
      if (assigned_to) {
        const userExists = await pool.query(
          'SELECT id FROM users WHERE id = $1',
          [assigned_to]
        );

        if (userExists.rows.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'Assigned user does not exist'
          });
        }
      }

      // Create task
      const result = await pool.query(`
        INSERT INTO tasks (title, description, status, assigned_to, created_by) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING 
          id, title, description, status, assigned_to, created_by, created_at, updated_at
      `, [title, description || null, 'pending', assigned_to || null, created_by]);

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Create task error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Update task (all fields)
  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status, assigned_to } = req.body;

      // Check if task exists
      const taskExists = await pool.query(
        'SELECT id FROM tasks WHERE id = $1',
        [id]
      );

      if (taskExists.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      // If assigned_to is provided, validate user exists
      if (assigned_to) {
        const userExists = await pool.query(
          'SELECT id FROM users WHERE id = $1',
          [assigned_to]
        );

        if (userExists.rows.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'Assigned user does not exist'
          });
        }
      }

      let updateQuery = 'UPDATE tasks SET updated_at = CURRENT_TIMESTAMP';
      const params = [];
      let paramCount = 1;

      if (title !== undefined) {
        updateQuery += `, title = $${paramCount}`;
        params.push(title);
        paramCount++;
      }

      if (description !== undefined) {
        updateQuery += `, description = $${paramCount}`;
        params.push(description);
        paramCount++;
      }

      if (status !== undefined) {
        updateQuery += `, status = $${paramCount}`;
        params.push(status);
        paramCount++;
      }

      if (assigned_to !== undefined) {
        updateQuery += `, assigned_to = $${paramCount}`;
        params.push(assigned_to);
        paramCount++;
      }

      updateQuery += ` WHERE id = $${paramCount} RETURNING id, title, description, status, assigned_to, created_by, created_at, updated_at`;
      params.push(id);

      const result = await pool.query(updateQuery, params);

      res.json({
        success: true,
        message: 'Task updated successfully',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Update task error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Update task status only
  updateTaskStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
      }

      // Check if task exists
      const taskExists = await pool.query(
        'SELECT id FROM tasks WHERE id = $1',
        [id]
      );

      if (taskExists.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      const result = await pool.query(
        'UPDATE tasks SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, title, description, status, assigned_to, created_by, created_at, updated_at',
        [status, id]
      );

      res.json({
        success: true,
        message: 'Task status updated successfully',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Update task status error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Delete task
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if task exists
      const taskExists = await pool.query(
        'SELECT id FROM tasks WHERE id = $1',
        [id]
      );

      if (taskExists.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

      res.json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      console.error('Delete task error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

module.exports = taskController;
