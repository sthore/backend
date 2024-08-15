const controllers = require('./controllers')

const mount = (app) => {
  app.get('/', controllers.root)
  app.get('/health', controllers.health)
  app.get('/api/v1/products', controllers.products.find)
  app.get('/api/v1/products/:id', controllers.products.fetch)
}

module.exports = {
  mount,
}
