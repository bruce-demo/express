const http = require('http');
const url = require('url');

function createApplication() {
  function app(req, res) {
    let index = 0;

    function next() {
      if (index >= app.routes.length) {
        return;
      }

      const { method, path, handler } = app.routes[index++];
      const m = req.method.toLowerCase();
      const { pathname } = url.parse(req.url);

      if (method === 'middle') {
        if (pathname.startsWith(path)) {
          handler(req, res, next);
        } else {
          next();
        }
      } else {
        if ((method === m || method === 'all') && (path === pathname || path === '*')) {
          handler(req, res, next);
        } else {
          next();
        }
      }
    }

    next();
  }

  app.routes = [];

  [...http.METHODS, 'all'].forEach((method) => {
    method = method.toLowerCase();

    app[method] = function (path, handler) {
      app.routes.push({
        method,
        path,
        handler
      });
    };
  });

  app.listen = function (...args) {
    const server = http.createServer(app);

    server.listen(...args);
  };

  app.use = function (path, handler) {
    if (typeof path === 'function') {
      handler = path;
      path = '/';
    }

    app.routes.push({
      method: 'middle',
      path,
      handler
    });
  };

  return app;
};

module.exports = createApplication;