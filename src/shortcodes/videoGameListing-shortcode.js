const starRating = require('./starRating-shortcode');

const getThoughts = (game) => {
	if (game.thoughts === null) {
		return '';
	}

	return `
<div class="view-thoughts">
	<button
		class="toggle-thoughts"
		id="toggle-btn-${game.id}"
		type="button"
	>View Thoughts</button>
	<div class="thoughts hidden" id="thoughts-${game.id}">${game.thoughts}</div>
</div>
	`;
}

const getPlayedIcon = (game) => {
	switch (game.completed) {
		case 'Yes':
			return '<span class="finished-icon">✅</span>';
		case 'No':
			return '<span class="finished-icon">🟥</span>';
		case 'N/A':
		default:
			return '';
	}
};

module.exports = (game) => {
	const getRating = game.rating !== null ? starRating(game.rating) : '';
	const platform = game.platform !== null ? `<div class="meta">${game.platform}</div>` : '';

	return `
<div class="item">
	<div>
		<a href="${game.link}" target="_blank" rel="noreferrer" class="video-game-cover">
			<img src="${game.coverUrl}" alt="${game.title}" class="cover" height="300" width="200" />
			${getPlayedIcon(game)}
		</a>
	</div>
	<div>
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
