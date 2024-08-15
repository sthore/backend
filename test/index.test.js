const { before, after, describe, it } = require('node:test')
const server = require('supertest')
const setupApp = require('../app')
const options = require('./config')

const CONTENT_TYPE = 'content-type'
const MIME_HAL_JSON_UTF8 = 'application/hal+json; charset=utf-8'

describe('app', () => {
  let app

  before(async () => {
    app = await setupApp(options.app)
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

  it('should respond with product list', async (t) => {
    const findAllMock = t.mock.method(
      app.get('db').model('products'),
      'findAll',
      () => [
        {
          id: 1,
          toJSON: () => ({
            id: 1,
            sku: 'ABC',
            name: 'My product',
            description: 'A simple product from my store',
            createdAt: '2024-05-25T09:00:00Z',
            updatedAt: '2024-05-25T09:00:00Z',
            deletedAt: null,
          }),
        },
      ],
    )
    await server(app)
      .get('/api/v1/products')
      .expect(200)
      .expect(CONTENT_TYPE, MIME_HAL_JSON_UTF8)
      .expect((res) => t.assert.snapshot(res.body))
  })
})
