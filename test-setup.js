const mongoose = require('mongoose');

beforeAll(done => {
  mongoose.connect(
    process.env.DATABASE_CONN,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (err) {
        console.log(err);
      }
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
