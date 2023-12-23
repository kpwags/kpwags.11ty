const starRating = require('./starRating-shortcode');

const getThoughts = (tvShow) => {
	if (tvShow.thoughts === null) {
		return '';
	}

	return `
<div class="view-thoughts">
	<button
		class="toggle-thoughts"
		id="toggle-btn-${tvShow.id}"
		type="button"
	>View Thoughts</button>
	<div class="thoughts hidden" id="thoughts-${tvShow.id}">${tvShow.thoughts}</div>
</div>
	`;
}

module.exports = (tvShow) => {
	const getRating = tvShow.rating !== null ? starRating(tvShow.rating) : '';

	return `
<div class="item">
	<div>
		<a href="${tvShow.link}" target="_blank" rel="noreferrer">
			<img src="${tvShow.cover}" alt="${tvShow.title}" class="cover" height="300" width="200" />
		</a>
	</div>
	<div>
		<a href="${tvShow.link}" target="_blank" rel="noreferrer">
			${tvShow.title}
		</a>

		${getRating}

		${getThoughts(tvShow)}
	</div>
</div>
	`;
};
