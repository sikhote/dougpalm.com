const pathMatch = require('path-match');

const route = pathMatch();
const pagesMatch = route('/pages/:id');
const blogMatch = route('/blog/:id');

module.exports = { pagesMatch, blogMatch };
