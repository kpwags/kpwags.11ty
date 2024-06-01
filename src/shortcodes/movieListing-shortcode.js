import starRating from './starRating-shortcode.js';

const getThoughts = (movie) => {
	if (movie.thoughts === null) {
		return '';
	}

	return `
<div class="view-thoughts">
	<button
		class="toggle-thoughts"
		id="toggle-btn-${movie.id}"
		type="button"
	>View Thoughts</button>
	<div class="thoughts hidden" id="thoughts-${movie.id}">${movie.thoughts}</div>
</div>
	`;
}

const movieShortcode = (movie) => {
	const dateWatched = movie.dateWatched ? `<div class="meta small">${movie.dateWatched}</div>` : '';

	return `
<div class="item">
	<div>
		<img src="${movie.cover}" alt="${movie.title}" class="cover" height="225" width="150" />
	</div>
	<div>
		<a href="${movie.link}" target="_blank" rel="noreferrer">
			${movie.title}
		</a>

		${dateWatched}

		${starRating(movie.rating, "sm")}

		${getThoughts(movie)}
	</div>
</div>
	`;
};

export default movieShortcode;
