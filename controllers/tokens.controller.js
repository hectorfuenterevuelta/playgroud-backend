const HttpStatus = require('http-status-codes');
const UserService = require('../services/users.service');

const jwt = require('jwt-simple');

// TODO: to file
const cfg = {
  jwtSecret: 'MyS3cr3tK3Y',
  jwtSession: {
    session: false,
  },
};


exports.createToken = async function createToken(req, res) {
  try {
    if (req.body.name && req.body.password) {
      const user = await UserService.getUserByName(req.body.name);
      if (user) {
        if (user.password === req.body.password) {
          const payload = {
            id: user.id,
          };
          const token = jwt.encode(payload, cfg.jwtSecret);
          return res.json({
            token,
          });
        }
        return res.status(HttpStatus.UNAUTHORIZED).json({
          status: HttpStatus.UNAUTHORIZED,
          message: 'User unauthorized',
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: 'Bad request',
    });
  } catch (e) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: e.message,
    });
  }
};

// TODO:
exports.removeToken = async function removeToken(req, res) {
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: '',
  });
};
