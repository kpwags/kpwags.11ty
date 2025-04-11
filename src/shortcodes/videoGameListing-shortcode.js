import dayjs from 'dayjs';
import starRating from './starRating-shortcode.js';

const getThoughts = (game) => {
	if (game.thoughts === null || game.thoughts.trim().length === 0) {
		return '';
	}

	return `
<div class="view-thoughts">
	<button
		class="toggle-thoughts"
		id="toggle-btn-${game.videoGameId}"
		type="button"
		data-id="${game.videoGameId}"
		data-type="video-game"
	>View Thoughts</button>
	<div class="thoughts hidden" id="thoughts-${game.videoGameId}">${game.thoughts}</div>
</div>
	`;
};

const getPlayedIcon = (game) => {
	switch (game.completion.name) {
		case 'Yes':
			return '<span class="finished-icon">✅</span>';
		case 'No':
			return '<span class="finished-icon">🟥</span>';
		case 1:
		default:
			return '';
	}
};

const stringify = (values) => values.join(',').replaceAll(' ', '-').toLowerCase();

const getPlayedStatus = (game) => {
	switch (game.completionStatus) {
		case 2:
			return 'yes';
		case 3:
			return 'no';
		case 1:
		default:
			return 'n/a';
	}
};

const videoGameListingShortcode = (game) => {
	const getRating = game.rating > 0 ? starRating(game.rating, 'sm') : '';
	const platform = game.systems.length > 0 ? `<div class="meta">${game.systems.map((s) => s.name).join(', ')}</div>` : '';

	return `
<div
	class="item video-game"
	data-video-game-id="${game.videoGameId}"
	data-platform="${game.systems.map((s) => s.name).join(', ')}"
	data-filter-platform="${stringify(game.systems.map((s) => s.name))}"
	data-filter-genre="${stringify(game.genres.map((g) => g.name))}"
	data-completed="${(game.completion.name ?? 'n/a').toLowerCase()}"
	data-year-completed="${game.dateCompleted ? dayjs(game.dateCompleted).format('YYYY') : '0'}"
>
	<div class="cover"><img src="${game.coverImageUrl}" alt="${game.title}" height="300" width="200" />${getPlayedIcon(game)}</div>
	<div class="info">
		<a href="${game.link}" target="_blank" rel="noreferrer">
			${game.title}
		</a>

		${platform}

		${getRating}

		${getThoughts(game)}
	</div>
</div>
	`;
};

export default videoGameListingShortcode;
