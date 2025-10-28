import dayjs from 'dayjs';
import starRating from './starRating-shortcode.js';

const getThoughts = (movie) => {
	if (movie.thoughts === null || movie.thoughts === '') {
		return '';
	}

	return `
<div class="view-thoughts">
	<button
		class="btn-ghost toggle-thoughts"
		id="toggle-btn-${movie.movieId}"
		data-id="${movie.movieId}"
		data-type="movie"
		type="button"
	>View Thoughts</button>
	<div class="thoughts hidden" id="thoughts-${movie.movieId}">${movie.thoughts}</div>
</div>
	`;
};

const movieShortcode = (movie) => {
	const dateWatched = movie.dateWatched ? `<div class="meta small">${dayjs(movie.dateWatched).format('MMMM D, YYYY')}</div>` : '';

	return `
<div class="item" data-movie-id="${movie.movieId}">
	<div class="cover">
		<img src="${movie.posterImageUrl}" alt="${movie.title}" height="300" width="200" />
	</div>
	<div class="info">
		<a href="${movie.imdbLink}" target="_blank" rel="noreferrer">
			${movie.title}
		</a>

		<div class="metadata">${dateWatched}</div>

		${starRating(movie.rating, 'sm')}

		${getThoughts(movie)}
	</div>
</div>
	`;
};

export default movieShortcode;
