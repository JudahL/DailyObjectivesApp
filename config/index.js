module.exports = {
  app: {
    localPort: 5050,
    productionPort: process.env.PORT,
  },
  db: {
    host: `mongodb://${process.env.MONGO_USER_USERNAME}:${process.env.MONGO_USER_PASSWORD}@ds235251.mlab.com`,
    port: '35251',
    appName: 'objectives_app',
  },
  session: {
    secret: "dragon's breath",
    saveUninitialized: false,
    resave: false,
  }
};