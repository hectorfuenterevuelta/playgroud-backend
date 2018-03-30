const express = require('express');

const TokensController = require('../../controllers/tokens.controller');

const router = express.Router();

/**
 * @apiDefine ErrorExample
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "status": 400,
 *       "message": "Bad request"
 *     }
 */

/**
 * @api {post} /token Create new token.
 * @apiName PostToken
 * @apiGroup Token
 * @apiDescription Find user, check password and create token.
 * @apiParam {String} name  Mandatory user name.
 * @apiParam {String} password  Mandatory user password.
 * @apiParamExample {json} Request-Example:
 * {
 *  "name": "user name",
 *  "password": "user password"
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "xxxxx"
 *     }
 *
 * @apiError (401 Unauthorized) UserUnauthorized Invalid <code>password</code>.
 * @apiError (400 Bad Request) BadRequest  Malformed request.
 * @apiError (404 Not Found) UserNotFound User <code>name</code> not found.
 * @apierror (500 Internal Server Error) InternalServerError Unexpected condition was encountered.
 *
 * @apiUse ErrorExample
 */
router.post('/', TokensController.createToken);

/**
 * @api {delete} /token Delete token.
 * @apiName DeleteToken
 * @apiGroup Token
 * @apiDescription Delete token.
 * @apierror (500 Internal Server Error) InternalServerError Unexpected condition was encountered.
 *
 * @apiUse ErrorExample
 */
router.delete('/:id', TokensController.removeToken);

module.exports = router;
