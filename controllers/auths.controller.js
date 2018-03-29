const passport = require('passport');
const passportJWT = require('passport-jwt');
const UserService = require('../services/users.service');
const {
  server: serverConfig,
} = require('../config');

const cfg = {
  jwtSecret: serverConfig.jwtSecret,
  jwtSession: serverConfig.jwtSession,
};

const params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
};

const strategy = new passportJWT.Strategy(params, ((payload, done) => {
  const user = UserService.getUser(payload.id);
  if (user) {
    return done(null, {
      id: user.id,
    });
  }
  return done(new Error('User not found'), null);
}));

passport.use(strategy);

module.exports.authenticate = () => passport.authenticate('jwt', cfg.jwtSession);
