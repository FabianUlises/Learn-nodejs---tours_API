// Dependencies
const express = require('express');
const router = express.Router();
// Controller
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
// Routes
router.post('/signup', authController.signUp);
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
module.exports = router;