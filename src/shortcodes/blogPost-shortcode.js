import toHTML from '../filters/tohtml-filter.js';

const blogPostShortcode = (post, type) => {
	return `
<article class="post-snippet ${type === 'weeknote' ? 'blogpost' : type}">
	<div class="content">
		<h2><a href="${post.url}">${post.data.title}</a></h2>
		<div class="metadata">${post.data.dateString}</div>
		${type === 'weeknote' ? '' : `<div class="excerpt">${toHTML(post.data.page.excerpt)}</div>`}
	</div>
</article>
${type === 'weeknote' ? '' : '<hr />'}
`;
};

export default blogPostShortcode;
