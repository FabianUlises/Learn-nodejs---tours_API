// Dependencies
const express = require('express');
const router = express.Router();
// Controller
const userController = require('./../controllers/userController');
// Routes
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
module.exports = router;