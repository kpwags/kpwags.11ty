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
    const musicDialog = document.querySelector('dialog.music-dialog');

    // filters
    const musicFilters = document.querySelectorAll('input[type="radio"][name="musicFilters"]');
    musicFilters.forEach((filter) => {
        filter.addEventListener('change', (e) => {
            filterMusic(e.target.id);
        });
    });

    // music dialog
    const albumButtons = document.querySelectorAll('.music-album-item button.text-button');
    albumButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            showMusicDialog(id);
        });
    });

    const musicDialogCloseButton = document.querySelector('dialog.music-dialog button');

    if (musicDialogCloseButton) {
        musicDialogCloseButton.addEventListener('click', () => musicDialog.close());
    }

    // Bookshelf Page
    const bookFilters = document.querySelectorAll('input[type="radio"][name="bookFilters"]');
    bookFilters.forEach((filter) => {
        filter.addEventListener('change', (e) => {
            filterBooks(e.target.id);
        });
    });

    // Video Games Page
    const gameFilters = document.querySelectorAll('input[type="radio"][name="gameFilters"]');
    gameFilters.forEach((filter) => {
        filter.addEventListener('change', (e) => {
            filterGames(e.target.id);
        });
    });
});

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
        const title = item.getAttribute('data-title') ? item.getAttribute('data-title') : item.querySelector('a').innerText;
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
		} else if (mediaType === 'book') {
			const format = item.getAttribute('data-format');

			dialog.querySelector('.platform').innerHTML = format;
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
                const formats = item.getAttribute('data-format').split(',');
                if (formats.includes(mode)) {
                    item.removeAttribute('hidden');
                } else {
                    item.setAttribute('hidden', 'true');
                }
            });
            break;

        default:
            document.querySelectorAll('.item').forEach((item) => {
                const genres = item.getAttribute('data-genre').split(',');
                if (genres.includes(mode)) {
                    item.removeAttribute('hidden');
                } else {
                    item.setAttribute('hidden', 'true');
                }
            });
            break;
    }
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

    const gridSections = document.querySelectorAll('.grid-section');
    gridSections.forEach((sec) => {
        const visibleItems = sec.querySelectorAll('.item:not([hidden])');
        sec.querySelector('h2 span').innerHTML = visibleItems.length;
    });
}

function filterGames(filter) {
    if (filter.startsWith('completed-')) {
        const yearString = filter.replace('completed-', '');
        const year = parseInt(yearString);

        if (year === 0) {
            document.querySelectorAll('.item').forEach((item) => {
                const isCompleted = item.getAttribute('data-completed') === 'yes';
                if (isCompleted) {
                    item.removeAttribute('hidden');
                } else {
                    item.setAttribute('hidden', 'true');
                }
            });
        } else if (year <= 2023) {
            document.querySelectorAll('.item').forEach((item) => {
                const yearCompleted = parseInt(item.getAttribute('data-year-completed'));
                if (yearCompleted > 0 && yearCompleted <= 2023) {
                    item.removeAttribute('hidden');
                } else {
                    item.setAttribute('hidden', 'true');
                }
            });
        } else {
            document.querySelectorAll('.item').forEach((item) => {
                const yearCompleted = parseInt(item.getAttribute('data-year-completed'));
                if (yearCompleted > 0 && yearCompleted === year) {
                    item.removeAttribute('hidden');
                } else {
                    item.setAttribute('hidden', 'true');
                }
            });
        }
    } else {
        switch (filter) {
            case 'all':
                document.querySelectorAll('.item').forEach((item) => {
                    item.removeAttribute('hidden');
                });
                break;

            case 'pc':
            case 'playstation':
            case 'xbox':
                document.querySelectorAll('.item').forEach((item) => {
                    if (item.getAttribute('data-filter-platform').includes(filter)) {
                        item.removeAttribute('hidden');
                    } else {
                        item.setAttribute('hidden', 'true');
                    }
                });
                break;

            case 'nintendo':
                document.querySelectorAll('.item').forEach((item) => {
                    if (item.getAttribute('data-filter-platform').includes('nintendo-switch')) {
                        item.removeAttribute('hidden');
                    } else {
                        item.setAttribute('hidden', 'true');
                    }
                });
                break;

            case 'shooter':
                document.querySelectorAll('.item').forEach((item) => {
                    if (
                        item.getAttribute('data-filter-genre').includes('first-person-shooter') ||
                        item.getAttribute('data-filter-genre').includes('third-person-shooter')
                    ) {
                        item.removeAttribute('hidden');
                    } else {
                        item.setAttribute('hidden', 'true');
                    }
                });
                break;

            case 'completed':
                document.querySelectorAll('.item').forEach((item) => {
                    if (item.getAttribute('data-completed') === 'yes') {
                        item.removeAttribute('hidden');
                    } else {
                        item.setAttribute('hidden', 'true');
                    }
                });
                break;

            default:
                document.querySelectorAll('.item').forEach((item) => {
                    const genres = item.getAttribute('data-filter-genre').split(',');
                    if (genres.includes(convertFilterName(filter))) {
                        item.removeAttribute('hidden');
                    } else {
                        item.setAttribute('hidden', 'true');
                    }
                });
                break;
        }
    }

    const visibleItems = document.querySelectorAll('.have-played-grid .item:not([hidden])');
    document.getElementById('have-played').innerHTML = visibleItems.length;
}

function buildTagString(items) {
    let output = '';

    items.forEach((item) => {
        output += `<span class="tag" style="background-color: ${item.colorCode};">${item.name}</span>`;
    })

    return output;
}

function showMusicDialog(id) {
    const item = document.querySelector(`div[data-albumid="${id}"]`)
    const dialog = document.querySelector('dialog.music-dialog');

    if (item && dialog) {
        const data = decodeURIComponent(item.getAttribute('data-album'));
        const album = JSON.parse(data);

        const dialogImage = dialog.querySelector('img');

        dialog.querySelector('.title').innerHTML = album.title;
        dialog.querySelector('.artist').innerHTML = album.artist;
        dialogImage.setAttribute('src', album.coverImageUrl);
        dialogImage.setAttribute('alt', `The cover art for ${album.title} by ${album.artist}`);

        const genre = dialog.querySelector('.genres');
        const genreHtml = buildTagString(album.genres);

        const format = dialog.querySelector('.formats');
        const formatHtml = buildTagString(album.formats);

        if (genreHtml.length > 0) {
            genre.innerHTML = genreHtml;
            genre.classList.remove('hidden');
        } else {
            genre.classList.add('hidden');
        }

        if (formatHtml.length > 0) {
            format.innerHTML = formatHtml;
            format.classList.remove('hidden');
        } else {
            format.classList.add('hidden');
        }

        const thoughts = dialog.querySelector('.thoughts');
        if (album.thoughts.length > 0) {
            thoughts.innerHTML = album.thoughts;
            thoughts.classList.remove('hidden');
        } else {
            thoughts.classList.add('hidden');
        }

        const trackList = dialog.querySelector('ol.track-list');

        if (album.tracks.length > 0) {
            trackList.innerHTML = '';

            trackList.setAttribute('start', album.tracks[0].trackNumber.toString())

            album.tracks.forEach((track) => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(track.title));
                trackList.appendChild(li);
            });

            dialog.querySelector('div.track-list-title').classList.remove('hidden');
            trackList.classList.remove('hidden');
        } else {
            dialog.querySelector('div.track-list-title').classList.add('hidden');
            trackList.classList.add('hidden');
        }

        dialog.showModal();
    }
}
