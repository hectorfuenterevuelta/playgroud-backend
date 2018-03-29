const express = require('express');

const router = express.Router();

const users = require('./api/users.route');
const tokens = require('./api/tokens.route');
const admins = require('./api/admins.route');

const authController = require('../controllers/auths.controller');

router.use('/users', users);

router.use('/token', tokens);
router.use('/admins', authController.authenticate(), admins);

module.exports = router;
