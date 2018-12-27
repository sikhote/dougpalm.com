const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);
    const contentPath = path.join('/static/content/pages/', pathname);
    res.content = fs.existsSync(contentPath)
      ? 'yes'
      : 'nooo';

     'sdsdsd';
    app.render(req, res, '/', Object.assign({ pathname }, query));
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
