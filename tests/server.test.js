const request = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('GET /healthcheck', () => {
  it('responds responds to the world', async function() {
    const res = await request(app)
      .get('/healthcheck')
      .set('Accept', 'application/json');

    assert.equal(res.status, 200);
    assert.equal(res.type, 'application/json');
    assert.equal(res.body.message, 'ok');
  });
});

describe('GET /404', () => {
  it('responds with a 404', async function() {
    const res = await request(app)
      .get('/404')
      .set('Accept', 'application/json');

    assert.equal(res.status, 404);
  });
});
