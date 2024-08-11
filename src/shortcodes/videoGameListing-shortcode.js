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
    switch (game.completionStatus) {
        case 2:
            return '<span class="finished-icon">✅</span>';
        case 3:
            return '<span class="finished-icon">🟥</span>';
        case 1:
        default:
            return '';
    }
};

const videoGameListingShortcode = (game) => {
    const getRating = game.rating > 0 ? starRating(game.rating, 'sm') : '';
    const platform = game.systems.length > 0 ? `<div class="meta">${game.systems.map((s) => s.name).join(', ')}</div>` : '';

    return `
<div class="item video-game" data-video-game-id="${game.videoGameId}" data-platform="${game.systems.map((s) => s.name).join(', ')}">
	<div class="cover"><img src="${game.coverImageUrl}" alt="${game.title}" height="225" width="150" />${getPlayedIcon(game)}</div>
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
