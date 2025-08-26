const express = require('express');
const router = express.Router();
const { signup, login, getAllUser, logout } = require('../Controller/authController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', authenticateToken, getAllUser);
router.post('/logout', logout);

module.exports = router;