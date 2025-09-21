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