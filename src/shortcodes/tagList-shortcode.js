import tagUrlFilter from './../filters/tagurl-filter.js';

const tagListShortcode = (tags) => {
	const renderedTags = tags
		.filter((t) => !['post', 'readinglog', 'shortnotes', 'weeknote'].includes(t));

	const links = renderedTags.map((tag) => `<li><a href="/tag/${tagUrlFilter(tag)}">${tag}</a></li>`);

	return `
		<ul class="titled-horizontal-list">
			<li><strong>Tagged:</strong></li>
			${links.join('')}
		</ul>
	`;
};

export default tagListShortcode;
