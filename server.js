const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);
    const fileName = pathname.replace(/\/+$/, '');
    const contentPath = path.join(
      __dirname,
      '/static/content/pages/',
      `${fileName}.md`,
    );
    const routeToRender = pathname === '/' ? '/' : '/content';

    if (fs.existsSync(contentPath)) {
      res.content = fs.readFileSync(contentPath).toString();
    }

    app.render(req, res, routeToRender, Object.assign({ pathname }, query));
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
