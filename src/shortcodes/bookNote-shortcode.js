import starRating from './starRating-shortcode.js';

const bookNoteShortcode = (bookNote) => {
	const categories = [];

	bookNote.data.categories.forEach((category) => {
		categories.push(`<span class="category">${category}</span>`);
	});

	const subtitle = bookNote.data.subtitle.length > 0
		? `<h3>${bookNote.data.subtitle}</h3>`
		: '';

	return `
<article class="book-note-card">
	<div class="content">
		<div class="image">
			<img src="${bookNote.data.coverImage}" alt="${bookNote.data.author} - ${bookNote.data.title}" />
		</div>
		<div>
			<h2><a href="${bookNote.url}">${bookNote.data.title}</a></h2>
			${subtitle}
			<h4>by ${bookNote.data.author}</h4>

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

export default bookNoteShortcode;
