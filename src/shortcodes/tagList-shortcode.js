import tagUrlFilter from './../filters/tagurl-filter.js';

const tagListShortcode = (tags) => {
	const renderedTags = tags
		.filter((t) => !['post', 'readinglog'].includes(t));

	const links = renderedTags.map((tag) => `<li><a href="/tag/${tagUrlFilter(tag)}">${tag}</a></li>`);

	return `
		<ul class="tag-list">
			<li class="lead">Tagged:</li>
			${links.join('<li class="tag-separator">&bull;</li>')}
		</ul>
	`;
};

export default tagListShortcode;
