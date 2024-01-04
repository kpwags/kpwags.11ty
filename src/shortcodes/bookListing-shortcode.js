const starRating = require('./starRating-shortcode');

const getThoughts = (book) => {
	if (book.thoughts === null) {
		return '';
	}

	return `
<div class="view-thoughts">
	<button
		class="toggle-thoughts"
		id="toggle-btn-${book.id}"
		type="button"
	>View Thoughts</button>
	<div class="thoughts hidden" id="thoughts-${book.id}">${book.thoughts}</div>
</div>
	`;
};

const getBookNotesLink = (book) => {
	if (book.reviewUrlSlug === null || book.reviewUrlSlug === '') {
		return '';
	}

	return `<div class="book-notes-link"><a href="/books/${book.reviewUrlSlug}">View Book Notes</a></div>`
};

module.exports = (book) => `
<div class="item">
	<div>
		<img src="${book.coverUrl}" alt="The cover for ${book.title}" class="cover" height="225" width="150" />
	</div>
	<div>
		<a href="${book.link}" target="_blank" rel="noreferrer">
			${book.title}
		</a>

		${book.subtitle ? `<div class="subtitle">${book.subtitle}</div>` : ''}

		<div class="meta">${book.author}</div>

		${book.rating !== null ? starRating(book.rating, "sm") : ''}

		${getBookNotesLink(book)}

		${getThoughts(book)}
	</div>
</div>
`;
