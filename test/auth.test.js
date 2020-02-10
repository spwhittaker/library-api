const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const userHelpers = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');

describe('User logs in', () => {
  it('creates user and sends a POST request to /auth/login', done => {
    const data = DataFactory.user();
    userHelpers.signUp(app, data).then();
    request(app)
      .post('/auth/login')
      .send({ email: data.password, password: data.password })
      .then(res => {
        expect(res.status).toBe(200);
        expect(jwt.decode(res.body.token)).toBe(data.password);
        expect(res.body.token).toHaveProperty('_id');
        expect(res.body.token).toHaveProperty('firstName');
        expect(res.body.token).toHaveProperty('lastName');
        done();
      });
  });
});
