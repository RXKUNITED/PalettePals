require('dotenv').config();
const server = require('./server');

const port = process.env.PG_PORT || 3000;
const host = process.env.PG_HOST || '127.0.0.1';

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
