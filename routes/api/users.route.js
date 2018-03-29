const express = require('express');

const UsersController = require('../../controllers/users.controller');

const router = express.Router();

// router.get('/', UsersController.getUsers); // TODO:
router.get('/:id', UsersController.getUser);
router.post('/', UsersController.createUser);
router.put('/:id', UsersController.updateUser);
router.delete('/:id', UsersController.removeUser);

module.exports = router;
