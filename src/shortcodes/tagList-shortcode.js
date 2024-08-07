import tagUrlFilter from './../filters/tagurl-filter.js';

const tagListShortcode = (tags) => {
	const renderedTags = tags
		.filter((t) => !['post', 'readinglog', 'shortnotes'].includes(t));

	const links = renderedTags.map((tag) => `<li><a href="/tag/${tagUrlFilter(tag)}">${tag}</a></li>`);

	return `
		<ul class="titled-horizontal-list">
			<li class="lead">Tagged:</li>
			${links.join('')}
		</ul>
	`;
};

export default tagListShortcode;
