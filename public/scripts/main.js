class LocalStorageUtilities {
	static setValue = (key, value) => window.localStorage.setItem(key, value);

	static getValue = (key) => window.localStorage.getItem(key);

	static clearValue = (key) => window.localStorage.removeItem(key);
}

function isDarkMode() {
	const prefferredMode = window.matchMedia('(prefers-color-scheme: dark)');

	if (prefferredMode.matches) {
		return true;
	}

	return false;
}

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