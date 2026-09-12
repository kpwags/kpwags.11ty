import MarkdownIt from 'markdown-it';
import domainFilter from './../filters/domain-filter.js';

export const sharedLink = (children, title, url, author) => {
	const content = new MarkdownIt({ html: true, linkify: true, typographer: true }).render(children);

	return `
<div class="shared-link">
	<h3><a href="${url}">${title}</a></h3>
	<div class="posted-by">${author}</div>
	<div>${content}</div>
</div>
`;
};

