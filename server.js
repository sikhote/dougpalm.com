const { createServer } = require('http');
const next = require('next');
const { pagesMatch, blogMatch } = require('./lib/routing');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() =>
  createServer((req, res) => {
    const { pathname, searchParams } = new URL(
      req.url,
      `http://localhost:${port}`,
    );
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
          searchParams,
        ),
      );
    } else {
      handle(req, res);
    }
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  }),
);
