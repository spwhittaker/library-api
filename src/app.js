const express = require('express');
const userControllers = require('./controllers/users');

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send({
    message: 'Hello world!',
  });
});

app.post('/user', userControllers.create);

module.exports = app;
