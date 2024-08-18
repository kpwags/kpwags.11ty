import starRating from './starRating-shortcode.js';

const getThoughts = (book) => {
	if (book.thoughts === null || book.thoughts === '') {
		return '';
	}

	return `
<div class="view-thoughts">
	<button
		class="toggle-thoughts"
		data-id="${book.bookId}"
		data-type="book"
		type="button"
	>View Thoughts</button>
	<div class="thoughts hidden">${book.thoughts}</div>
</div>
	`;
};

const getProgress = ({ percentComplete }) => {
	if (percentComplete <= 0 || percentComplete >= 100) {
		return '';
	}

	return `
<div class="media-progress-bar" title="${percentComplete}% complete">
	<div class="bar">
		<div class="inner-bar" style="width: ${percentComplete}%"></div>
	</div>
</div>`;
};

const getBookNotesLink = (book) => {
	if (book.bookNotesUrl === null || book.bookNotesUrl === '') {
		return '';
	}

	return `<div class="book-notes-link"><a href="/books/${book.bookNotesUrl}">View Book Notes</a></div>`;
};

const getBookGenres = (book) => {
	const genres = book.genres.map((g) => g.name.replaceAll(' ', '-').toLowerCase());

	return genres.join(',');
};

const bookListingShortcode = (book) => `
<div class="item" data-book-id="${book.bookId}" data-booktype="${book.type.name.toLowerCase()}" data-genre="${getBookGenres(book)}">
	<div class="cover">
		<img src="${book.coverImageUrl}" alt="The cover for ${book.title}" height="225" width="150" />
		${getProgress(book)}
	</div>
	<div class="info">
		<a href="${book.link}" target="_blank" rel="noreferrer">
			${book.title}
		</a>

		<div class="full-title hidden">${book.fullTitle}</div>

		${book.subTitle ? `<div class="subtitle">${book.subTitle}</div>` : ''}

		<div class="meta">${book.author}</div>

		${book.rating !== null ? starRating(book.rating, 'sm') : ''}

		${getBookNotesLink(book)}

		${getThoughts(book)}
	</div>
</div>
`;

export default bookListingShortcode;
