const user = require('./dbuser');

module.exports = {
  app: {
    port: 8050
  },
  db: {
    host: `mongodb://${user.username}:${user.password}@ds235251.mlab.com:35251/objectives_app`,
  }
};