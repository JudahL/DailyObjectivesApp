if (process.env.NODE_ENV !== 'production') {
  var dbuser = require('./dbuser');
}

const localConfig = {
  app: {
    port: 5050,
    resetObjectivesHour: 4,
  },
  db: {
    host: `mongodb://${dbuser && dbuser.username}:${dbuser && dbuser.password}@ds235251.mlab.com`,
    port: '35251',
    appName: 'objectives_app',
  },
  session: {
    secret: "dragon's breath",
    saveUninitialized: false,
    resave: false,
  }
};

const productionConfig = {
  app: {
    port: process.env.PORT,
    resetObjectivesHour: process.env.RESET_HOUR,
  },
  db: {
    host: `mongodb://${process.env.MONGO_USER_USERNAME}:${process.env.MONGO_USER_PASSWORD}@ds235251.mlab.com`,
    port: '35251',
    appName: 'objectives_app',
  },
  session: {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  }
}

if (process.env.NODE_ENV !== 'production') {
  module.exports = localConfig;
} else {
  module.exports = productionConfig;
}