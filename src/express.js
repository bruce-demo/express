const http = require('http');
const url = require('url');

function createApplication() {
  function app(req, res) {
    for (let i = 0; i < app.routes.length; i++) {
      const { method, path, handler } = app.routes[i];
      const m = req.method.toLowerCase();
      const { pathname } = url.parse(req.url);
      
      if ((method === m || method === 'all') && (path === pathname || path === '*')) {
        return handler(req, res);
      }
    }
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

  return app;
};

module.exports = createApplication;