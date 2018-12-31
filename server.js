const path = require('path');
const fs = require('fs');
const { parse } = require('url');
const express = require('express');
const serveIndex = require('serve-index');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const server = express();

  server.use('/content', express.static(path.join(__dirname, 'content')));
  server.use('/content', serveIndex(path.join(__dirname, 'content')));

  server.get('*', (req, res) => {
    const { pathname, query } = parse(req.url, true);
    const location = pathname.replace(/\/+$/, '');
    const folderPath = path.join(__dirname, `/content/pages${location}`);
    const contentPath = path.join(folderPath, 'index.md');
    const routeToRender = pathname === '/' ? '/' : '/content';

    if (fs.existsSync(contentPath)) {
      res.markdown = fs.readFileSync(contentPath).toString();
      res.folder =
        fs.readdirSync(folderPath).length > 1
          ? `/content/pages${location}`
          : '';
    }

    return app.render(
      req,
      res,
      routeToRender,
      Object.assign({ pathname }, query),
    );
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
