const http = require('http');
const { URL } = require('url');
const url = 'http://localhost:3000'

const routes = require('./routes')

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(`${url}${req.url}`);

  console.log(`Request method: ${req.method} | Endpoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;

  const splitEndpoint = pathname.split('/');

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === req.method
  ));

  if (route) {
    req.query = Object.fromEntries(parsedUrl.searchParams);
    route.handler(req, res);
  } else {
    res.end(`Cannot ${req.method} ${parsedUrl}`);
  }

});

server.listen(3000, () => console.log('Server started at http://localhost:3000'))