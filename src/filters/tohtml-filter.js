import MarkdownIt from 'markdown-it';

const toHtmlFilter = (str) => {
	try {
		return new MarkdownIt({ html: true, linkify: true }).renderInline(str);
	} catch {
		return '';
	}
};

export default toHtmlFilter;
