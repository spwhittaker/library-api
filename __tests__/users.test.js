const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = require('../src/app');
const User = require('../src/models/user');
const UserHelpers = require('../__tests__/user-helpers');

describe('Users', () => {
  beforeAll(done => {
    mongoose.connect(
      process.env.DATABASE_CONN,
      { useNewUrlParser: true, useUnifiedTopology: true },
      err => {
        console.log(err);
        done();
      },
    );
  });
  beforeEach(done => {
    mongoose.connection.db.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  it('logs something to the console', done => {
    const a = 3;
    expect(a).toEqual(3);
    done();
  });

  describe('POST /user', () => {
    it('creates a new user and returns a json object', done => {
      const data = {
        firstName: 'John',
        lastName: 'Willoughby',
        email: 'will@johnoughby.com',
        password: 'somethingSecure',
      };
      /* request(app)
        .post('/user')
        .send(data) */
      console.log(UserHelpers);
      UserHelpers.signUp(app, data)
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body).not.toHaveProperty('password');

          User.findById(res.body._id, (err, user) => {
            expect(user.firstName).toBe('John');
            expect(user.lastName).toBe('Willoughby');
            expect(user.email).toBe('will@johnoughby.com');
            expect(user.password).not.toBe('somethingSecure');
            expect(user.password.length).toBe(60);

            done();
          });
        })
        .catch(error => done(error));
    });

    it('validates the email address', done => {
      const data = {
        firstName: 'John',
        lastName: 'Willoughby',
        email: 'wily.com',
        password: 'somethingSecure',
      };
      request(app)
        .post('/user')
        .send(data)
        .then(res => {
          expect(res.body.errors.email).toBe('Invalid email address');
        });
      done();
    });

    it('validates the password', done => {
      const data = {
        firstName: 'John',
        lastName: 'Willoughby',
        email: 'wily@doctor.com',
        password: 'summat',
      };
      request(app)
        .post('/user')
        .send(data)
        .then(res => {
          expect(res.body.errors.password).toBe('Password must be at least 8 characters long');
        });
      done();
    });
  });
});
