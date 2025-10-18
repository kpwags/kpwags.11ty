class LocalStorageUtilities {
	static setValue = (key, value) => window.localStorage.setItem(key, value);

	static getValue = (key) => window.localStorage.getItem(key);

	static clearValue = (key) => window.localStorage.removeItem(key);
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

function resetTheme() {
	LocalStorageUtilities.clearValue('data-theme');

	const theme = isDarkMode() ? 'dark' : 'light';

	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getPrimaryColor(theme));
	document.documentElement.setAttribute('data-theme', theme);
	document.themeControls.colorTheme.value = 'system';
}

function changeTheme(theme) {
	if (theme === 'system') {
		resetTheme();
		return;
	}

	LocalStorageUtilities.setValue('data-theme', theme);

	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getPrimaryColor(theme));
	document.documentElement.setAttribute('data-theme', theme);
	document.themeControls.colorTheme.value = theme;
}

window.addEventListener('load', () => {
	const colorOptions = document.querySelectorAll('input[name="colorTheme"]');

	colorOptions.forEach((opt) => {
		opt.addEventListener('change', (e) => {
			changeTheme(e.target.value);
		});
	});
});