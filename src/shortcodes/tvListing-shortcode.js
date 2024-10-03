import starRating from './starRating-shortcode.js';

const getProgress = ({ progress }) => {
	if (progress === 0 || progress === 100) {
		return '';
	}

	return `
<div class="media-progress-bar" title="${progress}% complete">
	<div class="bar">
		<div class="inner-bar" style="width: ${progress}%"></div>
	</div>
</div>`;
};

const getThoughts = (tvShow) => {
	if (tvShow.thoughts === null || tvShow.thoughts === '') {
		return '';
	}

	return `
<div class="view-thoughts">
	<button
		class="toggle-thoughts"
		type="button"
		data-id="${tvShow.televisionShowId}"
		data-type="tv"
	>View Thoughts</button>
	<div class="thoughts hidden" id="thoughts-${tvShow.id}">${tvShow.thoughts}</div>
</div>
	`;
};

const tvListingShortcode = (tvShow) => {
	const getRating = tvShow.rating !== null ? starRating(tvShow.rating, 'sm') : '';

	return `
<div class="item" data-tv-id="${tvShow.televisionShowId}">
	<div class="cover">
		<img src="${tvShow.coverImageUrl}" alt="${tvShow.title}" height="225" width="150" />
		${getProgress(tvShow)}
	</div>
	<div class="info">
		<a href="${tvShow.imdbLink}" target="_blank" rel="noreferrer">
			${tvShow.title}
		</a>

		${getRating}

		${getThoughts(tvShow)}
	</div>
</div>
	`;
};

export default tvListingShortcode;
