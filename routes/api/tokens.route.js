const express = require('express');

const TokensController = require('../../controllers/tokens.controller');

const router = express.Router();

router.post('/', TokensController.createToken);
router.delete('/:id', TokensController.removeToken);

module.exports = router;
