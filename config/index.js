const production = require('./environment/production.db-config.json');
const development = require('./environment/development.db-config.json');
const local = require('./environment/local.config.json');

// Required environment variables
// TODO:  jwtSecret as environment variable
// ['NODE_ENV', 'PORT'].forEach((name) => {
//   if (!process.env[name]) {
//     throw new Error(`Environment variable ${name} is missing`);
//   }
// });

let config = {};

switch (process.env.NODE_ENV) {
  case 'development':
    config = development; // TODO: Usar BD en MongoDB Atlas
    break;

  case 'production':
    config = production;
    break;

  default:
    config = local;
}

// TODO: check config
config.logger.port = config.logger.port || process.env.PORT || 3000;

config.logger.logFolder = config.server.logFolder || 'logs';
config.logger.level = process.env.NODE_ENV !== 'production' ? 'debug' : 'info';

module.exports = config;

// TODO:
// const joi = require('joi')
//
// const envVarsSchema = joi.object({
//   NODE_ENV: joi.string()
//     .allow(['development', 'production', 'test', 'provision'])
//     .required(),
//   PORT: joi.number()
//     .required(),
//   LOGGER_LEVEL: joi.string()
//     .allow(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
//     .default('info'),
//   LOGGER_ENABLED: joi.boolean()
//     .truthy('TRUE')
//     .truthy('true')
//     .falsy('FALSE')
//     .falsy('false')
//     .default(true)
// }).unknown()
//   .required()
//
// const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
// if (error) {
//   throw new Error(`Config validation error: ${error.message}`)
// }

// const config = {
//     env: process.env.NODE_ENV,
//     logger: {
//         level: process.env.LOG_LEVEL || 'info',
//         enabled: process.env.BOOLEAN ? process.env.BOOLEAN.toLowerCase() === 'true' : false
//     },
//     server: {
//         port: Number(process.env.PORT)
//     },
//
//     db{
//
//     }
// };
//
