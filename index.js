const http = require('http');
const { URL } = require('url');
const url = 'http://localhost:3000'

const routes = require('./routes')

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(`${url}${req.url}`);

  console.log(`Request method: ${req.method} | Endpoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  let id = null

  const splitEndpoint = pathname.split('/').filter((Boolean));

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === req.method
  ));

  if (route) {
    req.query = parsedUrl.query;
    req.params = { id };
    route.handler(req, res);
  } else {
    res.end(`Cannot ${req.method} ${parsedUrl}`);
  }

});

server.listen(3000, () => console.log('Server started at http://localhost:3000'))