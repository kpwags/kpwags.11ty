import toHTML from '../filters/tohtml-filter.js';
import readingTime from '../filters/readingTime-filter.js';

const blogPostShortcode = (post, type) => {
	const readingTimeDiv = !post.data.title.includes('Reading Log - ')
		? `<div class="separator">&bull;</div><div>${readingTime(post)}</div>`
		: '';

	return `
<article class="post ${type}">
	<h2><a href="${post.url}">${post.data.title}</a></h2>
	<div class="metadata">
		<div class="post-date">${post.data.dateString}</div>
		${readingTimeDiv}
	</div>
	<div class="content">${toHTML(post.data.page.excerpt)}</div>
</article>
`;
};

export default blogPostShortcode;
