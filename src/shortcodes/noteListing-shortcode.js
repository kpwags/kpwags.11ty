const noteListingShortcode = (note) => `
<article class="note">
	<h2><a href="${note.url}">${note.data.title}</a></h2>
	<div class="metadata">
		<div class="post-date">${note.data.dateString}</div>
		<div class="separator">&bull;</div>
		<div class="post-date">${note.data.author}</div>
	</div>
	<div class="content">${note.templateContent}</div>
	<div class="view-link"><a href="${note.data.link}">Read More</a></div>
</article>
`;

export default noteListingShortcode;
