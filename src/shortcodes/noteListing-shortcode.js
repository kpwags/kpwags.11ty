const getDomainFromUrl = require('../filters/domain-filter.js');

module.exports = (note) => `
<article class="note">
	<h2><a href="${note.data.link}">${note.data.title}</a></h2>
	<div class="metadata">
		<div class="domain">${getDomainFromUrl(note.data.link)}</div>
		<div class="separator">&bull;</div>
		<div class="post-date">${note.data.dateString}</div>
	</div>
	<div class="content">${note.templateContent}</div>
	<div><a href="${note.url}">Permalink</a></div>
</article>
`;
