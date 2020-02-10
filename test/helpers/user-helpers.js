/* eslint-disable no-new */
const request = require('supertest');

exports.signUp = (app, data) => {
  return new Promise((resolve, reject) => {
    request(app)
      .post('/user')
      .send(data)
      .end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
  });
};
