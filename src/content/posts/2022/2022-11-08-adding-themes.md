---
title: 'Adding Themes'
date: '2022-11-08'
permalink: /posts/2022/11/08/adding-themes/index.html
tags:
  - CSS
  - HTML
  - Tutorial
---

In case you haven't noticed, I decided to add some color and font themes to my blog.
<!-- excerpt -->

If you click the little gear icon in the header, a bar will drop down where you'll be given the choice to choose the accent color and the font to use. I decided to add this to be a little whimsical as well as to play around with my site because it's my site and I can.

To accomplish this, I take advantage of CSS variables and local storage. By default when you first come to my site it sets the light/dark theme based on your system/browser light dark preference. I think it's important for the user to be able to decide whether they want light or dark outside just their system settings, so I also offer the ability to override it by saving the value in local storage to retrieve the next time they visit. Local storage will always override system settings. I did the same thing for colors and fonts except I default them to green and a sans-serif font.

I have 2 helper functions to help me to do this.

```typescript
export const saveToLocalStorage = (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
    }
};

export const retrieveFromLocalStorage = (key: string, isJson = false): string|unknown => {
    if (typeof window !== 'undefined') {
        const value = window.localStorage.getItem(key);

        if (value) {
            return isJson ? JSON.parse(value) : value;
        }
    }

    return null;
};
```

Since my blog runs on Next.js, server side rendering does not contain the `window` object so I have to first check to make sure the `window` object exists. Other than that, the functions are simply wrappers for the localStorage object. The only slight enhancement is the ability to tell the retriever to parse the return as JSON if the expected value is JSON.

When you click one of the color or font buttons, the code will save the value chosen to local storage for retrieval the next time you visit the site.

In terms of the CSS, I take advantage of CSS variables

```css
:root {
    --primary-color-1: hsl(144, 100%, 15%);
    --primary-color-2: hsl(142, 68%, 29%);
    --primary-color-3: hsl(124, 95%, 32%);
    --sans-serif: WorkSans, Helvetica, Arial, sans-serif;
    --serif: Petrona, Georgia, 'Times New Roman', serif;
    --monospaced: SourceCodePro, 'Courier New';
    --font: var(--sans-serif);
}
```

This sets the 3 primary colors to the greens for the default view as well as the default font. To go along with saving to local storage, I also add a custom data attribute `data-color-theme` and `data-font-theme` to the `html` element on the page. That allows me to override the root CSS variables based on what the attributes are

```css
[data-color-theme*='purple'] {
    --primary-color-1: hsl(301, 91%, 40%);
    --primary-color-2: hsl(301, 77%, 46%);
    --primary-color-3: hsl(298, 100%, 36%);
}

[data-font-theme*='serif'] {
    --font: var(--serif);
}
```

The above CSS sets the primary colors to purple when the `data-color-theme` attribute is set to purple and sets the font to use the serif font if the `data-font-theme` attribute is set to serif.

Now the one thing I ran into with the colors is contrast. Colors that contrast well on a light background don't always look good on a dark background. So I also take into account the color theme attribute as well.

```css
[data-color-theme*='purple'] {
    --primary-color-1: hsl(301, 91%, 40%);
    --primary-color-2: hsl(301, 77%, 46%);
    --primary-color-3: hsl(298, 100%, 36%);
}

[data-theme*='dark'][data-color-theme*='purple'] {
    --primary-color-1: hsl(301, 99%, 65%);
    --primary-color-2: hsl(301 72% 61%);
    --primary-color-3: hsl(298 100% 79%);
}
```

The top block is exactly the same as the previous CSS block, but the bottom is different. The bottom will also look to see if the `data-theme` attribute is set to `dark`, then it should override the top block in favor of the colors that will contrast better on a black background. Accessibility is important!

You can view the full CSS file [here](https://github.com/kpwags/kpwags.com/blob/main/styles/kpwags.css).

The final piece tying it all together is my `useTheme` hook.

```typescript
interface UseThemeReturn {
    theme: Theme;
    color: ColorTheme;
    font: FontTheme;
    themeLoaded: boolean;
    getCurrentTheme: () => Theme;
    getCurrentColor: () => ColorTheme;
    getCurrentFont: () => FontTheme;
    changeTheme: (t: Theme) => void;
    changeColor: (c: ColorTheme) => void;
    changeFont: (f: FontTheme) => void;
}

export const useTheme = (): UseThemeReturn => {
    const [theme, setTheme] = useState<Theme>('light');
    const [color, setColor] = useState<ColorTheme>('green');
    const [font, setFont] = useState<FontTheme>('sans');
    const [themeLoaded, setThemeLoaded] = useState(false);

    const getPreferredColorMode = (): Theme => {
        if (typeof window !== 'undefined') {
            const prefferredMode = window.matchMedia('(prefers-color-scheme: dark)');

            if (prefferredMode.matches) {
                return 'dark';
            }
        }

        return 'light';
    };

    const changeTheme = (t: Theme) => {
        saveToLocalStorage('theme', t);
        document.documentElement.setAttribute('data-theme', t);
        setTheme(t);
    };

    const changeColor = (c: ColorTheme) => {
        saveToLocalStorage('color', c);
        document.documentElement.setAttribute('data-color-theme', c);
        setColor(c);
    };

    const changeFont = (f: FontTheme) => {
        saveToLocalStorage('font', f);
        document.documentElement.setAttribute('data-font-theme', f);
        setFont(f);
    };

    const getCurrentTheme = (): Theme => {
        const localTheme = retrieveFromLocalStorage('theme') as Theme;

        if (localTheme) {
            return localTheme;
        }

        return getPreferredColorMode();
    };

    const getCurrentColor = (): ColorTheme => {
        const localStorageColor = retrieveFromLocalStorage('color') as ColorTheme;

        if (localStorageColor) {
            return localStorageColor;
        }

        return color;
    };

    const getCurrentFont = (): FontTheme => {
        const localStorageFont = retrieveFromLocalStorage('font') as FontTheme;

        if (localStorageFont) {
            return localStorageFont;
        }

        return font;
    };

    useEffect(() => {
        const localTheme = retrieveFromLocalStorage('theme') as Theme;
        const selectedColor = retrieveFromLocalStorage('color') as ColorTheme;
        const selectedFont = retrieveFromLocalStorage('font') as FontTheme;

        if (localTheme) {
            setTheme(localTheme);
            document.documentElement.setAttribute('data-theme', localTheme);
        } else {
            setTheme(getPreferredColorMode());
            document.documentElement.setAttribute('data-theme', getPreferredColorMode());
        }

        if (selectedColor) {
            setColor(selectedColor);
            document.documentElement.setAttribute('data-color-theme', selectedColor);
        } else {
            setColor('green');
            document.documentElement.setAttribute('data-color-theme', 'green');
        }

        if (selectedFont) {
            setFont(selectedFont);
            document.documentElement.setAttribute('data-font-theme', selectedFont);
        } else {
            setFont('sans');
            document.documentElement.setAttribute('data-font-theme', 'sans');
        }

        setThemeLoaded(true);
    }, []);

    return {
        theme,
        color,
        font,
        themeLoaded,
        getCurrentTheme,
        getCurrentColor,
        getCurrentFont,
        changeTheme,
        changeColor,
        changeFont,
    };
};
```

Don't let all the code scare you. This code is run when the site is loaded and will look at local storage for light and dark, color, and font and then apply the appropriate themes. You can view the full source code for the `useTheme` Hook [here](https://github.com/kpwags/kpwags.com/blob/main/hooks/useTheme.ts)

So that's basically how I went about adding themes. It wasn't super difficult and I'm happy with the results.
