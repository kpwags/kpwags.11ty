import MarkdownIt from 'markdown-it';

const toHtmlFilter = (str) => {
	try {
		const html = new MarkdownIt({ html: true, linkify: true }).renderInline(str);

		return html
			.replaceAll('&amp;', '&');
	} catch {
		return '';
	}
};

export default toHtmlFilter;
