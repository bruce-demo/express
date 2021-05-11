const express = require('../src/express');

const app = express();

app.get('/a', (req, res) => {
  res.end('Get "/a"');
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