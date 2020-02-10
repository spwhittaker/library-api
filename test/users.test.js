const app = require('../src/app');
const User = require('../src/models/user');
const userHelpers = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');

describe('Users', () => {
  it('logs something to the console', done => {
    const a = 3;
    expect(a).toEqual(3);
    done();
  });

  describe('POST /user', () => {
    it('creates a new user and returns a json object', done => {
      const data = DataFactory.user();

      userHelpers
        .signUp(app, data)
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body).not.toHaveProperty('password');

          User.findById(res.body._id, (err, user) => {
            expect(user).toHaveProperty('firstName');
            expect(user).toHaveProperty('lastName');
            expect(user).toHaveProperty('email');
            expect(user.password).not.toBe(data.password);
            expect(user.password.length).toBe(60);

            done();
          });
        })
        .catch(error => done(error));
    });

    it('validates the email address', done => {
      const data = DataFactory.user({ email: 'invalid' });
      userHelpers
        .signUp(app, data)
        .then(res => {
          expect(res.body.errors.email).toBe('Invalid email address');
        })
        .catch(error => done(error));
      done();
    });

    it('validates the password', done => {
      const data = DataFactory.user({ password: 'uwotm8' });
      userHelpers
        .signUp(app, data)
        .then(res => {
          expect(res.body.errors.password).toBe('Password must be at least 8 characters long');
        })
        .catch(error => done(error));
      done();
    });
  });
});
