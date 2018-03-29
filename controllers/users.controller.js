const HttpStatus = require('http-status-codes');

const UserService = require('../services/users.service');

// exports.getUsers = async function getUsers(req, res) {
//   const page = req.query.page ? req.query.page : 1;
//   const limit = req.query.limit ? req.query.limit : 10;

//   try {
//     const users = await UserService.getUsers({}, page, limit);
//     return res.status(HttpStatus.OK).json({
//       status: HttpStatus.OK,
//       data: users,
//       message: 'Succesfully Users Recieved',
//     });
//   } catch (e) {
//     return res.status(HttpStatus.BAD_REQUEST).json({
//       status: HttpStatus.BAD_REQUEST,
//       message: e.message,
//     });
//   }
// };

exports.getUser = async function getUser(req, res) {
  try {
    const user = await UserService.getUser(req.params.id);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: 'User not found.',
      });
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: user,
      message: 'Succesfully Users Recieved',
    });
  } catch (e) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: e.message,
    });
  }
};

exports.createUser = async function createUser(req, res) {
  const user = {
    name: req.body.name, // TODO: Validate
    password: req.body.password,
  };

  try {
    const createdUser = await UserService.createUser(user);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: createdUser,
      message: 'Succesfully created user',
    });
  } catch (e) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'User creation was unsuccesfull',
    });
  }
};

exports.updateUser = async function updateUser(req, res) {
  if (!req.body.id) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: 'Id must be present',
    });
  }

  const {
    id,
  } = req.body;

  const user = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null,
  };

  try {
    const updatedUser = await UserService.updateUser(user);
    if (!updatedUser) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: updatedUser,
      message: 'Succesfully user updated',
    });
  } catch (e) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: e.message,
    });
  }
};

exports.removeUser = async function removeUser(req, res) {
  try {
    const deleted = await UserService.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    return res.status(HttpStatus.NO_CONTENT).json({
      status: HttpStatus.NO_CONTENT,
      message: 'Succesfully user deleted',
    });
  } catch (e) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: e.message,
    });
  }
};
