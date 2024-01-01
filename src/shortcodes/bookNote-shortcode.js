const starRating = require('./starRating-shortcode');

module.exports = (bookNote) => {
	const categories = [];

	bookNote.data.categories.forEach((category) => {
		categories.push(`<span class="category">${category}</span>`);
	});

	return `
<article class="book-note-card">
	<div class="content">
		<div class="image">
			<img src="${bookNote.data.coverImage}" alt="${bookNote.data.author} - ${bookNote.data.title}" />
		</div>
		<div>
			<h2><a href="${bookNote.url}">${bookNote.data.title}</a></h2>
			<h3>by ${bookNote.data.author}</h3>

			<div class="metadata">${bookNote.data.dateString}</div>

			${starRating(bookNote.data.rating)}

			<div class="categories">
				${categories.join('')}
			</div>
		</div>
	</div>
</article>
	`;
};
