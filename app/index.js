const pureHttp = require('pure-http')
const routes = require('./routes')
const setupDatabase = require('./database')

const setup = async (options = {}) => {
  const app = pureHttp()

  app.use((req, res, next) => {
    req.req = req
    req.res = res
    next()
  })

  routes.mount(app)

  app.set('db', await setupDatabase(options.database))

  return app
}

module.exports = setup
