const setupApp = require('./app')
const config = require('./app/config')

const run = async () => {
  const port = Number.parseInt(process.env.PORT || '3000')

  const app = await setupApp(config.app)

  app.listen(port, () => console.log(`Listen server on port ${port}`))

  return app
}

run().catch((err) => console.error('ERROR running app', err))
