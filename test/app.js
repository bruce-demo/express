const express = require('../src/express');

const app = express();

app.use((req, res, next) => {
  console.log('Before request');
  next();
  console.log('After request');
});

app.use((req, res, next) => {
  console.log('Request time: ' + Date.now());
  next();
  console.log('Response time: ' + Date.now());
});

app.get('/a', (req, res, next) => {
  res.end('Get "/a"');
  next();
});

app.post('/b', (req, res) => {
  res.end('Post "/b"');
});

app.all('*', (req, res) => {
  res.end('All "*"');
});

app.listen(3000, () => {
  console.log('Server start');
});