const log = require('../lib/logger');
const mongoose = require('mongoose');
const bluebird = require('bluebird');

const {
  db: dbConfig,
} = require('../config');

const dbFullPath = `${dbConfig.path}:${dbConfig.port}/${dbConfig.dbName}`;
let userPass = '';

// TODO: password encriptados
if (dbConfig.user && dbConfig.password) {
  userPass = `${dbConfig.user}:${dbConfig.password}@`;
}

const url = `mongodb://${userPass}${dbFullPath}`;
mongoose.Promise = bluebird; // TODO: como funciona esto?

mongoose.connect(url, {
  promiseLibrary: bluebird,
})
  .then(log.info(`Connected to ${dbFullPath}`))
  .catch((error) => {
    log.error(error.message); // TODO: return ¿Promise?
  });
