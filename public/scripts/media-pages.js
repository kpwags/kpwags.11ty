window.addEventListener('load', () => {
    // Thoughts Dialogs
    const dialog = document.querySelector('dialog.thoughts-dialog');

    const toggleButtons = document.querySelectorAll('button.toggle-thoughts');

    toggleButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const dataType = e.target.getAttribute('data-type');
            const id = e.target.getAttribute('data-id');

            showThoughts(id, dataType);
        });
    });

    const modalCloseButton = document.querySelector('dialog.thoughts-dialog button');

    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', () => dialog.close());
    }

    // Music Page
    const musicFilters = document.querySelectorAll('input[type="radio"][name="musicFilters"]');
    musicFilters.forEach((filter) => {
        filter.addEventListener('change', (e) => {
            filterMusic(e.target.id);
        });
    });

    // Bookshelf Page
    const bookFilters = document.querySelectorAll('input[type="radio"][name="bookFilters"]');
    bookFilters.forEach((filter) => {
        filter.addEventListener('change', (e) => {
            filterBooks(e.target.id);
        });
    });
});

function addClassToElement(selector, className) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add(className);
    }
}

function getMedia(id, mediaType) {
    switch (mediaType) {
        case 'video-game':
            return document.querySelector(`div[data-video-game-id="${id}"]`);
        case 'movie':
            return document.querySelector(`div[data-movie-id="${id}"]`);
        case 'tv':
            return document.querySelector(`div[data-tv-id="${id}"]`);
        case 'book':
            return document.querySelector(`div[data-book-id="${id}"]`);
        default:
            return undefined;
    }
}

function showThoughts(id, mediaType) {
    const item = getMedia(id, mediaType);
    const dialog = document.querySelector('dialog.thoughts-dialog');

    if (item && dialog) {
        const image = item.querySelector('.cover img');
        const title = item.querySelector('a').innerText;
        const rating = item.querySelector('div.rating')?.innerHTML ?? '';
        const thoughts = item.querySelector('div.thoughts')?.innerHTML ?? '';
        const dialogImage = dialog.querySelector('img');

        dialog.querySelector('.title').innerHTML = title;
        dialog.querySelector('.rating').innerHTML = rating;
        dialog.querySelector('.thoughts').innerHTML = thoughts;
        dialogImage.setAttribute('src', image.getAttribute('src'));
        dialogImage.setAttribute('alt', image.getAttribute('alt'));

        if (mediaType === 'video-game') {
            const platform = item.getAttribute('data-platform');

            dialog.querySelector('.platform').innerHTML = platform;
            dialog.querySelector('.platform').classList.remove('hidden');
        } else {
            dialog.querySelector('.platform').classList.add('hidden');
        }

        dialog.showModal();
    }
}

function filterMusic(mode) {
    switch (mode) {
        case 'all':
            document.querySelectorAll('.item').forEach((item) => {
                item.removeAttribute('hidden');
            });
            break;

        case 'top10':
            document.querySelectorAll('.item').forEach((item) => {
                if (item.getAttribute('data-topten') === 'true') {
                    item.removeAttribute('hidden');
                } else {
                    item.setAttribute('hidden', 'true');
                }
            });
            break;

        case 'vinyl':
        case 'cd':
        case 'digital':
            document.querySelectorAll('.item').forEach((item) => {
                const formats = item.getAttribute('data-formats').split(',');
                if (formats.includes(convertFilterName(mode))) {
                    item.removeAttribute('hidden');
                } else {
                    item.setAttribute('hidden', 'true');
                }
            });
            break;

        default:
            break;
    }
}

function toggleAlbumFormat(musicAlbums, format) {
    addClassToElement(`#${format}-music`, 'active');

    musicAlbums.forEach((album) => {
        const formats = album.getAttribute('data-formats');
        if (formats && formats.includes(format)) {
            album.classList.remove('hidden');
        } else {
            album.classList.add('hidden');
        }
    });
}

function convertFilterName(genre) {
    switch (genre) {
        case 'business-economics':
            return 'business-&-economics';
        case 'biography':
            return 'biography-/-memoir';
        default:
            return genre;
    }
}

function filterBooks(genre) {
    if (genre === 'all') {
        document.querySelectorAll('.item').forEach((item) => {
            item.removeAttribute('hidden');
        });
    } else if (genre === 'fiction') {
        document.querySelectorAll('.item').forEach((item) => {
            if (item.getAttribute('data-booktype') === 'fiction') {
                item.removeAttribute('hidden');
            } else {
                item.setAttribute('hidden', 'true');
            }
        });
    } else if (genre === 'non-fiction') {
        document.querySelectorAll('.item').forEach((item) => {
            const bookType = item.getAttribute('data-booktype');
            if (bookType === 'non-fiction' || bookType === 'reference') {
                item.removeAttribute('hidden');
            } else {
                item.setAttribute('hidden', 'true');
            }
        });
    } else {
        document.querySelectorAll('.item').forEach((item) => {
            const genres = item.getAttribute('data-genre').split(',');
            if (genres.includes(convertFilterName(genre))) {
                item.removeAttribute('hidden');
            } else {
                item.setAttribute('hidden', 'true');
            }
        });
    }
}
