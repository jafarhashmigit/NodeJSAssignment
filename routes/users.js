const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware to secure public routes
router.use(authMiddleware);

router.get('/', userController.getAllUsers);

// Add more CRUD routes as needed (e.g., get single user, update user, delete user)

module.exports = router;