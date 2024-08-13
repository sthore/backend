const controllers = require('./controllers')

const mount = (app) => {
  app.get('/health', controllers.health)
}

module.exports = {
  mount
}
