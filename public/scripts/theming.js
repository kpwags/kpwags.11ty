window.addEventListener('load', () => {
    const colorOptions = document.querySelectorAll('input[name="colorTheme"]');
    const modeOptions = document.querySelectorAll('input[name="selectedMode"]');

    const headerSwitchToLightMode = document.querySelector('.header-theme-change.light');
    const headerSwitchToDarkMode = document.querySelector('.header-theme-change.dark');

    colorOptions.forEach((opt) => {
        opt.addEventListener('change', (e) => {
            changeColor(e.target.value);
        });
    });

    modeOptions.forEach((opt) => {
        opt.addEventListener('change', (e) => {
            changeMode(e.target.value);
        });
    });

    const [mode, color] = getCurrentTheme();

    document.colorsForm.colorTheme.value = color;
    document.modeForm.selectedMode.value = mode;

    if (headerSwitchToLightMode) {
        headerSwitchToLightMode.addEventListener('click', () => changeMode('light'));
    }

    if (headerSwitchToDarkMode) {
        headerSwitchToDarkMode.addEventListener('click', () => changeMode('dark'));
    }
});

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
    } catch {
        /* don't really care */
    }
}

function removeStorageItem(key) {
    try {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(key);
        }
    } catch {
        /* don't really care */
    }
}

function getCurrentTheme() {
    const mode = getStorageItem('theme_mode', 'system');
    const color = getStorageItem('theme_color', 'green');

    return [mode, color];
}

function getPreferredColorMode() {
    if (typeof window !== 'undefined') {
        const prefferredMode = window.matchMedia('(prefers-color-scheme: dark)');

        if (prefferredMode.matches) {
            return 'dark';
        }
    }

    return 'light';
}

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

    document.modeForm.selectedMode.value = mode;
}

function changeMode(mode) {
    console.log({ mode })
    if (mode === 'system') {
        removeStorageItem('theme_mode');
        document.documentElement.removeAttribute('data-theme');
        return;
    }

    setStorageItem('theme_mode', mode);
    document.documentElement.setAttribute('data-theme', mode);

    document.modeForm.selectedMode.value = mode;
}

function changeColor(color) {
    setStorageItem('theme_color', color);
    document.documentElement.setAttribute('data-color-theme', color);

    const themeElement = document.querySelector('meta[name="theme-color"]');
    if (themeElement) {
        themeElement.setAttribute('content', getColorHexCode(color));
    }

    document.colorsForm.colorTheme.value = color;
}
