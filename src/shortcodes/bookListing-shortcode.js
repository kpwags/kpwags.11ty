import starRating from './starRating-shortcode.js';

const getThoughts = (book) => {
	if (book.thoughts === null || book.thoughts === '') {
		return '';
	}

	return `
<div class="view-thoughts">
	<button
		class="btn-ghost toggle-thoughts"
		data-id="${book.bookId}"
		data-type="book"
		type="button"
	>View Thoughts</button>
	<div class="thoughts hidden">${book.thoughts}</div>
</div>
	`;
};

const getProgress = ({ progress }) => {
	if (progress <= 0 || progress >= 100) {
		return '';
	}

	return `
<div class="media-progress-bar" title="${progress}% complete">
	<div class="bar">
		<div class="inner-bar" style="width: ${progress}%"></div>
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
	const genres = (book.genres ?? []).map((g) => g.name.replaceAll(' ', '-').toLowerCase());

	return genres.join(',');
};

const getBookFormat = (book) => {
	const formats = (book.genres ?? []).map((g) => g.name.replaceAll(' ', '-'));

	return formats.length > 0 ? formats[0] : '';
};

const bookListingShortcode = (book, showProgress, showRatingThoughts) => `
<div
	class="item"
	data-book-id="${book.bookId}"
	data-title="${book.fullTitle}"
	data-booktype="${(book.type?.name ?? '').toLowerCase()}"
	data-genre="${getBookGenres(book)}"
	data-format="${getBookFormat(book)}"
\>
	<div class="cover">
		<img src="${book.coverImageUrl}" alt="The cover for ${book.title}" height="225" width="150" />
		${showProgress ? getProgress(book) : ''}
	</div>
	<div class="info">
		<a href="${book.link}" target="_blank" rel="noreferrer">
			${book.title}
		</a>

		<div class="full-title hidden">${book.fullTitle}</div>

		<div class="meta">${book.author}</div>

		${showRatingThoughts && book.rating !== null ? starRating(book.rating, 'sm') : ''}

		${showRatingThoughts ? getBookNotesLink(book) : ''}

		${showRatingThoughts ? getThoughts(book) : ''}
	</div>
</div>
`;

export default bookListingShortcode;
