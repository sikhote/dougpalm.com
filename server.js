const path = require('path');
const { parse } = require('url');
const express = require('express');
const serveIndex = require('serve-index');
const next = require('next');
const { pagesMatch, blogMatch } = require('./lib/routing');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use('/content', express.static(path.join(__dirname, 'content')));
  server.use('/content', serveIndex(path.join(__dirname, 'content')));

  server.get('*', (req, res) => {
    const { pathname, query } = parse(req.url, true);
    const pagesParams = pagesMatch(pathname);
    const blogParams = blogMatch(pathname);

    if (pagesParams || blogParams) {
      app.render(
        req,
        res,
        '/pages',
        Object.assign(
          {
            ...(pagesParams || blogParams),
            type: pagesParams ? 'pages' : 'blog',
          },
          query,
        ),
      );
    } else {
      handle(req, res);
    }
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
