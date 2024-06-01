import MarkdownIt from 'markdown-it';

const inDepthShortcode = (children, author, title, link) => {
	const content = new MarkdownIt({ html: true, linkify: true, typographer: true }).renderInline(children);

	return `
<div class="in-depth-notes">
	<h3>
		<span class="source">${author}:</span>
		<a href="${link}">${title}</a>
	</h3>
	<div class="thoughts">
		${content}
	</div>
</div>

<hr />
`;
};

export default inDepthShortcode;
