import MarkdownIt from 'markdown-it';

const inDepthShortcode = (children, author, title, link) => {
	const content = new MarkdownIt({ html: true, linkify: true, typographer: true }).renderInline(children);

	return `
<div class="shared-link">
	<h3><a href="${link}">${title}</a></h3>
	<div class="posted-by">${author}</div>
	${content}
</div>
`;
};

export default inDepthShortcode;
