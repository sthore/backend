const pureHttp = require('pure-http')
const routes = require('./routes')

const app = pureHttp()

app.use((req, res, next) => {
  req.res = res
  next()
})

routes.mount(app)

module.exports = app
