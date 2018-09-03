const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const config = require('./config');
const users = require('./routes/api/users');
const errorHandler = require('./middleware/errorHandler');
const objectives = require('./routes/api/objectives');

const app = express();

/**
 * Connect server to MongoDB using URI defined in config
 */
const db = `${config.db.host}:${config.db.port}/${config.db.appName}`;
mongoose
  .connect(db)
  .then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err));


/**
 * Use JSON parsing middleware for incoming requests
 */
app.use(bodyParser.json());


/**
 * Setting up sessions
 * This should be defined after bodyParser
 */
const { secret, saveUninitialized, resave } = config.session;
app.use(expressSession({
  secret: secret,
  saveUninitialized: saveUninitialized,
  resave: resave,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));


/**
 * API routes
 */
app.use('/api/users', users);
app.use('/api/objectives', objectives);


/**
 * Serve static assets if in production
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


/**
 * Use error handling middleware
 * This should be the last piece of middleware to be defined
 */
app.use(errorHandler);


/**
 * Get port from config and listen on that port
 */
const port = config.app.port;
app.listen(port, () => console.log(`Server started on port ${port}`));