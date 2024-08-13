const { before, after, describe, it } = require('node:test')
const { newDb } = require('pg-mem')
const server = require('supertest')
const setupApp = require('../app')

const CONTENT_TYPE = 'content-type'
const MIME_HAL_JSON_UTF8 = 'application/hal+json; charset=utf-8'

const mem = newDb()
const options = {
  database: {
    dialect: 'postgres',
    dialectModule: mem.adapters.createPg(),
  },
}

describe('app', () => {
  let app

  before(async () => {
    app = await setupApp(options)
    await app.get('db').sync()
  })

  after(async () => {
    await app.get('db').close()
  })

  it('must resolve root', async () =>
    server(app)
      .get('/')
      .expect(200)
      .expect(CONTENT_TYPE, MIME_HAL_JSON_UTF8)
      .expect({
        _links: {
          self: { href: '/' },
          health: { href: '/health' },
        },
      }))

  it('must start a server with health', async () =>
    server(app)
      .get('/health')
      .expect(200)
      .expect(CONTENT_TYPE, MIME_HAL_JSON_UTF8)
      .expect({
        ok: true,
        _links: {
          self: { href: '/health' },
          root: { href: '/' },
        },
      }))
})
