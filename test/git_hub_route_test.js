let supertest = require('supertest');
let app = require('../app');
let agent = supertest.agent(app);


describe('GET /', function () {
  it('gets 200 on index', function (done) {
    agent
    .get('/')
    .expect(200, done);
  });
  it('gets 200 when calling api', function (done) {
    agent
    .get('/api')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});
