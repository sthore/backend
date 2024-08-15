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
          products: { href: '/api/v1/products' },
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
    t.mock.method(app.get('db').model('products'), 'findAll', () => [
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
    ])
    await server(app)
      .get('/api/v1/products')
      .expect(200)
      .expect(CONTENT_TYPE, MIME_HAL_JSON_UTF8)
      .expect((res) => t.assert.snapshot(res.body))
  })

  it('should respond with one product', async (t) => {
    const uuid = '7fbc190c-192b-4042-9f01-3b31706d20f7'
    t.mock.method(app.get('db').model('products'), 'findByPk', () => ({
      id: uuid,
      toJSON: () => ({
        id: uuid,
        sku: 'ABC',
        name: 'My product',
        description: 'A simple product from my store',
        createdAt: '2024-05-25T09:00:00Z',
        updatedAt: '2024-05-25T09:00:00Z',
        deletedAt: null,
      }),
    }))
    await server(app)
      .get(`/api/v1/products/${uuid}`)
      .expect(200)
      .expect(CONTENT_TYPE, MIME_HAL_JSON_UTF8)
      .expect((res) => t.assert.snapshot(res.body))
  })

  it('should respond with 404 when no uuid on param', async () => {
    await server(app).get('/api/v1/products/no-uuid').expect(404)
  })

  it('should respond with 404 when resource not found', async (t) => {
    const uuid = '7fbc190c-192b-4042-9f01-3b31706d20f7'
    t.mock.method(app.get('db').model('products'), 'findByPk', () => null)
    await server(app).get(`/api/v1/products/${uuid}`).expect(404)
  })
})
