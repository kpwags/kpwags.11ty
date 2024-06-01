import starRating from './starRating-shortcode.js';

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

const tvListingShortcode = (tvShow) => {
	const getRating = tvShow.rating !== null ? starRating(tvShow.rating, "sm") : '';

	return `
<div class="item">
	<div>
		<img src="${tvShow.cover}" alt="${tvShow.title}" class="cover" height="225" width="150" />
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

export default tvListingShortcode;
