module.exports = (note) => `
<article class="note">
	<h2><a href="${note.data.link}">${note.data.title}</a></h2>
	<div class="metadata">
		<div class="post-date">
			<a href="${note.url}">${note.data.dateString}</a>
		</div>
	</div>
	<div class="content">${note.templateContent}</div>
</article>
`;
