import MarkdownIt from 'markdown-it';

const inDepthShortcode = (children, author, title, link) => {
	const content = new MarkdownIt({ html: true, linkify: true, typographer: true }).renderInline(children);

	return `
<div class="in-depth-notes">
	<a href="${link}">${title}</a>
	<div class="in-depth-meta">${author}</div>
	<div class="in-depth-text">
		${content}
	</div>
</div>

<hr />
`;
};

export default inDepthShortcode;
