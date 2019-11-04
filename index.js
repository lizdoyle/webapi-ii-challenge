const express = require('express'); // import the express package
const db = require('./data/db');

const server = express(); // creates the server

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Server is working');
});


server.post('/api/posts', (req, res) => {




})
// watch for connections on port 5000
server.listen(5000, () =>
  console.log('\n===Server running on http://localhost:5000===\n')
);