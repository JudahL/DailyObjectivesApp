const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const users = require('./routes/api/users');
const objectives = require('./routes/api/objectives');

const app = express();

/**
 * Connect server to MongoDB using URI defined in keys.js
 */
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err));

/**
 * Use JSON parsing middleware for incoming requests
 */
app.use(bodyParser.json());

/**
 * Use sessions
 * This should be defined after bodyParser
 */
app.use(expressSession({
  secret: "dragons breath",
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

/**
 * API routes
 */
app.use('/api/users', users);
app.use('/api/objectives', objectives);

/**
 * Serve static assets
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/**
 * Error handling middleware
 * This should be the last piece of middleware to be defined
 */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json(err.message);
  return err;
});

/**
 * Get port from environment or use 5050 as default and listen on that port
 */
const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server started on port ${port}`));