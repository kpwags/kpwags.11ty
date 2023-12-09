const MarkdownIt = require('markdown-it');

module.exports = (str) => {
	return new MarkdownIt({ html: true, linkify: true }).renderInline(str);
}