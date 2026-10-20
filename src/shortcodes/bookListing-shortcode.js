import starRating from './starRating-shortcode.js';

const getProgress = (progress) => `
<div class="progress">
	<span>Progress</span>
	<div class="media-progress-bar" title="${progress}% complete">
		<div class="bar">
			<div class="inner-bar" style="width: ${progress}%">${progress}%</div>
		</div>
	</div>
</div>`;

const getBookGenres = (book) => {
	const genres = (book.genres ?? []).map((g) => g.name.replaceAll(' ', '-').toLowerCase());

	return genres.join(',');
};

const getBookFormat = (book) => {
	const formats = (book.genres ?? []).map((g) => g.name.replaceAll(' ', '-'));

	return formats.length > 0 ? formats[0] : '';
};

const getLink = (showRatingThoughts, book) => {
	if (!showRatingThoughts || book.thoughts === null || book.thoughts === '') {
		return book.link;
	}

	if (book.bookNotesUrl === null || book.bookNotesUrl === '') {
		return `/bookshelf/book/${book.bookId}`;
	}

	return `/books/${book.bookNotesUrl}`;
}

const bookListingShortcode = (book, showProgress, showRatingThoughts) => `
<div
	class="media-box"
	data-book-id="${book.bookId}"
	data-title="${book.fullTitle}"
	data-booktype="${(book.type?.name ?? '').toLowerCase()}"
	data-genre="${getBookGenres(book)}"
	data-format="${getBookFormat(book)}"
>
	<div class="container">
		<img src="${book.coverImageUrl}" alt="The cover for ${book.title}" height="225" width="150" />
		<div class="details">
			<div class="title-section">
				<div class="title">
					<a href="${getLink(showRatingThoughts, book)}">
						${book.fullTitle}
					</a>
				</div>
			</div>

			<div class="meta">${book.author}</div>

			${showProgress ? getProgress(book.progress) : ''}

			${showRatingThoughts && book.rating !== null ? starRating(book.rating) : ''}
		</div>
	</div>
</div>
`;

export default bookListingShortcode;
