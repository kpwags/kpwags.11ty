import starRating from './starRating-shortcode.js';

const bookNoteShortcode = (bookNote) => {
	const categories = [];

	bookNote.data.categories.forEach((category) => {
		categories.push(`<span class="category">${category}</span>`);
	});

	return `
<article class="book-note-card">
	<div class="content">
		<div class="image">
			<img src="${bookNote.data.coverImage}" alt="${bookNote.data.author} - ${bookNote.data.fullTitle}" />
		</div>
		<div class="info">
			<h2><a href="${bookNote.url}">${bookNote.data.fullTitle}</a></h2>
			<div class="author">by ${bookNote.data.author}</div>

			<div class="date">${bookNote.data.dateString}</div>

			${starRating(bookNote.data.rating)}

			<div class="categories">
				${categories.join('')}
			</div>
		</div>
	</div>
</article>
	`;
};

export default bookNoteShortcode;
