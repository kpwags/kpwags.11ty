const toHTML = require('../filters/tohtml-filter');
const readableDate = require('../filters/date-filter');
const readingTime = require('../filters/readingTime-filter');

module.exports = (post) => {
	const readingTimeDiv = !post.data.title.includes('Reading Log - ')
		? `<div class="separator">&bull;</div> <div>${readingTime(post)}</div>`
		: '';

	return `
<article class="post">
	<h2><a href="${post.url}">${post.data.title}</a></h2>
	<div class="metadata">
		<div class="post-date">${readableDate(post.data.date)}</div>
		${readingTimeDiv}
	</div>
	<div class="excerpt">${toHTML(post.data.page.excerpt)}</div>
</article>
`;
}
