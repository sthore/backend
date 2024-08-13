const controllers = require('./controllers')

const mount = (app) => {
  app.get('/', controllers.root)
  app.get('/health', controllers.health)
}

module.exports = {
  mount,
}
