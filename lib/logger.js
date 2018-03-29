const winston = require('winston');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const {
  logger: logCfg,
} = require('../config');

// Create the log directory if it does not exist
const logDir = path.join(process.cwd(), (logCfg.logFolder));
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Logs to file
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: path.join(logDir, 'results.log'),
      level: logCfg.level,
      json: false,
      maxsize: 1024 * 1024 * 500,
      maxFiles: 10,
      timestamp: () => moment().format('DD/MM/YYYY HH:mm:ss'),
      formatter: options =>
        `${options.timestamp()} ${options.level.toUpperCase()
        } ${options.message ? options.message : ''
        } ${options.meta && Object.keys(options.meta).length ?
          `\n\t${JSON.stringify(options.meta)}` : ''}`,
    }),
  ],
});

// Developement logs to console
if (process.env.NODE_ENV !== 'production') {
  const {
    config: conf,
  } = (winston);
  logger.add(winston.transports.Console, {
    timestamp: () => moment().format('DD/MM/YYYY HH:mm:ss'),
    colorize: true,
    level: 'debug',
    formatter: options =>
      `${options.timestamp()
      } ${conf.colorize(options.level, options.level.toUpperCase())
      } ${options.message ? options.message : ''
      } ${options.meta && Object.keys(options.meta).length ?
        `\n\t${JSON.stringify(options.meta)}` : ''}`,
  });
}

module.exports = logger;
module.exports.stream = {
  write(message) {
    logger.info(message);
  },
};
