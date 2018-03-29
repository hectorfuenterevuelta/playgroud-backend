const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const compression = require('compression');
const passport = require('passport');
// const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
// const expressValidator = require('express-validator');
// const { body, param, validationResult } = require('express-validator/check');

const log = require('./lib/logger');

const routes = require('./routes/');

require('./lib/db');


const app = express();

// Server configuration
const {
  server: serverConfig,
} = require('./config');

app.set('port', serverConfig.port);
app.set('hostName', serverConfig.hostName);

// TODO:
app.use(compression());

// TODO:
// Middleware for CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// TODO: csurf
// TODO: expressa
// TODO: multer

// json format request application/json
app.use(bodyParser.json());

// url format application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(helmet());

app.use(passport.initialize());

// TODO:
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
// app.use(methodOverride('X-HTTP-Method-Override'));

// TODO: express-wiston ¿podría valer en lugar de morgan?
app.use(morgan('dev', {
  stream: log.stream,
}));

// app.use(expressValidator())
app.use(errorhandler());


// function validtionMiddleware(req, res, next) {
//   try{
//     validationResult(req).throw();
//     next();
//   }
//   catch (err){
//     res.status(422).send(err.mapped())
//   }
// }

app.use('/', routes);

// Run server
app.listen(app.get('port'), () => {
  log.info(`Server running at http://${app.get('hostName')}:${app.get('port')}`);
});

const gracefulExit = () => {
  // TODO:
  // mongoose.connection.close(function () {
  //   console.log(' DB :' + db_server + ' is disconnected through app termination');
  //   process.exit(0);
  // });
  log.info('End');
  process.exit(0);
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

// Make this app object visible to the rest of the program when we call for it using require()
module.exports = app;
