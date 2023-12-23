const starRating = require('./starRating-shortcode');

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

module.exports = (movie) => {
	const dateWatched = movie.dateWatched ? `<div class"meta">${movie.dateWatched}</div>` : '';

	return `
<div class="item">
	<div>
		<a href="${movie.link}" target="_blank" rel="noreferrer">
			<img src="${movie.cover}" alt="${movie.title}" class="cover" height="300" width="200" />
		</a>
	</div>
	<div>
		<a href="${movie.link}" target="_blank" rel="noreferrer">
			${movie.title}
		</a>

		${dateWatched}

		${starRating(movie.rating)}

		${getThoughts(movie)}
	</div>
</div>
	`;
}