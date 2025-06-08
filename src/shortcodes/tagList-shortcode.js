import tagUrlFilter from './../filters/tagurl-filter.js';

const tagListShortcode = (tags) => {
	const renderedTags = tags
		.filter((t) => !['post', 'readinglog', 'shortnotes', 'weeknote'].includes(t));

	const links = renderedTags.map((tag) => `<li><a href="/tag/${tagUrlFilter(tag)}">${tag}</a></li>`);

	return `
		<div class="titled-horizontal-list">
			<div class="lead">Tagged:</div>
			<ul>
				${links.join('')}
			</ul>
		</div>
	`;
};

export default tagListShortcode;
