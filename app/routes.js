const controllers = require('./controllers')

const mount = (app) => {
  app.get('/', controllers.root)
  app.get('/health', controllers.health)
  app.get('/api/v1/products', controllers.products.find)
}

module.exports = {
  mount,
}
