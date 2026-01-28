const express = require('express');
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// All task routes require authentication
router.use(authenticateToken);

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.patch('/:id/status', taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
