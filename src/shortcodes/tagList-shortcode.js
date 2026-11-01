import tagUrlFilter from './../filters/tagurl-filter.js';

const tagListShortcode = (tags) => {
	const renderedTags = tags
		.filter((t) => !['post', 'readinglog', 'shortnotes', 'weeknote'].includes(t));

	const links = renderedTags.map((tag) => `
		<li>
			<a href="/tag/${tagUrlFilter(tag)}">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
					<path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
					<path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z"/>
				</svg>
				<span>${tag}</span>
			</a>
		</li>
	`);

	return `
		<ul class="tag-list">
			${links.join('')}
		</ul>
	`;
};

export default tagListShortcode;
