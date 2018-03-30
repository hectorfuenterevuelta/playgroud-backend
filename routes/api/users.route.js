const express = require('express');

const UsersController = require('../../controllers/users.controller');

const router = express.Router();

// router.get('/', UsersController.getUsers); // TODO:

/**
 * @api {get} /user/:id Read data of a User
 * @apiVersion 0.3.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiDescription Compare Verison 0.3.0 with 0.2.0 and
 * you will see the green markers with new items in version 0.3.0 and
 * red markers with removed items since 0.2.0.
 *
 * @apiParam {String} id The Users-ID.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/api/users/4711
 *
 * @apiSuccess {String}   id            The Users-ID.
 * @apiSuccess {Date}     registered    Registration Date.
 * @apiSuccess {Date}     name          Fullname of the User.
 * @apiSuccess {String[]} nicknames     List of Users nicknames (Array of Strings).
 * @apiSuccess {Object}   profile       Profile data (example for an Object)
 * @apiSuccess {Number}   profile.age   Users age.
 * @apiSuccess {String}   profile.image Avatar-Image.
 * @apiSuccess {Object[]} options       List of Users options (Array of Objects).
 * @apiSuccess {String}   options.name  Option Name.
 * @apiSuccess {String}   options.value Option Value.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 *
 * @apiUse ErrorExample
 */
router.get('/:id', UsersController.getUser);

/**
 * @api {post} /users Create new user.
 * @apiName PostUser
 * @apiGroup Users
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
 *     HTTP/1.1 201 OK
 *     {
 *       "status": "201",
 *       "data": {},
 *       "message": "Succesfully created user"
 *     }
 *
 * @apierror (500 Internal Server Error) InternalServerError Unexpected condition was encountered.
 *
 * @apiUse ErrorExample
 */
router.post('/', UsersController.createUser);
router.put('/:id', UsersController.updateUser);
router.delete('/:id', UsersController.removeUser);

module.exports = router;
