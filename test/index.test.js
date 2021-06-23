const { describe, it } = require('zunit');
const server = require('supertest');
const app = require('../app');

describe('app', () => {
  it('must start a server with health', async () => {
    await server(app)
      .get('/health')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .expect({ok:true});
  });
});
