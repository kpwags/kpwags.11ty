import starRating from './starRating-shortcode.js';

const getProgress = (showProgress, progress) => {
	if (!showProgress || progress === 0 || progress === 100) {
		return '';
	}

	return `
<div class="progress">
	<span>Watch Pogress</span>
	<div class="media-progress-bar" title="${progress}% complete">
		<div class="bar">
			<div class="inner-bar" style="width: ${progress}%">${progress}%</div>
		</div>
	</div>
</div>`;
};

const getThoughts = (showThoughts, tvShow) => {
	if (!showThoughts || tvShow.thoughts === null || tvShow.thoughts === '') {
		return '';
	}

	return `<p>${tvShow.thoughts}</p>`;
};

const tvListingShortcode = (tvShow, showProgress, showRating) => {
	const getRating = (showRating && tvShow.rating !== null) ? starRating(tvShow.rating) : '';

	return `
<div class="media-box">
	<div class="container">
		<img src="${tvShow.coverImageUrl}" alt="${tvShow.title}" height="300" width="200" />
		<div class="details">
			<div class="title-section">
				<div class="title">
					<a href="${tvShow.imdbLink}" target="_blank" rel="noreferrer">
						${tvShow.title}
					</a>
				</div>
			</div>

			${getProgress(showProgress, tvShow.progress)}

			${getRating}

			${getThoughts(showRating, tvShow)}
		</div>
	</div>
</div>
	`;
};

export default tvListingShortcode;
