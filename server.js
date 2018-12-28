const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);
    const fileName = pathname.replace(/\/+$/, '') || 'home';
    const contentPath = path.join(
      __dirname,
      '/static/content/pages/',
      `${fileName}.md`,
    );

    if (fs.existsSync(contentPath)) {
      res.content = fs.readFileSync(contentPath).toString();
    }

    app.render(req, res, '/', Object.assign({ pathname }, query));
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
