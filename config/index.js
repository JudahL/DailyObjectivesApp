// dbuser.js is excluded when pushing to github
const user = require('./dbuser');

module.exports = {
  app: {
    localPort: 5050,
    productionPort: process.env.PORT,
  },
  db: {
    host: `mongodb://${user.username}:${user.password}@ds235251.mlab.com`,
    port: '35251',
    appName: 'objectives_app',
  },
  session: {
    secret: "dragon's breath",
    saveUninitialized: false,
    resave: false,
  }
};