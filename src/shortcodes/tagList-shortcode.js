const tagUrlFilter = require('./../filters/tagurl-filter.js');

module.exports = (tags) => {
	const renderedTags = tags
		.filter((t) => !['post', 'readinglog'].includes(t));

	const links = renderedTags.map((tag) => `<li><a href="/tag/${tagUrlFilter(tag)}">${tag}</a></li>`);

	return `
		<ul class="tag-list">
			<li class="lead">Tagged:</li>
			${links.join('<li class="tag-separator">&bull;</li>')}
		</ul>
	`;
}