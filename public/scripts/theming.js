window.addEventListener('load', () => {
	const openThemeSettingsButtons = document.querySelectorAll('.open-settings-btn');

	openThemeSettingsButtons.forEach((button) => {
		button.addEventListener('click', () => {
			toggleThemeSettings();
		});
	});

	const closeThemeDrawerButton = document.getElementById('close-theme-drawer');
	if (closeThemeDrawerButton) {
		closeThemeDrawerButton.addEventListener('click', () => {
			toggleThemeSettings();
		});
	}

	const colorButtons = document.querySelectorAll('button.color-button');
	const modeButtons = document.querySelectorAll('button.mode-button');
	const widthButtons = document.querySelectorAll('button.width-button');

	colorButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const btn = e.target;

			const color = btn.getAttribute('data-color');

			removeActiveColor();

			btn.classList.add('active');

			changeColor(color);
		});
	});

	modeButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const btn = e.target;

			const mode = btn.getAttribute('data-mode');

			removeActiveMode();

			btn.classList.add('active');

			changeMode(mode);
		});
	});

	widthButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const btn = e.target;

			const width = btn.getAttribute('data-width');

			removeActiveWidth();

			btn.classList.add('active');

			changeWidth(width);
		});
	});

	const [mode, color, width] = getCurrentTheme();

	const modeButton = document.querySelector(`button[data-mode="${mode}"]`);
	if (modeButton) {
		modeButton.classList.add('active');
	}

	const colorButton = document.querySelector(`button[data-color="${color}"]`);
	if (colorButton) {
		colorButton.classList.add('active');
	}

	const widthButton = document.querySelector(`button[data-width="${width}"]`);
	if (widthButton) {
		widthButton.classList.add('active');
	}
});

function toggleThemeSettings() {
	const drawer = document.querySelector('.settings-drawer');
	if (drawer) {
		if (drawer.style.display === 'block') {
			drawer.style.display = 'none'
		} else {
			drawer.style.display = 'block'
		}
	}
}

function getStorageItem(key, defaultValue = null) {
	try {
		if (typeof window !== 'undefined') {
			const value = window.localStorage.getItem(key);

			return value || defaultValue;
		}
	} catch {
		return defaultValue;
	}
}

function setStorageItem(key, value) {
	try {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(key, value);
		}
	} catch { /* don't really care */ }
}

function removeStorageItem(key) {
	try {
		if (typeof window !== 'undefined') {
			window.localStorage.removeItem(key);
		}
	} catch { /* don't really care */ }
}

function getCurrentTheme() {
	const mode = getStorageItem('theme_mode', 'system');
	const color = getStorageItem('theme_color', 'green');
	const width = getStorageItem('theme_width', 'normal');

	return [mode, color, width];
}

function getPreferredColorMode() {
	if (typeof window !== 'undefined') {
		const prefferredMode = window.matchMedia('(prefers-color-scheme: dark)');

		if (prefferredMode.matches) {
			return 'dark';
		}
	}

	return 'light';
};

function getColorHexCode(color) {
	switch (color) {
		case 'blue':
			return '#007bdc';
		case 'purple':
			return '#d431e0';
		case 'orange':
			return '#d27519';
		case 'red':
			return '#ff0122';
		case 'green':
		default:
			return '#1d7038';
	}
}

function toggleSiteMode() {
	const [mode] = getCurrentTheme();

	if (mode === 'light') {
		setStorageItem('theme_mode', 'dark');
		document.documentElement.setAttribute('data-theme', 'dark');
	} else {
		setStorageItem('theme_mode', 'light');
		document.documentElement.setAttribute('data-theme', 'light');
	}
};

function changeMode(mode) {
	if (mode === 'system') {
		removeStorageItem('theme_mode');
		document.documentElement.removeAttribute('data-theme');
		return;
	}

	setStorageItem('theme_mode', mode);
	document.documentElement.setAttribute('data-theme', mode);
}

function changeColor(color) {
	setStorageItem('theme_color', color);
	document.documentElement.setAttribute('data-color-theme', color);

	const themeElement = document.querySelector('meta[name="theme-color"]');
	if (themeElement) {
		themeElement.setAttribute('content', getColorHexCode(color));
	}
}

function changeWidth(width) {
	setStorageItem('theme_width', width);
	document.documentElement.setAttribute('data-width', width);
}

function removeActiveColor() {
	const colorButtons = document.querySelectorAll('button.color-button');

	colorButtons.forEach((button) => {
		button.classList.remove('active');
	});
};

function removeActiveMode() {
	const colorButtons = document.querySelectorAll('button.mode-button');

	colorButtons.forEach((button) => {
		button.classList.remove('active');
	});
};

function removeActiveWidth() {
	const widthButtons = document.querySelectorAll('button.width-button');

	widthButtons.forEach((button) => {
		button.classList.remove('active');
	});
};