const mongoose = require('mongoose');
const app = require('./src/app');

const APP_PORT = 3000;

mongoose.connect(
  process.env.DATABASE_CONN,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(err);
    }
    app.listen(APP_PORT, () => {
    (`Now serving your Express app at http://localhost:${APP_PORT}`); // eslint-disable-line
    });
  },
);
