function buildTagString(items) {
	let output = '';

	items.forEach((item) => {
		output += `<span class="tag" style="background-color: ${item.colorCode};">${item.name}</span>`;
	})

	return output;
}

function convertFilterName(genre) {
	switch (genre) {
		case 'business-economics':
			return 'business-&-economics';
		case 'biography':
			return 'biography-/-memoir';
		case 'rts':
			return 'real-time-strategy';
		case 'rpg':
			return 'role-playing-game';
		default:
			return genre;
	}
}
