const MarkdownIt = require('markdown-it');

module.exports = (str) => {
	try {
		return new MarkdownIt({ html: true, linkify: true }).renderInline(str);
	} catch {
		return '';
	}
}