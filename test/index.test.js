const { describe, it } = require('node:test')
const server = require('supertest')
const app = require('../app')

const CONTENT_TYPE = 'content-type'
const MIME_JSON_UTF8 = 'application/hal+json; charset=utf-8'

describe('app', () => {
  it('must resolve root', () => server(app)
    .get('/')
    .expect(200)
    .expect(CONTENT_TYPE, MIME_JSON_UTF8)
    .expect({
      _links: {
        self: { href: '/' },
        health: { href: '/health' },
      },
    }))

  it('must start a server with health', () => server(app)
    .get('/health')
    .expect(200)
    .expect(CONTENT_TYPE, MIME_JSON_UTF8)
    .expect({
      ok: true,
      _links: {
        self: { href: '/health' },
        root: { href: '/' },
      },
    }))
})
